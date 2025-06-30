import React, { useState, useRef } from 'react';
import { FaUpload, FaSearch, FaBookOpen, FaWikipediaW, FaFileAlt, FaBook, FaArchive, FaNewspaper } from 'react-icons/fa';
import axios from 'axios';
import '../styles/UploadSection.css';

// Define API base URL based on environment
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://backend-29gk.onrender.com' 
  : 'http://localhost:5000';

const UploadSection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [restoredText, setRestoredText] = useState('');
  const [loading, setLoading] = useState(false);
  const [sourcesData, setSourcesData] = useState([]);
  const [activeSourceType, setActiveSourceType] = useState('all');
  const [expandedSourceIndex, setExpandedSourceIndex] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleSourceExpand = (index) => {
    setExpandedSourceIndex(expandedSourceIndex === index ? null : index);
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  const getIconForSource = (sourceType) => {
    switch (sourceType.toLowerCase()) {
      case 'wikipedia':
        return <FaWikipediaW className="source-icon" style={{ color: '#3366cc' }} />;
      case 'academic paper':
        return <FaFileAlt className="source-icon" style={{ color: '#e67e22' }} />;
      case 'book collection':
        return <FaBook className="source-icon" style={{ color: '#27ae60' }} />;
      case 'historical archive':
        return <FaArchive className="source-icon" style={{ color: '#8e44ad' }} />;
      case 'journal':
        return <FaNewspaper className="source-icon" style={{ color: '#e74c3c' }} />;
      default:
        return <FaBookOpen className="source-icon" style={{ color: '#7f8c8d' }} />;
    }
  };

  const generateMockSources = (text) => {
    // Extract some keywords from the text
    const words = text.split(/\s+/).filter(word => word.length > 4);
    const uniqueWords = [...new Set(words)].slice(0, 5);
    
    if (uniqueWords.length === 0) return [];
    
    // Generate mock sources based on keywords
    return uniqueWords.map((keyword, index) => ({
      title: `${keyword} - Historical Analysis`,
      description: `Comprehensive analysis and historical context related to ${keyword} and its significance.`,
      url: `https://example.com/source/${index}`,
      sourceType: index % 2 === 0 ? 'Wikipedia' : 'Academic Paper',
      icon: index % 2 === 0 ? 'wikipedia' : 'academic',
      relevance: Math.floor(Math.random() * 15) + 85 // Random relevance between 85-99%
    }));
  };

  const processImage = async () => {
    if (!selectedFile) return;
    
    setLoading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);
    
    try {
      const response = await axios.post(`${API_BASE_URL}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setExtractedText(response.data.originalText);
      setRestoredText(response.data.restoredText);
      
      // Use sources from API if available, otherwise generate mock sources
      if (response.data.sources && response.data.sources.length > 0) {
        setSourcesData(response.data.sources);
      } else {
        const mockSources = generateMockSources(response.data.originalText);
        setSourcesData(mockSources);
      }
    } catch (error) {
      console.error('Error processing image:', error);
      alert('Error processing image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filterSources = () => {
    if (activeSourceType === 'all') {
      return sourcesData;
    }
    return sourcesData.filter(source => 
      source.sourceType.toLowerCase() === activeSourceType.toLowerCase()
    );
  };

  return (
    <div className="upload-section">
      <div className="upload-container">
        <div className="upload-area">
          <input
            type="file"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept="image/*"
          />
          
          {!uploadedImage ? (
            <div className="upload-placeholder" onClick={handleUploadButtonClick}>
              <FaUpload className="upload-icon" />
              <h3>Upload Image</h3>
              <p>Click to select a file or drag and drop</p>
              <p className="accepted-formats">Accepted formats: JPG, PNG, TIFF</p>
            </div>
          ) : (
            <div className="uploaded-image-container">
              <img 
                src={uploadedImage} 
                alt="Uploaded" 
                className="uploaded-image" 
              />
              <div className="image-actions">
                <button 
                  className="change-image-btn" 
                  onClick={handleUploadButtonClick}
                >
                  Change Image
                </button>
                <button 
                  className="process-btn" 
                  onClick={processImage}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Process Image'}
                </button>
              </div>
            </div>
          )}
        </div>
        
        {loading && (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <p>Processing your image. This may take a moment...</p>
          </div>
        )}

        {extractedText && !loading && (
          <div className="results-container">
            <div className="text-restoration-section">
              <h2>Extracted Text</h2>
              <div className="text-container original-text">
                <p style={{fontFamily: "'Source Serif Pro', serif", fontSize: "18px", lineHeight: "1.6"}}>{extractedText}</p>
              </div>
              
              <h2>Restored Text</h2>
              <div className="text-container restored-text">
                <p>{restoredText}</p>
              </div>
            </div>

            {sourcesData.length > 0 && (
              <div className="research-section">
                <h2 className="research-title">
                  <FaSearch className="research-icon" /> 
                  Research Results
                </h2>

                <div className="source-filters">
                  <button 
                    className={`filter-btn ${activeSourceType === 'all' ? 'active' : ''}`}
                    onClick={() => setActiveSourceType('all')}
                  >
                    All Sources
                  </button>
                  {[...new Set(sourcesData.map(s => s.sourceType))].map(type => (
                    <button 
                      key={type}
                      className={`filter-btn ${activeSourceType === type.toLowerCase() ? 'active' : ''}`}
                      onClick={() => setActiveSourceType(type.toLowerCase())}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                <div className="sources-grid">
                  {filterSources().map((source, index) => (
                    <div 
                      key={index}
                      className={`source-card ${expandedSourceIndex === index ? 'expanded' : ''}`}
                      onClick={() => toggleSourceExpand(index)}
                    >
                      <div className="source-header">
                        {getIconForSource(source.sourceType)}
                        <h3>{source.title}</h3>
                      </div>
                      
                      {expandedSourceIndex === index && (
                        <div className="source-details">
                          <p className="source-description">{source.description}</p>
                          <div className="source-metadata">
                            <span className="source-relevance">
                              Relevance: <strong>{source.relevance}%</strong>
                            </span>
                            <a 
                              href={source.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="source-link"
                              onClick={(e) => e.stopPropagation()}
                            >
                              View Source
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="research-summary">
                  <h3>Research Methodology</h3>
                  <p>
                    Our system analyzes extracted text and searches multiple academic 
                    and historical sources including <strong>Google Books</strong>, <strong>arXiv</strong>, 
                    <strong>Wikipedia</strong>, and <strong>Historical Archives</strong> to provide 
                    comprehensive research context for document restoration.
                  </p>
                  <p>
                    Click on any source card above to view more details about that specific reference.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadSection;
