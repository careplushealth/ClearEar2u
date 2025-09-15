import React, { useState } from "react";
import "./Faq.css";

const faqs = [
  {
    question: "What is microsuction earwax removal?",
    answer: "Microsuction is a safe and effective method of removing earwax using gentle suction. Unlike ear syringing, it doesn’t use water, making it a cleaner and safer option, especially for people with ear conditions."
  },
  {
    question: "Is microsuction safe?",
    answer: "Yes, microsuction is considered the safest method of earwax removal. It’s the technique most recommended by audiologists and ENT specialists."
  },
  {
    question: "How long does the procedure take?",
    answer: "A typical microsuction appointment takes around 15–30 minutes, depending on how much wax needs to be removed."
  },
  {
    question: "Does microsuction hurt?",
    answer: "No, microsuction is not painful. Some people may find the suction noise a little unusual, but most patients describe the process as quick and comfortable."
  },
  {
    question: "How to edit a landing page in Mailchimp?",
    answer: "Open your Mailchimp dashboard, go to Landing Pages, select your page, and edit content, styles, or integrations."
  },
  {
    question: "Do I need to use ear drops before my appointment?",
    answer: "We usually recommend using olive oil or sodium bicarbonate drops 2–3 days before your appointment. This helps soften the wax and makes removal easier."
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
