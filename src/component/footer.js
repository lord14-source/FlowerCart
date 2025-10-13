import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <h2>Flower-Cart</h2>
        </div>
        <div className="footer-links">
          <a href="#privacy" className="footer-link">Privacy Policy</a>
          <a href="#terms" className="footer-link">Terms of Service</a>
          <a href="#contact" className="footer-link">Contact Us</a>
        </div>
        <div className="footer-socials">
          <a href="#facebook" className="social-link">Facebook</a>
          <a href="#instagram" className="social-link">Instagram</a>
          <a href="#twitter" className="social-link">Twitter</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 Flower-Cart. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
