import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import "./App.css";

import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Footer from "./Footer";
import Contact from "./pages/Contact";
import MultiStepForm from "./pages/MultiStepForm";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <div className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<MultiStepForm />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
