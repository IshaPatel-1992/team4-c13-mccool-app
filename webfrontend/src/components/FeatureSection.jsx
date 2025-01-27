import React from "react";
import "./UnifiedStyles.css";
import { FaPhoneAlt, FaCalendarAlt, FaBook, FaChartBar } from "react-icons/fa";
import { Link } from "react-router-dom";

const FeatureSection = () => {
  return (
    <div className="main-container">
      <div className="card-container">
        <Link to="/vip-call" className="card">
          <FaPhoneAlt className="card-icon" />
          <h4 className="card-title">VIP Call</h4>
          <p className="card-description">
            Get one-on-one personalized coaching from top industry leaders.
          </p>
        </Link>
        <Link to="/book-session" className="card">
          <FaCalendarAlt className="card-icon" />
          <h4 className="card-title">Book a Session</h4>
          <p className="card-description">
            Schedule your session to boost your leadership journey.
          </p>
        </Link>
        <Link to="/Resources" className="card">
          <FaBook className="card-icon" />
          <h4 className="card-title">Resources</h4>
          <p className="card-description">
            Access curated tools, articles, and videos to grow as a leader.
          </p>
        </Link>
        <Link to="/SelfAssessment" className="card">
          <FaChartBar className="card-icon" />
          <h4 className="card-title">Assessments</h4>
          <p className="card-description">
            Evaluate your leadership style with in-depth assessments.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default FeatureSection;
