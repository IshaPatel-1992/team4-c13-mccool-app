import React, { useState, useEffect } from "react";
import "./ResourceDetailPage.css";

// Mock data for a resource (replace with dynamic data)
const mockResource = {
  title: "Sample Resource Title",
  description: "This is a detailed description of the resource.",
  content: {
    read: "This is the full text content of the resource. You can read this here.",
    video: "https://www.w3schools.com/html/mov_bbb.mp4", // URL for a sample video
    download: "https://www.w3.org/WAI/WCAG21/quickref.zip", // Example download link
  },
};

const ResourceDetailPage = () => {
  const [resource, setResource] = useState(null);
  const [selectedOption, setSelectedOption] = useState("read");

  useEffect(() => {
    // Simulate fetching resource data (replace with real API call)
    setResource(mockResource);
  }, []);

  if (!resource) {
    return <div>Loading...</div>;
  }

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="resource-detail-page">
      <h1>{resource.title}</h1>
      <p>{resource.description}</p>

      <div className="options">
        <button onClick={() => handleOptionChange("read")}>Read</button>
        <button onClick={() => handleOptionChange("watch")}>Watch</button>
        <button onClick={() => handleOptionChange("download")}>Download</button>
      </div>

      <div className="content">
        {selectedOption === "read" && (
          <div>
            <h2>Read Content</h2>
            <p>{resource.content.read}</p>
          </div>
        )}

        {selectedOption === "watch" && (
          <div>
            <h2>Watch Video</h2>
            <video width="600" controls>
              <source src={resource.content.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        {selectedOption === "download" && (
          <div>
            <h2>Download Resource</h2>
            <a href={resource.content.download} download>
              Click here to download the resource
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceDetailPage;
