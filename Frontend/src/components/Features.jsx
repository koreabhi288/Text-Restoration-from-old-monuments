import React from 'react';

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gray-50 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Features</h2>
        <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
          Our advanced text restoration system works through a multi-stage process
          to deliver high-quality results.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105">
            <div className="h-14 w-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Image Analysis</h3>
            <p className="text-gray-600">
              Our system uses advanced image processing techniques to analyze your uploaded documents,
              identifying text regions and assessing damage or degradation levels.
            </p>
          </div>
          
          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105">
            <div className="h-14 w-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Text Extraction</h3>
            <p className="text-gray-600">
              Using state-of-the-art OCR enhanced by AI, we extract all visible text from your image,
              carefully marking areas that are unclear or damaged for further processing.
            </p>
          </div>
          
          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105">
            <div className="h-14 w-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Historical Research</h3>
            <p className="text-gray-600">
              Our system automatically researches historical context by searching reliable sources like
              Wikipedia and academic databases to gather information related to your document's content.
            </p>
          </div>
          
          {/* Feature 4 */}
          <div className="bg-white p-8 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105">
            <div className="h-14 w-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">AI Prediction</h3>
            <p className="text-gray-600">
              Using context from both the extracted text and historical research, our AI models
              predict missing words and characters with remarkable accuracy and confidence levels.
            </p>
          </div>
          
          {/* Feature 5 */}
          <div className="bg-white p-8 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105">
            <div className="h-14 w-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Text Restoration</h3>
            <p className="text-gray-600">
              The final step combines all processing to present you with a fully restored text,
              highlighting the changes and additions made to restore the original document's meaning.
            </p>
          </div>
          
          {/* Feature 6 */}
          <div className="bg-white p-8 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105">
            <div className="h-14 w-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Easy Export</h3>
            <p className="text-gray-600">
              Download your restored text in multiple formats for research, archiving, or publication.
              All processing steps are documented for academic transparency.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features; 