import React from "react";
import "./Home.css";
import { FaShieldAlt, FaUserMd, FaRegCalendarAlt, FaPercent, FaCreditCard } from "react-icons/fa";
import { Link } from "react-router-dom";



function Home() {
  return (
    <div>
    <section className="locksmith-banner">
      {/* Left Content */}
      <div className="banner-left">
        <h1>
          Mobile Ear <br />
          Microsuction Specialist<br />
        </h1>
        <p>
          Say goodbye to blocked ears without leaving your home. Our mobile ear wax microsuction service brings safe, professional treatment right to your doorstep
        </p>
       <Link to="/about">
  <button className="call-btn">More Information</button>
</Link>
      </div>

      {/* Right Image */}
      <div className="banner-right">
        <img src="/ear4.jpeg" alt="Locksmith keys" />
      </div>
    </section>


<div className="rich-text-section">
  <div className="rich-text-left">
    <h2>
      Fast, Gentle & Professional  <br />
      <span className="highlight">Earwax Removal</span> <br />
      Service
    </h2>
  </div>
  <div className="rich-text-right">
    <p>
     We believe ear health should be convenient. That’s why ClearEar2u offers mobile earwax removal in the comfort of your home, as well as clinics in Manchester, Southport, and Liverpool. Our fully trained specialists use advanced microsuction technology to deliver safe, fast, and comfortable treatments.
    </p>
  </div>
</div>

    

<div className="map-section">
  <div className="map-box">
    <iframe
      title="Manchester Map"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d75993.27277526465!2d-2.305862918075895!3d53.472217110155555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487a4d4c5226f5db%3A0xd9be143804fe6baa!2sManchester!5e0!3m2!1sen!2suk!4v1756742369529!5m2!1sen!2suk"
      width="100%"
      height="250"
      style={{ border: 0, borderRadius: "12px" }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>

  <div className="map-box">
    <iframe
      title="Liverpool Map"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d152269.56130887882!2d-3.0833949651087056!3d53.393149338603095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487adf8a647060b7%3A0x42dc046f3f176e01!2sLiverpool!5e0!3m2!1sen!2suk!4v1756742522962!5m2!1sen!2suk"
      width="100%"
      height="250"
      style={{ border: 0, borderRadius: "12px" }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>

  <div className="map-box">
    <iframe
      title="Southport Map"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d75703.17743770903!2d-3.158080711602621!3d53.63405639830341!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487b15315eb47ffb%3A0x9464ca1ad2094f88!2sSouthport!5e0!3m2!1sen!2suk!4v1756742598721!5m2!1sen!2suk"
      width="100%"
      height="250"
      style={{ border: 0, borderRadius: "12px" }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</div>





  <div className="specializations-section">
      <div className="specializations-header">
        <h2>What we Specialize In</h2>
      </div>
      <div className="specializations-grid">
        <div className="specialization-card">
          <FaShieldAlt className="specialization-icon" />
          <p>Safe and Gentle</p>
        </div>
        <div className="specialization-card">
          <FaUserMd className="specialization-icon" />
          <p>Fully Qualified and Insured</p>
        </div>
        <div className="specialization-card">
          <FaRegCalendarAlt className="specialization-icon" />
          <p>Same Day Appointments</p>
        </div>
        <div className="specialization-card">
          <FaPercent className="specialization-icon" />
          <p>Discounts for CareHomes</p>
        </div>
        <div className="specialization-card">
          <FaCreditCard className="specialization-icon" />
          <p>Transparent Pricing</p>
        </div>
      </div>
    </div>

<div className="pricing-heading" id="pricing">
  <h1>Our Services Price List</h1>
</div>
 <div className="pricing-container">
  
      <div className="pricing-card">
        <h2 className="plan-title">Clinic Visit – Children</h2>
        <p className="plan-subtitle">Visit your local clinic</p>
        <p className="plan-price">
          £80 <span className="sub">Children Under 12</span>
        </p>
<Link to="/booking">
  <button className="plan-button">Book Now</button>
</Link>
        <div className="features">
          <h4>Key Features</h4>
          <ul>
            <li>✓ Microsuction Ear Wax removal</li>
            <li>✓ Ear Health check</li>
            <li>
              ✓ Patient referral report <span className="new">NEW</span>
            </li>
            <li>✓ Consultation with our experienced team</li>
          </ul>
        </div>
      </div>

      <div className="pricing-card">
        <h2 className="plan-title">Clinic Visit – One Ear</h2>
        <p className="plan-subtitle">
        Visit your local clinic
        </p>
        <p className="plan-price">
          £55 <span className="sub">1 Ear</span>
        </p>
       <Link to="/booking">
  <button className="plan-button">Book Now</button>
</Link>
        <div className="features">
          <h4>Features</h4>
          <ul>
            <li>✓ Microsuction Ear Wax removal</li>
            <li>✓ Ear Health check</li>
            <li>
              ✓ Patient referral report <span className="new">NEW</span>
            </li>
            <li>✓ Consultation with our experienced team</li>
          </ul>
        </div>
      </div>

      <div className="pricing-card highlighted">
        <div className="badge">MOST POPULAR</div>
        <h2 className="plan-title">Clinic Visit – Both Ears</h2>
        <p className="plan-subtitle">
          Visit your local clinic
        </p>
        <p className="plan-price">
         £65 <span className="sub">2 Ears</span>
        </p>
        <Link to="/booking">
          <button className="plan-button">Book Now</button>
        </Link>
        <div className="features">
          <h4>Features</h4>
          <ul>
            <li>✓ Microsuction Ear Wax removal</li>
            <li>✓ Ear Health check</li>
            <li>✓ Consultation with our experienced team</li>
            <li>
              ✓ Patient referral report <span className="new">NEW</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="pricing-card">
        <h2 className="plan-title">Home Visit</h2>
        <p className="plan-subtitle">
          Available within the North West
        </p>
        <p className="plan-price">£85</p>
        <Link to="/booking">
          <button className="plan-button">Book Now</button>
        </Link>
        <div className="features">
          <h4>Features</h4>
          <ul>
            <li>✓ Microsuction Ear Wax removal</li>
            <li>✓ Ear Health check</li>
            <li>
              ✓ Patient referral report <span className="new">NEW</span>
            </li>
            <li>✓ Consultation with our experienced team </li>
            <li>✓ Within the comfort of your own home!</li>
          </ul>
        </div>
      </div>
    </div>

 {/* Right Image 

<div className="locksmith-hero">
  <div className="locksmith-left">
    <p className="locksmith-subtitle">We’d love to hear from you</p>
    <h1 className="locksmith-title">
      Have questions or ready to book? <br/>Clear ears start with a call
    </h1>
        <button className="locksmith-btn">Call us 123-456-7890</button>
  </div>
  <div className="locksmith-right">
    <img
      src="dog.jpg"
      alt="Locksmith Tools"
    />
  </div>
</div>

*/}








</div>

  );
}

export default Home;

