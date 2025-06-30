import os
import json
import io
import base64
import re
import requests
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from PIL import Image
import google.generativeai as genai
from langchain.utilities import WikipediaAPIWrapper
from langchain.utilities import ArxivAPIWrapper
from langchain.text_splitter import RecursiveCharacterTextSplitter

app = Flask(__name__)
CORS(app, resources={
    r"/api/*": {
        "origins": [
            "https://Tanmaygangurde20.github.io",  # Your GitHub Pages URL
            "http://localhost:3000"  # Local development
        ]
    }
})

# Create uploads folder if it doesn't exist
UPLOAD_FOLDER = os.environ.get('UPLOAD_FOLDER', '/tmp/uploads')
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

class TextRestorationApp:
    def __init__(self):
        # Configure Gemini API
        self.configure_genai()
        # Initialize Wikipedia and Arxiv search
        self.wikipedia_wrapper = WikipediaAPIWrapper(top_k_results=1, doc_content_chars_max=9000)
        self.arxiv_wrapper = ArxivAPIWrapper()

    def configure_genai(self):
        try:
            with open('config.json') as f:
                config_data = json.load(f)
            GOOGLE_API_KEY = config_data["GOOGLE_API_KEY"]
            genai.configure(api_key=GOOGLE_API_KEY)
        except Exception as e:
            print(f"Error configuring Gemini API: {e}")
            return None

    def gemini_flash_text_extraction(self, prompt, image):
        try:
            gemini_model = genai.GenerativeModel("gemini-2.0-flash")
            response = gemini_model.generate_content([prompt, image])
            if response.parts:
                if response.parts[0].text:
                    return response.parts[0].text
                else:
                    return "No text was extracted from the image."
            else:
                return "The response was empty or blocked."
        except Exception as e:
            return f"An error occurred: {str(e)}"

    def extract_keywords(self, text):
        try:
            key_terms_prompt = f"""
            I will give you some extracted text from degraded historical images. 
            This text might have missing or unclear words. Your job is to generate 
            important keywords that, when searched on various knowledge bases like Wikipedia, 
            Google Books, and academic repositories, will return a large amount of relevant information.

            To improve the keyword selection:
            1. Identify key topics, concepts, historical references, and proper nouns in the text.
            2. Generate 8-12 refined keywords that would bring back comprehensive information.
            3. Include both general topics and specific terms that appear in the text.
            4. Prioritize historically relevant terms that would appear in books and academic papers.

            Extracted Text:
{text}
            
            
            """
            key_terms_model = genai.GenerativeModel("gemini-2.5-pro-exp-03-25")
            key_terms_response = key_terms_model.generate_content(key_terms_prompt)
            key_terms = key_terms_response.text.strip().split('\n')
            
            # Clean up keywords (remove numbers, bullets, etc.)
            cleaned_terms = []
            for term in key_terms:
                # Remove numbers, dashes, asterisks at the beginning
                term = re.sub(r'^[\d\-\*\.\s]+', '', term).strip()
                if term:
                    cleaned_terms.append(term)
            
            return cleaned_terms
        except Exception as e:
            print(f"Error extracting keywords: {e}")
            return []

    def search_wikipedia(self, term):
        try:
            wiki_results = self.wikipedia_wrapper.run(term)
            if wiki_results and wiki_results.strip():
                # Try to get the Wikipedia URL for the term
                wiki_url = f"https://en.wikipedia.org/wiki/{term.replace(' ', '_')}"
                return {
                    "content": wiki_results,
                    "source": {
                        "title": f"{term} - Wikipedia Article",
                        "description": f"Comprehensive information about {term} from Wikipedia, the free encyclopedia.",
                        "url": wiki_url,
                        "sourceType": "Wikipedia",
                        "icon": "wikipedia",
                        "relevance": 95
                    }
                }
            return None
        except Exception as e:
            print(f"Error searching Wikipedia for {term}: {e}")
            return None

    def search_arxiv(self, term):
        try:
            arxiv_results = self.arxiv_wrapper.run(term)
            if arxiv_results and arxiv_results.strip():
                # Extract paper information if possible
                paper_title = term
                paper_url = f"https://arxiv.org/search/?query={term.replace(' ', '+')}"
                
                # Check if there's a paper title and URL in the results
                title_match = re.search(r'Title: (.*?)(?:\n|$)', arxiv_results)
                if title_match:
                    paper_title = title_match.group(1)
                
                url_match = re.search(r'URL: (https://arxiv\.org/\S+)', arxiv_results)
                if url_match:
                    paper_url = url_match.group(1)
                
                return {
                    "content": arxiv_results,
                    "source": {
                        "title": f"{paper_title} - Academic Paper",
                        "description": f"Research paper related to {term} from arXiv, an open-access repository.",
                        "url": paper_url,
                        "sourceType": "Academic Paper",
                        "icon": "academic",
                        "relevance": 95
                    }
                }
            return None
        except Exception as e:
            print(f"Error searching arXiv for {term}: {e}")
            return None

    def search_google_books(self, term):
        try:
            # This is a mock implementation - in a real app, you'd use the Google Books API
            return {
                "content": f"Historical information about {term} from various books and publications. Books provide deeper historical context and scholarly analysis on the subject of {term} that may not be available in other sources. Important details about {term}'s historical significance, cultural impact, and related scholarly discourse can be found in these publications.",
                "source": {
                    "title": f"{term} - Google Books",
                    "description": f"Collection of book excerpts and publications about {term} and related topics.",
                    "url": f"https://books.google.com/books?q={term.replace(' ', '+')}",
                    "sourceType": "Book Collection",
                    "icon": "journal",
                    "relevance": 90
                }
            }
        except Exception as e:
            print(f"Error searching Google Books for {term}: {e}")
            return None

    def search_internet_archive(self, term):
        try:
            # This is a mock implementation - in a real app, you'd use the Internet Archive API
            return {
                "content": f"Historical archives and documents related to {term} from various periods. The Internet Archive contains primary source materials, historical documents, and other records related to {term}. These materials provide authentic perspectives and original documentation that can be invaluable for understanding the historical context of {term}.",
                "source": {
                    "title": f"{term} - Internet Archive",
                    "description": f"Historical archives and public domain documents about {term}.",
                    "url": f"https://archive.org/search.php?query={term.replace(' ', '+')}",
                    "sourceType": "Historical Archive",
                    "icon": "archive",
                    "relevance": 88
                }
            }
        except Exception as e:
            print(f"Error searching Internet Archive for {term}: {e}")
            return None

    def search_corpus(self, extracted_text):
        try:
            # Extract keywords from the text
            key_terms = self.extract_keywords(extracted_text)
            
            # Search results from various sources
            large_corpus = []
            sources = []
            
            for term in key_terms:
                # Prioritize Wikipedia for Marathi and Hindi
                wiki_result = self.search_wikipedia(term)
                if wiki_result:
                    large_corpus.append(wiki_result["content"])
                    sources.append(wiki_result["source"])
                    print(f"Found Wikipedia results for: {term}")

                # If no Wikipedia result, try other sources as a fallback
                if not wiki_result:
                    google_books_result = self.search_google_books(term)
                    if google_books_result:
                        large_corpus.append(google_books_result["content"])
                        sources.append(google_books_result["source"])
                        print(f"Found Google Books results for: {term}")
                    
                arxiv_result = self.search_arxiv(term)
                if arxiv_result:
                    large_corpus.append(arxiv_result["content"])
                    sources.append(arxiv_result["source"])
                    print(f"Found arXiv results for: {term}")
                
                # Then try Wikipedia and Internet Archive
                wiki_result = self.search_wikipedia(term)
                if wiki_result:
                    large_corpus.append(wiki_result["content"])
                    sources.append(wiki_result["source"])
                    print(f"Found Wikipedia results for: {term}")
                    
                archive_result = self.search_internet_archive(term)
                if archive_result:
                    large_corpus.append(archive_result["content"])
                    sources.append(archive_result["source"])
                    print(f"Found Internet Archive results for: {term}")

            # If no results found in any source
            if not large_corpus:
                print("No results found in any source.")
                return "", []

            # Combine and split the corpus
            text_splitter = RecursiveCharacterTextSplitter(
                chunk_size=1000,
                chunk_overlap=200,
                length_function=len,
            )
            split_corpus = text_splitter.create_documents([' '.join(large_corpus)])
            
            return ' '.join([doc.page_content for doc in split_corpus]), sources
        except Exception as e:
            print(f"Error searching corpus: {e}")
            return "", []

    def gemini_pro_missing_word(self, prompt):
        try:
            gemini_model = genai.GenerativeModel("gemini-2.5-pro-exp-03-25")
            response = gemini_model.generate_content(prompt)
            return response.text
        except Exception as e:
            return f"An error occurred: {str(e)}"

    def restore_text(self, image_path):
        try:
        # Read image
            image = Image.open(image_path)
            
            # Extract Text
            default_prompt = """You are an expert in text extraction and restoration from degraded historical images in multiple languages including English, Marathi (मराठी), and Hindi (हिंदी). 

    For text in any of these languages:
    1. Extract as many readable words as possible from the text corpus.
    2. If any word is unclear, denote it as 'unclear' or use the original script.
    3. For completely illegible or missing sections, use '_ _' to indicate gaps.
    4. Preserve the original script and language characteristics.
    5. When dealing with Marathi or Hindi text:
    - Maintain the Devanagari script integrity
    - Pay special attention to nuanced characters and ligatures
    - Consider contextual variations in word formations

    Ensure that:
    - Extracted words are preserved accurately
    - Original language and script are respected
    - Contextual understanding is prioritized
    - Linguistic patterns specific to each language are considered

    Your goal is to restore the text as accurately as possible while maintaining the original language's unique characteristics."""
            extracted_text = self.gemini_flash_text_extraction(default_prompt, image)
            print("Extracted Text:")
            print(extracted_text)
            print("\n" + "="*50 + "\n")

            # Search for corpus information from multiple sources
            large_corpus, sources = self.search_corpus(extracted_text)
            print("Large Corpus from Various Sources:")
            print(large_corpus[:1000] + "..." if len(large_corpus) > 1000 else large_corpus)
            print("\n" + "="*50 + "\n")

            # Missing Word Analysis with Corpus
            context_prompt = f""" You are an expert in analyzing text and predicting missing words in multiple languages (English, Marathi, Hindi). 
            Use the following large corpus as additional context:
            Corpus: {large_corpus[:2000]}

            Analyze this extracted text: '{extracted_text}'     
            1. Check for missing/unclear words marked with '' or '_'
            2. Fix any spelling or typing errors
            3. Fill blanks by analyzing context and surrounding words from both the text and the corpus
            4. Preserve the original script (Devanagari for Marathi/Hindi or Latin for English)
            5. Format output:
            - If no issues: "Text is complete and clear: [original text]"
            - If corrections needed: Show restored text with changes in asterisks 
            - Ensure that the restored text is grammatically correct and contextually appropriate
            - Maintain the linguistic nuances of the original language
            """
            restored_text = self.gemini_pro_missing_word(context_prompt)
            print("Restored Text:")
            print(restored_text)

            return {
                "original_text": extracted_text,
                "large_corpus": large_corpus,
                "restored_text": restored_text,
                "sources": sources
            }
        
        except Exception as e:
            print(f"Error in text restoration: {e}")
            return None

# Initialize the app
text_restoration_app = TextRestorationApp()

@app.route('/api/upload', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    
    try:
        file.save(filename)  # Save the uploaded file
        
        # Process the image
        result = text_restoration_app.restore_text(filename)
        
        if result:
            response = jsonify({
                'success': True,
                'originalText': result['original_text'],
                'wikiContent': result['large_corpus'],
                'restoredText': result['restored_text'],
                'sources': result['sources']
            })
        else:
            response = jsonify({'error': 'Failed to process image'}), 500
    
    except Exception as e:
        response = jsonify({'error': f'Error processing image: {str(e)}'}), 500
    
    finally:
        if os.path.exists(filename):  # Ensure file exists before deleting
            os.remove(filename)

    return response


@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000) 