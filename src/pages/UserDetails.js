import React, { useState } from "react";
import "./UserDetails.css";

const UserDetails = ({ onNext }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    sex: "",
    postcode: "",
  });

  const [errors, setErrors] = useState({ dob: "", postcode: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Only allow numbers for DOB fields
    if (["dobDay", "dobMonth", "dobYear"].includes(name)) {
      if (!/^\d*$/.test(value)) return; // block non-numeric input
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSexSelect = (sex) => {
    setFormData({ ...formData, sex });
  };

  const validateDOB = () => {
    const { dobDay, dobMonth, dobYear } = formData;

    const day = parseInt(dobDay, 10);
    const month = parseInt(dobMonth, 10);
    const year = parseInt(dobYear, 10);

    if (!day || !month || !year) return "Please complete your date of birth.";
    if (dobYear.length !== 4) return "Year must be 4 digits.";
    if (month < 1 || month > 12) return "Invalid month.";
    if (day < 1 || day > 31) return "Invalid day.";
    if (year < 1900 || year > new Date().getFullYear()) return "Invalid year.";

    return "";
  };

  const validatePostcode = () => {
    const ukPostcodeRegex =
      /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))\s?[0-9][A-Za-z]{2})$/;
    if (!ukPostcodeRegex.test(formData.postcode.trim())) {
      return "Please enter a valid UK postcode.";
    }
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dobError = validateDOB();
    const postcodeError = validatePostcode();

    if (dobError || postcodeError) {
      setErrors({ dob: dobError, postcode: postcodeError });
      return;
    }

    setErrors({ dob: "", postcode: "" });
    onNext(formData); // Pass data to next step
  };

  return (
    <div className="form-container">
      <div className="step-bar"></div>
      <p className="step">
        Step 1 of 3 <span>Your Details</span>
      </p>
      <div className="form-header">
        <h2>To get started, please provide a few details</h2>
      </div>

      <form className="details-form" onSubmit={handleSubmit}>
        <label>
          First name
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Surname
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <small>
            This should exactly match how it appears on your GP surgery’s
            records.
          </small>
        </label>

        <label>Date of Birth</label>
        <div className="dob-group">
          <input
            type="text"
            name="dobDay"
            placeholder="DD"
            maxLength="2"
            value={formData.dobDay}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="dobMonth"
            placeholder="MM"
            maxLength="2"
            value={formData.dobMonth}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="dobYear"
            placeholder="YYYY"
            maxLength="4"
            value={formData.dobYear}
            onChange={handleChange}
            required
          />
        </div>
        {errors.dob && <small style={{ color: "red" }}>{errors.dob}</small>}

        <label>Sex assigned at birth</label>
        <div className="sex-buttons">
          <button
            type="button"
            className={formData.sex === "Female" ? "active" : ""}
            onClick={() => handleSexSelect("Female")}
          >
            Female
          </button>
          <button
            type="button"
            className={formData.sex === "Male" ? "active" : ""}
            onClick={() => handleSexSelect("Male")}
          >
            Male
          </button>
        </div>

        <label>
          Postcode
          <input
            type="text"
            name="postcode"
            placeholder="Postcode"
            value={formData.postcode}
            onChange={handleChange}
            required
          />
        </label>
        {errors.postcode && (
          <small style={{ color: "red" }}>{errors.postcode}</small>
        )}

        <button
          type="submit"
          className="continue-btn"
          disabled={
            !formData.firstName ||
            !formData.lastName ||
            !formData.dobDay ||
            !formData.dobMonth ||
            !formData.dobYear ||
            !formData.sex ||
            !formData.postcode
          }
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default UserDetails;
