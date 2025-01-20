
// Importing Required Libraries
import React from "react";
import "./HeroSection.css";
import bannerImage from "../assets/banner.png";

{/* Hero Section */}
const HeroSection = () => {
    return (
      <div className="hero-section">
        <img src={bannerImage} alt="Hero Banner" className="hero-image" />
        <div className="hero-content">
          <h1>Empowering Compassionate Leadership</h1>
          <p>Unlock your leadership potential with expert support and resources.</p>
        </div>
      </div>
    );
    }
export default HeroSection;