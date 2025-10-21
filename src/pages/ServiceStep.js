import React, { useState } from "react";
import "./FormSteps.css";

const ServiceStep = ({ onNext, onBack }) => {
  const [selectedService, setSelectedService] = useState("");
  const [usedOliveOil, setUsedOliveOil] = useState(false);
  const [deliverOliveOil, setDeliverOliveOil] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedService || !usedOliveOil) return; // Must select service + confirm olive oil use
    onNext({
      service: selectedService,
      usedOliveOil,
      deliverOliveOil,
    });
  };

  return (
    <div className="form-container">
      <div className="step-bar"></div>
      <p className="step">
        Step 3 of 3 <span>Consultation</span>
      </p>

      <div className="form-header">
        <h2>Choose a Service</h2>
      </div>

      <form className="option-form" onSubmit={handleSubmit}>
        {[
          "Clinic Visit – Children (£80)",
          "Clinic Visit – One Ear (£55)",
          "Clinic Visit – Both Ears (£65)",
          "Home Visit (£85)",
        ].map((svc) => (
          <button
            type="button"
            key={svc}
            className={`option-btn ${selectedService === svc ? "active" : ""}`}
            onClick={() => setSelectedService(svc)}
          >
            {svc}
          </button>
        ))}

<div className="checkbox-section">
<label className="checkbox-item">
  <input
    type="checkbox"
    checked={usedOliveOil}
    onChange={(e) => setUsedOliveOil(e.target.checked)}
    required
  />
  <span>
    Each appointment requires using olive oil ear drops for at least 3 days before your appointment.
    If not, you may have to pay for a follow-up appointment.
  </span>
</label>

<label className="checkbox-item">
  <input
    type="checkbox"
    checked={deliverOliveOil}
    onChange={(e) => setDeliverOliveOil(e.target.checked)}
  />
  <span>Do you want us to deliver olive oil to you?</span>
</label>

</div>


        <div className="form-actions">
          <button type="button" className="back-btn" onClick={onBack}>
            Back
          </button>
          <button
            type="submit"
            className="continue-btn"
            disabled={!selectedService || !usedOliveOil}
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceStep;
