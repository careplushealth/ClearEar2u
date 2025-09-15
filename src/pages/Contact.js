import React from "react";
import "./Contact.css";

function Contact() {
  return (
    <div className="contact-page">
  {/* Top Section */}
  <div className="contact-header">
    <div className="contact-left">
      <h1>SAY HI</h1>
    </div>
    <div className="contact-right">
      <p>Let’s make something together.</p>
      <p className="sub-text">
        Fill out the form or just email me at <a href="mailto:hello@site.com">hello@site.com</a>
      </p>
    </div>
  </div>

  {/* Form Section */}
  <div className="contact-form">
    <div className="form-header">
      <span className="form-step">00</span>
      <h2>Contact</h2>
    </div>

    <form>
      <div className="form-row">
        <div className="form-group">
          <label>NAME</label>
          <input type="text" placeholder="Your Name" />
        </div>
        <div className="form-group">
          <label>EMAIL</label>
          <input type="email" placeholder="Email" />
        </div>
      </div>

      <div className="form-group full-width">
        <label>MESSAGE</label>
        <textarea placeholder="Message"></textarea>
      </div>

      <button type="submit" className="submit-btn">SUBMIT</button>
    </form>
  </div>

  {/* Info Section */}
  <div className="contact-info">
    <div className="info-block">
      <span className="info-step">01</span>
      <h3>Email</h3>
      <p>hello@site.com</p>
    </div>
    <div className="info-block highlight">
      <span className="info-step">02</span>
      <h3>Phone</h3>
      <p>800-123-4567</p>
    </div>
    <div className="info-block">
      <span className="info-step">03</span>
      <h3>Instagram</h3>
      <p>@Webflow</p>
    </div>
  </div>
</div>

  );
}

export default Contact;