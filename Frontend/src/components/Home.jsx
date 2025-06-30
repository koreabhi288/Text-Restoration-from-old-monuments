import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
          Restore Historical Text <span className="text-blue-600">With AI</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
          Upload images with degraded or missing text and let our advanced AI restore them to their original form.
          Perfect for historical documents, damaged manuscripts, and faded text.
        </p>
        <Link 
          to="/upload"
          className="bg-blue-600 text-white text-lg px-8 py-4 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg inline-block"
        >
          Get Started
        </Link>
        
        <div className="mt-16 animate-bounce">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-10 w-10 mx-auto text-blue-600" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Home; 