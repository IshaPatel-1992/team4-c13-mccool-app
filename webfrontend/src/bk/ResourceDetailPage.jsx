import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaBookmark } from 'react-icons/fa';
import "./ResourceDetailPage.css";
import DOMPurify from 'dompurify';

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

  const { title = "", description = "", contentType = "", contentURL = "", content = "", author = "", publishedDt = "", thumbnail = "" } = resource || {};

  const getYouTubeVideoId = (url) => {
    const match = url.match(/(?:https?:\/\/(?:www\.)?)?(?:youtube\.com\/.*[?&]v=([^&]+)|youtu\.be\/([^&?\/]+))/);
    return match && (match[1] || match[2]) || null;
  };

  const getVimeoVideoId = (url) => {
    const match = url.match(/(?:https?:\/\/(?:www\.)?)?vimeo\.com\/(\d+)/);
    return match && match[1] || null;
  };

  const renderContent = () => {
    return (
      <div className="resource-container">
        { /* <h1>{title}</h1> 
        <p><strong>Published Date:</strong> {formatPublishedDate(publishedDt)}</p> */ }
  
        {content && (
          <>
            { /* <h2>Content</h2> */ }
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
          </>
        )}
  
        {!content && !contentURL && (
          <p>No content available.</p>
        )}
  
        {contentURL && contentURL.length > 0 && (
          <>
            { /* <h2>Content URL</h2> */ }
            {Array.isArray(contentURL) ? (
              contentURL.map((url, index) => renderMediaContent(url, index))
            ) : (
              renderMediaContent(contentURL)
            )}
          </>
        )}
  
        {contentType && contentType === "book" }
        {contentType && contentType === "podcast" }
        {contentType && contentType === "blog" }
      </div>
    );
  };
  
  const renderMediaContent = (url, index) => {
    if (url.includes("youtube")) {
      const videoId = getYouTubeVideoId(url);
      if (videoId) {
        return (
          <div className="video-container" key={index}>
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${videoId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded YouTube video"
            />
          </div>
        );
      }
    } else if (url.includes("vimeo")) {
      const videoId = getVimeoVideoId(url);
      if (videoId) {
        return (
          <div className="video-container" key={index}>
            <iframe
              width="100%"
              height="315"
              src={`https://player.vimeo.com/video/${videoId}`}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Embedded Vimeo video"
            />
          </div>
        );
      }
    }

    return (
      <p key={index}>
        <a href={url} target="_blank" rel="noopener noreferrer">
          Read More
        </a>
      </p>
    );
  };

  const formatPublishedDate = (date) => {
    return date ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Date not available';
  };

  return (
    <div className="resource-detail-page">
      <div className="resource-card">
        <h1>{title}</h1>
        <p style={{ textAlign: 'right' }}>{formatPublishedDate(publishedDt)}</p>
        {thumbnail && <img src={thumbnail} alt={title} className="resource-thumbnail" />}
        <div className="content">{renderContent()}</div>
        <div className="navigation">
          <button className="action-btn"><FaBookmark /> Bookmark</button>
        </div>
      </div>
    </div>
  );
};

export default ResourceDetailPage;
