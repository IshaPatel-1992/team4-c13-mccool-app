import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaThumbsUp, FaBookmark, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import "./ResourceDetailPage.css";

const API_BASE_URL2 = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

const ResourceDetailPage = () => {
  const { id } = useParams();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const validateIdFormat = (id) => {
    const idRegex = /^[0-9a-fA-F]{24}$/;
    return idRegex.test(id);
  };

  useEffect(() => {
    const fetchResource = async () => {
      if (!id) {
        setError("Resource ID is missing.");
        setLoading(false);
        return;
      }

      if (!validateIdFormat(id)) {
        setError("Invalid ID format.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");
      try {
        const response = await fetch(`${API_BASE_URL2}/api/resources/${id}`);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch resource: ${response.status} ${response.statusText}. ${errorText}`);
        }

        const data = await response.json();
        setResource(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResource();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!resource) {
    return <div>No resource found.</div>;
  }

  // Destructure resource safely with fallback values
  const { title, description, contentType, contentURL, content, author, publishedDt } = resource;
  console.log(contentURL);
  const renderContentByType = () => {
    // Handle the case when only contentURL is available
    if (contentURL) {
      if (contentType === 'video') {
        return (
          <div>
            <p>
              <a href={contentURL} target="_blank" rel="noopener noreferrer">
                Watch Video
              </a>
            </p>
          </div>
        );
      }
  
      return (
        <div>
          <p>
            <a href={contentURL} target="_blank" rel="noopener noreferrer">
              {contentType === 'podcast' ? 'Listen to Podcast' : 'Read Blog'}
            </a>
          </p>
        </div>
      );
    }
  
    // Handle the case when content is available but not contentURL
    if (!content) return <p>No content available.</p>;
  
    switch (contentType) {
      case 'article':
        return <p>{content.read || "No article content available."}</p>;
  
      case 'video':
        return (
          <div>
            {content.video && (
              <video width="100%" controls>
                <source src={content.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        );
  
      case 'book':
        return contentURL ? (
          <p>
            <a href={contentURL} target="_blank" rel="noopener noreferrer">
              Get the Book here
            </a>
          </p>
        ) : (
          <p>No book URL available.</p>
        );
  
      default:
        return <p>Content type not recognized.</p>;
    }
  };
  

  return (
    <div className="resource-detail-page">
      <div className="resource-card">
        <h1>{title}</h1>
        <p>{description}</p>
        <p><strong>Author:</strong> {author || 'Unknown Author'}</p>
        <p><strong>Published on:</strong> {publishedDt ? new Date(publishedDt).toLocaleDateString() : 'Date not available'}</p>

        {/* Render content based on contentType */}
        <div className="content">
          <p><strong>ContentType:</strong> {contentType.charAt(0).toUpperCase() + contentType.slice(1)}</p>
          { /* <h2>{contentType.charAt(0).toUpperCase() + contentType.slice(1)} Content</h2> */ }
          {renderContentByType()}
        </div>

        <div className="actions">
          <button className="action-btn"><FaThumbsUp /> Like</button>
          <button className="action-btn"><FaBookmark /> Bookmark</button>
        </div>

        <div className="navigation">
          <button className="nav-btn"><FaArrowLeft /> Previous</button>
          <button className="nav-btn">Next <FaArrowRight /></button>
        </div>
      </div>
    </div>
  );
};

export default ResourceDetailPage;
