import React from "react";
import "./AboutUs.css";
import bannerImage from "../assets/BannerImgAboutUs.png"; // Imported Image

export default function AboutUs() {
  return (
    <div className="aboutus-container">    

      {/* Content Section */}
      <div className="content">
        <h2>Tara McCool & Team</h2>
        <p>
          My entire 27-year career has been about having the compassion to show
          people their own power. From nervous guests on my live TV show, or
          colleagues who wanted more in their lives, to CEOs confronted with
          challenging business situations, I have been there for them. They
          were in different scenarios, but they all needed the same thing -
          someone to listen, ask powerful questions, and ignite a fire they
          didn’t know existed. I provide tactical guidance on how leaders can
          evolve the cultures in their companies, and their personal leadership
          styles play a big part in that.
        </p>
      </div>
    </div>
  );
}
