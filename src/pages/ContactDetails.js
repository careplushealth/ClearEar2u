import React, { useState } from "react";
import "./ContactDetails.css";

const ContactDetails = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    agreed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const validateUKPhone = (phone) => {
    // UK number validation: +44 or 07
    const regex = /^(?:\+44\s?7\d{9}|07\d{9})$/;
    return regex.test(phone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateUKPhone(formData.phone)) {
      alert("Please enter a valid UK phone number (07... or +44...).");
      return;
    }
    // ❌ Removed the check that forced 'agreed'
    onNext(formData);
  };

  return (
    <div className="form-container">
      {/* Step progress bar + text */}
      <div className="step-bar"></div>
      <p className="step">
        Step 2 of 3 <span>Contact Details</span>
      </p>

      {/* Centered heading */}
      <div className="form-header">
        <h2>Please add your email and phone number</h2>
      </div>

      {/* Contact Form */}
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Email Address
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Telephone Number
          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>

        {/* Checkbox (not required anymore) */}
        <label className="checkbox">
          <input
            type="checkbox"
            name="agreed"
            checked={formData.agreed}
            onChange={handleChange}
          />
          <span>
            I agree to nominate CarePlus as my nominated pharmacy to deliver my
            medication
          </span>
        </label>

        <button
          type="submit"
          className="continue-btn"
          disabled={!formData.email || !formData.phone} // ✅ no agreed check
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default ContactDetails;
