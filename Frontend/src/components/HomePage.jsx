import React from 'react';
import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import Features from './Features';
import Contact from './Contact';
import Footer from './Footer';

const HomePage = () => {
  return (
    <div className="home-page">
      <Navbar />
      <Home />
      <About />
      <Features />
      <Contact />
      <Footer />
    </div>
  );
};

export default HomePage; 