import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <div className="top-bar">
        <span>Top-rated mobile ear care service in North West England</span>
        
      </div>

      <div className="main-header">
        <div className="logo">
          <img src="/Logo.png" alt="ClearEar2U Logo" className="logo-img" />
        </div>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          <ul>
            <li><Link to="/">Home</Link></li>
           <li>
  <a href="#pricing">Pricing</a>
</li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>

        {/* Appointment button (desktop only) */}
        <div className="appointment-btn desktop-btn">
          <button>📅 Book an Appointment</button>
        </div>

        {/* Hamburger icon */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Mobile Menu Slider */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setMenuOpen(false)}>×</button>
        <ul>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
         <li> <a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a></li>
          <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
          <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
        </ul>
        <div className="appointment-btn">
          <button>📅 Book an Appointment</button>
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)}></div>}
    </header>
  );
}

export default Header;
