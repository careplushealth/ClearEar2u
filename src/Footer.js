import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
  <div className="footer-container">
    {/* Left Column */}
    <div className="footer-col">
      <h2>ClearEar2U</h2>
      <p>
Say goodbye to blocked ears without leaving your home. Our mobile ear wax microsuction service brings safe, professional treatment right to your doorstep
      </p>
      <div className="social-icons">
        <a href="youtube.com"><i className="fab fa-youtube"></i></a>
        <a href="#linkedin.com"><i className="fab fa-linkedin"></i></a>
        <a href="twitter.com"><i className="fab fa-x-twitter"></i></a>
        <a href="instagram.com"><i className="fab fa-instagram"></i></a>
        <a href="facebook.com"><i className="fab fa-facebook"></i></a>
      </div>
    </div>

    {/* Quick Links */}
    <div className="footer-col">
      <h3>Quick Links</h3>
      <ul>
        <li><a href="/about">About Us</a></li>
        <li><a href="/#pricing">Pricing</a></li>
        <li><a href="/contact">Contact Us</a></li>
      </ul>
    </div>

    {/* Need Help */}
    <div className="footer-col">
      <h3>Need Help?</h3>
      <p>Give us a call</p>
      <p className="highlight">07386622111</p>
      <p>Write us an email</p>
      <p className="highlight">info@clearear2u.co.uk</p>
    </div>

    {/* Newsletter */}
    <div className="footer-col">
      <h3>Newsletter</h3>
      <form className="newsletter-form">
        <input type="email" placeholder="Enter your email" />
        <button type="submit">Subscribe</button>
      </form>
    </div>
  </div>

  {/* Bottom Bar */}
  <div className="footer-bottom">
    <p>© 2025 | All Rights Reserved | Provided by <a href="https://visualab.uk">Visualab</a></p>
  </div>
</div>

  );
};

export default Footer;
