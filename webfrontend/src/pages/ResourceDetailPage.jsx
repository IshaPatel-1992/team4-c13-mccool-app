import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import "./ResourceDetailPage.css";

const API_BASE_URL2 = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

const ResourceDetailPage = () => {
  const { id } = useParams(); 
  const [resource, setResource] = useState(null);
  const [selectedOption, setSelectedOption] = useState("read");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Validate the ID format
  const validateIdFormat = (id) => {
    const idRegex = /^[0-9a-fA-F]{24}$/; // Example: check if ID is a 24-character hex string (MongoDB ObjectId)
    return idRegex.test(id);
  };

  useEffect(() => {
    const fetchResource = async () => {
      if (!id) {
        setError("Resource ID is missing.");
        setLoading(false);
        return;
      }

      // Validate ID format before fetching
      if (!validateIdFormat(id)) {
        setError("Invalid ID format.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");
      try {    
        //console.log("Fetching resource with id:", id);
        const response = await fetch(`${API_BASE_URL2}/api/resources/${id}`);
        //console.log("Response:", response);
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch resource: ${response.status} ${response.statusText}. ${errorText}`);
        }

        const data = await response.json();
        console.log("Fetched resource data:", data);
        setResource(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching resource:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResource();
  }, [id]); 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!resource) {
    return <div>No resource found.</div>;
  }

  // Ensure `content` is defined
  const { content = {} } = resource; // Default to an empty object if `content` is undefined

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
            <p>{content.read || "No content available for reading."}</p>
          </div>
        )}

        {selectedOption === "watch" && (
          <div>
            <h2>Watch Video</h2>
            {content.video ? (
              <video width="600" controls>
                <source src={content.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <p>No video available.</p>
            )}
          </div>
        )}

        {selectedOption === "download" && (
          <div>
            <h2>Download Resource</h2>
            {content.download ? (
              <a href={content.download} download>
                Click here to download the resource
              </a>
            ) : (
              <p>No downloadable content available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceDetailPage;
