import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">About TextRestorer</h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">The Problem</h3>
            <p className="text-gray-700 mb-6 text-lg">
              Historical documents, manuscripts, and important texts often suffer from degradation over time.
              Fading ink, water damage, fire damage, or simple aging can make portions of text illegible,
              leading to loss of valuable information and historical context.
            </p>
            <p className="text-gray-700 text-lg">
              Traditional restoration methods are time-consuming, expensive, and often require specialized 
              expertise. Even with careful handling, some text remains unreadable or requires educated guesses
              based on context.
            </p>
          </div>
          
          <div className="bg-gray-100 p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">Our Solution</h3>
            <p className="text-gray-700 mb-6 text-lg">
              TextRestorer leverages cutting-edge AI technology to automate and enhance the text restoration process.
              By combining image processing techniques with advanced language models and historical knowledge bases,
              our application can:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Extract text from degraded images with high accuracy</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Identify missing or unclear words and characters</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Use historical knowledge to predict missing content</span>
              </li>
              <li className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Restore text with high confidence based on context</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 