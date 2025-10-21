import React from "react";
import "./About.css";
import Faq from "./FAQ";
import ClinicLocator from "./ClinicLocator";
import { Link } from "react-router-dom";


function About() {
  return (
<div>

 <div className="landing-section">
  <div className="landing-text">
    <p className="subheading">About ClearEar2U</p>
    <h1>Safe, Professional Earwax Removal</h1>
    <p className="description">
We specialise in gentle and effective earwax removal using microsuction, the gold-standard method recommended by hearing care professionals. With both mobile home visits and in-clinic appointments across Manchester, Southport, and Liverpool, we make ear care simple, safe, and accessible for everyone.    </p>
    <Link to="/booking" className="cta-btn">
  Book Your Appointment
</Link>
  </div>

  <div className="landing-image">
    <img src="ear5.jpg" alt="Landing Page Builder Preview" />
  </div>
</div>



<div className="gourmet-section">
  <h2 className="gourmet-title">Clear Hearing, Clear Confidence</h2>
  <p className="gourmet-subtitle"><em>Ear Care That Comes to You</em></p>


  <div className="gourmet-description">
    <p>
      We believe ear health should be convenient. That’s why ClearEar2U offers mobile earwax removal in the comfort of your home, as well as clinics in Manchester, Southport, and Liverpool. Our fully trained specialists use advanced microsuction technology to deliver safe, fast, and comfortable treatments.
    </p>
  </div>

</div>










<ClinicLocator/>



<Faq/>

</div>

  );
}

export default About;
