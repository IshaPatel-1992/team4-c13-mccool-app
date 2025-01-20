import React from "react";
import "./AboutUs.css"; // Import the CSS file for card styling
import bannerImage from "../assets/banner.png"; // Imported Image

export default function AboutUs() {
  return (
    <div className="aboutus-container">
      {/* Card Section */}
      <div className="aboutus-card">
        <h2 className="aboutus-title">Tara McCool & Team</h2>
        <img src={bannerImage} alt="Banner Image" className="aboutus-image" />
        <p className="aboutus-description">
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
        <p className="aboutus-description">Broadcast journalism was my first career. From celebrities, to politicians, entrepreneurs and people dedicated to helping others, I truly loved interviewing leaders in their field. I wanted to dig deep into what made them successful and where their passion came from. As my career progressed in the western Canadian city of Calgary, I was presented with an opportunity to commute every week to Toronto, which is on the opposite side of the country, for a national show. It would certainly have taken my career to a new level, but at the time I had three small children and couldn’t imagine spending only two days per week with them. That’s when I decided to take a break from a career I loved.</p>
        <p className="aboutus-description">I transitioned into the corporate world and spent 10 years on a steep learning curve, which eventually positioned me in an executive role overseeing HR and Communications. I saw first-hand how leaders impact their employees’ lives, in both positive and negative ways. Looking back, I realized the influence my leaders had on me since the early days of my career, but it wasn’t until I was leading people myself that it hit home. I made mistakes as a leader and it was humbling to learn how my actions impacted others. That sparked my passion to help leaders understand the power and responsibility that comes with that title. </p>
        <p className="aboutus-description">I poured through books on leadership and left my corporate job to do what I love full-time, which is working with high performance leaders. I’d had years of experience coaching leaders through difficult employee and business situations and decided to pump up that education by taking a certification course on brain-based coaching from the NeuroLeadership Institute as well as other coaching courses. The connection between great leadership and compassion has become increasingly clear to me as I study the science of compassion and mindfulness. I believe there will be a compassion movement over the next 5 years, as leaders, shareholders and employees recognize the positive impacts compassion and kindness have on the culture of a company. It’s going to evolve how companies are run. </p>
        <p className="aboutus-description">I became a certified facilitator for the 5 Behaviours of a Cohesive team, based on Patrick Lencioni’s book “The 5 Dysfunctions of a Team,” which aligned very much with the models I found to be effective in the corporate world. I find Lencioni’s models on how to achieve organizational health to be deeply based in compassion. </p>
        <p className="aboutus-description">I also started to receive coaching myself, which was an eye-opener; I wasn’t lacking in ideas or the personal drive to succeed, but I typically kept it all to myself and worked quietly to get there. I realized that being challenged to think bigger or differently was missing – and the coaching evolved my perspectives. </p>
      </div>
    </div>
  );
}
