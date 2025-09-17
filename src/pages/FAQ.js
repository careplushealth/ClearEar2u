import React, { useState } from "react";
import "./Faq.css";

const faqs = [
  {
    question: "What is microsuctioning?",
    answer: "Microsuction uses a specialised operating microscope to give a clear, magnified view of your ear canal. This allows our clinician to work with precision and gently remove wax using a very fine, sterile suction device at low pressure. Occasionally, a small instrument may also be used to lift out harder wax. Because we can see exactly what we’re doing, the delicate skin of the ear canal is rarely touched, making the process much more comfortable. Microsuction is widely regarded by healthcare professionals and patients as the safest and most effective way to clear ear wax."
  },
  {
    question: "Is microsuction safe?",
    answer: "Yes, microsuction is considered the safest method of earwax removal. It’s the technique most recommended by audiologists and ENT specialists."
  },
  {
    question: "Why regular ear care helps prevent these problems?",
    answer: "By keeping the ear canal clear of excess wax, you reduce the risk of pain, infection and hearing difficulties. Professional removal by a trained clinician is quick, gentle and much safer than trying to clean your ears yourself at home."
  },
  {
    question: "Does microsuction hurt?",
    answer: "No, microsuction is not painful. Some people may find the suction noise a little unusual, but most patients describe the process as quick and comfortable."
  },
  {
    question: "Problems caused by too much ear wax",
    answer: "Excess earwax can lead to a variety of uncomfortable symptoms. It may cause hearing loss or muffled hearing, as the blockage prevents sound from reaching the eardrum. Many people also experience earache or a feeling of pressure and fullness due to trapped wax pressing on the ear canal. In some cases, tinnitus—ringing or buzzing in the ears—can be triggered or worsened by the blockage. The build-up can also cause itchiness and irritation by inflaming the skin of the ear canal. In more severe cases, a blocked ear may even lead to dizziness or imbalance, as it can interfere with your sense of stability. Additionally, excess wax increases the risk of ear infections by trapping bacteria and moisture, and it can also cause problems for hearing aid users by blocking or damaging the devices or earmoulds."
  },
  {
    question: "Why Choose ClearEar2U?",
    answer: "Professional ear care offers a safe and gentle solution, with trained clinicians using specialist equipment to remove wax without harming the delicate ear canal. The treatment is fast and effective, usually taking only minutes and providing immediate relief from blocked ears. For added convenience, clinicians come directly to your home with all the necessary equipment, eliminating the need for travel or waiting rooms. This approach also gives you peace of mind, avoiding the risks of cotton buds or home kits and ensuring you receive clear aftercare advice. By choosing professional care, you keep your ears healthy, your hearing clear, and your risk of infection low."
  },
  {
    question: "How often should I get my ears cleaned?",
    answer: "This varies by individual. Some people need treatment every 6–12 months, while others may rarely need it. Our specialists can advise you based on your ear health."
  },
];

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="faq-container">
      <h2 className="faq-title">FAQs</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div className="faq-item" key={index}>
            <div className="faq-question" onClick={() => toggleFaq(index)}>
              <span>{faq.question}</span>
              <button className="faq-toggle">
                {activeIndex === index ? "−" : "+"}
              </button>
            </div>
            {activeIndex === index && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
