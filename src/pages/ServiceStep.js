import React, { useState } from "react";
import "./FormSteps.css";

const ServiceStep = ({ onNext, onBack }) => {
  const [selectedService, setSelectedService] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedService) return;
    onNext({ service: selectedService });
  };

  return (
    <div className="form-container">
       <div className="step-bar"></div>
  <p className="step">Step 3 of 3 <span>Consultation</span></p>
  
  <div className="form-header">
    <h2>Choose a Service</h2>
  </div>

      <form className="option-form" onSubmit={handleSubmit}>
        {["Clinic Visit – Children (£80)", "Clinic Visit – One Ear (£55)", "Clinic Visit – Both Ears(£65)", "Home Visit (£80)"].map((svc) => (
          <button
            type="button"
            key={svc}
            className={`option-btn ${selectedService === svc ? "active" : ""}`}
            onClick={() => setSelectedService(svc)}
          >
            {svc}
          </button>
        ))}

        <div className="form-actions">
          <button type="button" className="back-btn" onClick={onBack}>Back</button>
          <button type="submit" className="continue-btn" disabled={!selectedService}>
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceStep;
