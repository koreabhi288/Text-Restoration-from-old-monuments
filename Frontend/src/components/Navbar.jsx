import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="text-xl font-bold text-blue-600">TextRestorer</div>
        <div className="hidden md:flex space-x-8">
          <button 
            onClick={() => scrollToSection('home')}
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('about')}
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('features')}
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Features
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Contact
          </button>
          <button className='text-gray-700 hover:text-blue-600 transition-colors'>
            <a href='https://drive.google.com/drive/folders/1A1LELFO1EINrdlFuaagWUDZjEDIe45aV?usp=drive_link'>Download Test Images</a>
          </button>
        </div>
        <Link to="/upload" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
          Get Started
        </Link>
      </div>
    </nav>
  );
};

export default Navbar; 