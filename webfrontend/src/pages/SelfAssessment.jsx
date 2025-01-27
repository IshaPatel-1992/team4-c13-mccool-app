import React, { useState } from "react";
import Footer from "../components/Footer";

import "./Assessment.css";

export default function SelfAssessment() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* <Header /> */}
      <div className="assessment-container">
        <h1>McCool Leadership Assessment</h1>
        <div className="assessment-introduction">
          <p>
            Welcome to the McCool Leadership Assessment! This assessment is
            designed to be your first step toward unlocking your full potential
            as a leader. By taking a few moments to reflect on key areas of
            leadership, you’ll gain valuable insights into your strengths and
            opportunities for growth. Leadership is a journey, and understanding
            where you stand today is the foundation for becoming the
            compassionate, confident leader your team needs. Let’s get started!
          </p>
        </div>
        <button onClick={openModal} className="open-modal-button">
          Take the Assessment
        </button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={closeModal} className="close-modal-button">
              Close
            </button>
            <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSet4ZL9jAGDxL-NI9SdbQ9iSHPDNYNsHyhT01BSX7OWX3G-Ow/viewform?embedded=true" width="640" height="1705" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
