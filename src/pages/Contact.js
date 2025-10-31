import React from "react";
import "./Contact.css";
import ContactForm from "./ContactForm";

function Contact() {
  return (
    <div className="contact-page">
  {/* Top Section */}
  <div className="contact-header">
    <div className="contact-left">
      <h1>Have a Question?</h1>
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
    <div className="info-icon">
      <img src="email.png" alt="Email Icon" />
    </div>
    <h3>Email</h3>
    <p>info@clearear2u.co.uk</p>
  </div>

  <div className="info-block highlight">
    <div className="info-icon">
      <img src="phone.png" alt="Phone Icon" />
    </div>
    <h3>Phone</h3>
    <p>078 36302702</p>
  </div>

  <div className="info-block">
    <div className="info-icon">
      <img src="instagram.png" alt="Instagram Icon" />
    </div>
    <h3>Instagram</h3>
    <p>@clearear2u</p>
  </div>
</div>


</div>

  );
}

export default Contact;