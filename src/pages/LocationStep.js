import React, { useState } from "react";
import "./FormSteps.css";

const LocationStep = ({ onNext, onBack }) => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [address, setAddress] = useState({
    line1: "",
    line2: "",
    city: "",
    postcode: "",
  });
  const [errors, setErrors] = useState({ postcode: "", general: "" });

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const validateUKPostcode = (postcode) => {
    const ukPostcodeRegex =
      /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))\s?[0-9][A-Za-z]{2})$/;
    return ukPostcodeRegex.test(postcode.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedLocation) return;

    if (selectedLocation === "Home Visit") {
      if (!address.line1 || !address.city || !address.postcode) {
        setErrors({
          ...errors,
          general: "Please fill in all required address fields.",
        });
        return;
      }

      if (!validateUKPostcode(address.postcode)) {
        setErrors({
          ...errors,
          postcode: "Please enter a valid UK postcode.",
          general: "",
        });
        return;
      }
    }

    setErrors({ postcode: "", general: "" });
    onNext({
      location: selectedLocation,
      ...(selectedLocation === "Home Visit" ? { address } : {}),
    });
  };

  return (
    <div className="form-container">
      <div className="step-bar"></div>
      <p className="step">
        Step 3 of 3 <span>Consultation</span>
      </p>

      <div className="form-header">
        <h2>Choose a Location</h2>
      </div>

      <form className="option-form" onSubmit={handleSubmit}>
        {["Manchester Clinic", "Southport Clinic", "Liverpool Clinic", "Home Visit"].map(
          (loc) => (
            <button
              type="button"
              key={loc}
              className={`option-btn ${selectedLocation === loc ? "active" : ""}`}
              onClick={() => setSelectedLocation(loc)}
            >
              {loc}
            </button>
          )
        )}

        {/* Extra fields if Home Visit */}
        {selectedLocation === "Home Visit" && (
          <div className="home-visit-fields">
            <label>
              Address Line 1 *
              <input
                type="text"
                name="line1"
                value={address.line1}
                onChange={handleAddressChange}
                required
              />
            </label>
            <label>
              Address Line 2
              <input
                type="text"
                name="line2"
                value={address.line2}
                onChange={handleAddressChange}
              />
            </label>
            <label>
              City *
              <input
                type="text"
                name="city"
                value={address.city}
                onChange={handleAddressChange}
                required
              />
            </label>
            <label>
              Postcode *
              <input
                type="text"
                name="postcode"
                value={address.postcode}
                onChange={handleAddressChange}
                required
              />
            </label>
            {errors.postcode && (
              <small style={{ color: "red" }}>{errors.postcode}</small>
            )}
            {errors.general && (
              <small style={{ color: "red" }}>{errors.general}</small>
            )}
          </div>
        )}

        <div className="form-actions">
          <button type="button" className="back-btn" onClick={onBack}>
            Back
          </button>
          <button
            type="submit"
            className="continue-btn"
            disabled={
              !selectedLocation ||
              (selectedLocation === "Home Visit" &&
                (!address.line1 || !address.city || !address.postcode))
            }
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default LocationStep;
