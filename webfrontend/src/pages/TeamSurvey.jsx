import React, { useState } from "react";
import Footer from "../components/Footer";

import "./Assessment.css";

export default function TeamSurvey() {
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
      <div className="teamsurvery-container">
        <h1>McCool Team Survey</h1>
        <div className="teamsurvery-introduction">
          <p>
            {/* Welcome to the McCool Leadership Assessment! This assessment is
            designed to be your first step toward unlocking your full potential
            as a leader. By taking a few moments to reflect on key areas of
            leadership, you’ll gain valuable insights into your strengths and
            opportunities for growth. Leadership is a journey, and understanding
            where you stand today is the foundation for becoming the
            compassionate, confident leader your team needs. Let’s get started! */}
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero
            illum, ea, nostrum est ratione veritatis aut ipsa deserunt cum
            aliquam soluta impedit quidem cumque tempore officia aperiam
            distinctio earum? Inventore?
          </p>
        </div>
        <button onClick={openModal} className="open-modal-button">
          Take the Survey
        </button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={closeModal} className="close-modal-button">
              Close
            </button>
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSdCH9O0FxkjZdcwDFfWHad3_U-gSoQXuaz9oFaIEjtcsvV6eg/viewform?embedded=true"
              width="100%"
              height="100%"
              frameBorder="0"
              title="Survey Form"
              style={{ display: "block" }}
            >
              Loading…
            </iframe>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
