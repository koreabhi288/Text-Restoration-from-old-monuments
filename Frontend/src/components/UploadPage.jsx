import React from 'react';
import { Link } from 'react-router-dom';
import UploadSection from './UploadSection';
import { FaWikipediaW, FaBook, FaFileAlt, FaArchive } from 'react-icons/fa';

function UploadPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-gray-800">
            TextRestorer
            <span className="ml-2 px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full">
              Advanced Research
            </span>
          </Link>
          <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <UploadSection />
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t py-6 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="text-gray-600 text-sm mb-4 sm:mb-0">
              © {new Date().getFullYear()} TextRestorer | All Rights Reserved
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Research Sources:</span>
              <div className="flex items-center gap-3">
                <div className="flex items-center">
                  <FaWikipediaW className="text-blue-600 mr-1" />
                  <span className="text-sm">Wikipedia</span>
                </div>
                <div className="flex items-center">
                  <FaBook className="text-green-600 mr-1" />
                  <span className="text-sm">Google Books</span>
                </div>
                <div className="flex items-center">
                  <FaFileAlt className="text-orange-600 mr-1" />
                  <span className="text-sm">arXiv</span>
                </div>
                <div className="flex items-center">
                  <FaArchive className="text-purple-600 mr-1" />
                  <span className="text-sm">Academic Journals</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default UploadPage; 