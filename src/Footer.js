import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
  <div className="footer-container">
    {/* Left Column */}
    <div className="footer-col">
      <h2>CarePlus Homes</h2>
      <p>
        Creating a stable, loving, and structured environment where children can heal,
        grow, and build brighter futures.
      </p>
      <div className="social-icons">
        <a href="#"><i className="fab fa-youtube"></i></a>
        <a href="#"><i className="fab fa-linkedin"></i></a>
        <a href="#"><i className="fab fa-x-twitter"></i></a>
        <a href="#"><i className="fab fa-instagram"></i></a>
        <a href="#"><i className="fab fa-facebook"></i></a>
      </div>
    </div>

    {/* Quick Links */}
    <div className="footer-col">
      <h3>Quick Links</h3>
      <ul>
        <li><a href="#">About Us</a></li>
        <li><a href="#">Vacancies</a></li>
        <li><a href="#">Contact Us</a></li>
      </ul>
    </div>

    {/* Need Help */}
    <div className="footer-col">
      <h3>Need Help?</h3>
      <p>Give us a call</p>
      <p className="highlight">0303 2222222</p>
      <p>Write us an email</p>
      <p className="highlight">info@careplushomes.co.uk</p>
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
    <p>© 2025 | All Rights Reserved | Provided by <a href="#">Visualab</a></p>
  </div>
</div>

  );
};

export default Footer;
