import React, { useEffect, useState } from 'react';
import './Home.css';

const Home = () => {
  // Array of rotating content
  const rotatingContent = [
    '🌸 Discover our exclusive range of vibrant bouquets.',
    '🌼 Enjoy fast and reliable delivery to your doorstep.',
    '🌺 Perfect flowers for every occasion—shop now!',
    '🌷 Fresh and handpicked flowers to brighten your day.',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Rotate content every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % rotatingContent.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [rotatingContent.length]);

  return (
    <header className="home">
      {/* Header Section */}
      
     

      {/* Main Content */}
      <div className="container">
        <h2 className="main-title">Welcome to Flower-Cart!</h2>
        <p className="main-content-highlight">{rotatingContent[currentIndex]}</p>
      </div>
    </header>
  );
};

export default Home;
