import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams from React Router
import "./ResourceDetailPage.css";

// Replace with your actual API endpoint to fetch resource details
const API_BASE_URL2 = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

const ResourceDetailPage = () => {
  const { id } = useParams(); // Get the id from the URL parameters
  const [resource, setResource] = useState(null);
  const [selectedOption, setSelectedOption] = useState("read");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResource = async () => {
      if (!id) {
        setError("Resource ID is missing.");
        return;
      }
      setLoading(true);
      setError("");
      try {    
        console.log("fetching resource with id:", id);
        const response = await fetch(`${API_BASE_URL2}/api/resources/${id}`);
        console.log("response", response);

        if (!response.ok) {
          throw new Error(`Failed to fetch resource: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setResource(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching resource:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResource();
  }, [id]); // Dependency array ensures the fetch runs when the id changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!resource) {
    return <div>No resource found.</div>;
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
