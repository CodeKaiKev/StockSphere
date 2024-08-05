import React from 'react';
import './Footer.css';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; 2024 Kevin Paul</p>
        <ul className="social-links">
          <li><a href="#" target="_blank"><i className="fa fa-facebook"></i></a></li>
          <li><a href="#" target="_blank"><i className="fa fa-twitter"></i></a></li>
          <li><a href="#" target="_blank"><i className="fa fa-linkedin"></i></a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;