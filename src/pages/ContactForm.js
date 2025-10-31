import { useState } from "react";
import "./ContactForm.css";



export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "affbe556-d2d8-4235-a568-cbb14d4ce7f0", // 🔑 Replace with your Web3Forms key
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus("Message sent successfully ✅");
        setFormData({ name: "", email: "", message: "" }); // clear form
      } else {
        setStatus("Something went wrong ❌");
      }
    } catch (error) {
      setStatus("Error sending message ❌");
    }
  };

  return (
    <div className="contact-form">
      <div className="form-header">
        <span className="form-step"></span>
        <h2>Contact</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>NAME</label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>EMAIL</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group full-width">
          <label>MESSAGE</label>
          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">SUBMIT</button>
      </form>

      {status && <p className="form-status">{status}</p>}
    </div>
  );
}
