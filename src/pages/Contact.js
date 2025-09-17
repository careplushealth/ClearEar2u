import React from "react";
import "./Contact.css";
import ContactForm from "./ContactForm";

function Contact() {
  return (
    <div className="contact-page">
  {/* Top Section */}
  <div className="contact-header">
    <div className="contact-left">
      <h1>SAY HI</h1>
    </div>
    <div className="contact-right">
      <p>Contact Us</p>
      <p className="sub-text">
        Fill out the form or just email us at <a href="mailto:info@clearear2u.co.uk">info@clearear2u.co.uk</a>
      </p>
    </div>
  </div>

  {/* Form Section */}
  <ContactForm />


  {/* Info Section */}
  <div className="contact-info">
    <div className="info-block">
      <span className="info-step">01</span>
      <h3>Email</h3>
      <p>info@clearear2u.co.uk</p>
    </div>
    <div className="info-block highlight">
      <span className="info-step">02</span>
      <h3>Phone</h3>
      <p>073 86622111</p>
    </div>
    <div className="info-block">
      <span className="info-step">03</span>
      <h3>Instagram</h3>
      <p>@clearear2u</p>
    </div>
  </div>
</div>

  );
}

export default Contact;