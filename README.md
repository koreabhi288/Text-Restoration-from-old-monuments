Text Restoration Application
This project is a web application for text restoration, built with React (frontend) and Flask (backend). It allows users to upload images with missing text and restores them using AI.

Project Structure
/Frontend - React frontend with Tailwind CSS
/backend - Flask backend that uses Google's Gemini API, Wikipedia, and Arxiv for text restoration
Features
Upload images with degraded text
Extract text from images using AI
Search related information from Wikipedia and academic sources
Restore missing text using context
Separate page for text restoration process
Setup Instructions
Backend
Navigate to the backend directory:

cd backend
Install the required dependencies:

pip install -r requirements.txt
Set up your API keys:

cp config.json.example config.json
Edit config.json and add your Google Gemini API key.

Run the Flask application:

python app.py
The backend will run on http://localhost:5000.

Frontend
Navigate to the frontend directory:

cd Frontend
Install the required dependencies:

npm install
Run the development server:

npm run dev
The frontend will be available at http://localhost:5173.

How to Use
Visit the homepage at http://localhost:5173
Click on "Get Started" to navigate to the text restoration page
Upload an image with degraded or missing text
The application will process the image and display:
Extracted text from the image
Related information from Wikipedia/Arxiv
Restored text with missing parts filled in
Technologies Used
Frontend: React, React Router, Tailwind CSS
Backend: Flask, Google Generative AI (Gemini), LangChain, Wikipedia API, Arxiv API
Image Processing: PIL (Python Imaging Library)
License
This project is open source and available under the MIT License.
