import React, { useState } from "react";
import UserDetails from "./UserDetails";
import ContactDetails from "./ContactDetails";
import LocationStep from "./LocationStep";
import ServiceStep from "./ServiceStep";
import BookingWidget from "../Bookingwidget";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleNext = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const sendToEmail = async (payload) => {
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      return data?.success === true;
    } catch (error) {
      console.error("Web3Forms error:", error);
      return false;
    }
  };

  const handleFinish = async (data) => {
    const finalData = { ...formData, ...data };

    const payload = {
      access_key: "affbe556-d2d8-4235-a568-cbb14d4ce7f0",
      subject: "New ClearEar2u Form Submission",
      from_name: "ClearEar2u Website",
      botcheck: "",

      // --- Patient details ---
      first_name: finalData.firstName || "",
      last_name: finalData.lastName || "",
      dob: [finalData.dobDay, finalData.dobMonth, finalData.dobYear]
        .filter(Boolean)
        .join("/"),
      sex_at_birth: finalData.sex || "",
      postcode: finalData.postcode || "",

      // --- Contact ---
      email: finalData.email || "",
      phone: finalData.phone || "",

      // --- Service ---
      location: finalData.location || "",
      service: finalData.service || "",
      consent_nominated_pharmacy: finalData.agreed ? "Yes" : "No",

      // --- Include Home Visit address if applicable ---
      ...(finalData.location === "Home Visit" && finalData.address
        ? {
            address_line1: finalData.address.line1 || "",
            address_line2: finalData.address.line2 || "",
            address_city: finalData.address.city || "",
            address_postcode: finalData.address.postcode || "",
          }
        : {}),

      // --- meta info ---
      page_url: window.location.href,
      user_agent: navigator.userAgent,
    };

    const ok = await sendToEmail(payload);

    if (ok) {
      // go to booking step
      setStep(5);
    } else {
      // fallback: still go to booking step, but log error
      console.error("❌ Something went wrong sending your details.");
      setStep(5);
    }
  };

  return (
    <div>
      {step === 1 && <UserDetails onNext={handleNext} />}
      {step === 2 && <ContactDetails onNext={handleNext} onBack={handleBack} />}
      {step === 3 && <LocationStep onNext={handleNext} onBack={handleBack} />}
      {step === 4 && <ServiceStep onNext={handleFinish} onBack={handleBack} />}
      {step === 5 && <BookingWidget />}
    </div>
  );
};

export default MultiStepForm;
