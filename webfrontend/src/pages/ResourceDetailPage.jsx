import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaBookmark } from 'react-icons/fa';
import "./ResourceDetailPage.css";
import DOMPurify from 'dompurify';

const API_BASE_URL2 = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";
console.log("API_BASE_URL2:", API_BASE_URL2);

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
        console.log("Response:", response);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch resource: ${response.status} ${response.statusText}. ${errorText}`);
        }

        const data = await response.json();
        console.log("Data:", data);
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
  const { title, description, contentType, contentURL, content, author, publishedDt, thumbnail } = resource;
  console.log("Resource:", resource);

  // Helper functions to extract video ID from YouTube/Vimeo URLs
  const getYouTubeVideoId = (url) => {
    const match = url.match(/(?:https?:\/\/(?:www\.)?)?(?:youtube\.com\/(?:[^/]+\/\S+\/|(?:v|e(?:mbed)?)\/)([^&?\/]+)|youtu\.be\/([^&?\/]+))/);
    return match && (match[1] || match[2]);
  };

  const getVimeoVideoId = (url) => {
    const match = url.match(/(?:https?:\/\/(?:www\.)?)?vimeo\.com\/(\d+)/);
    return match && match[1];
  };

  const renderContent = () => {
    if (content) {
      return <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />;
    }

    if (contentURL && contentURL.length > 0) {
      const url = contentURL[0]; // Only use the first URL in the array
      console.log("Content URL:", url);

      // Handle video content URLs (YouTube or Vimeo)
      if (url.includes("youtube")) {
        const videoId = getYouTubeVideoId(url);
        console.log("YouTube Video ID:", videoId);
        if (videoId) {
          return (
            <div className="video-container">
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
            <div className="video-container">
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
      } else if (url.includes("spotify") || url.includes("soundcloud")) {
        return (
          <div className="audio-container">
            <iframe
              width="100%"
              height="100"
              src={url}
              frameBorder="0"
              allow="autoplay"
              allowFullScreen
              title="Podcast"
            />
          </div>
        );
      }

      // For other content types (like book, podcast), render a clickable link
      return (
        <p>
          <a href={url} target="_blank" rel="noopener noreferrer">
            View Content
          </a>
        </p>
      );
    }

    if (thumbnail) {
      return <img src={thumbnail} alt="Resource Thumbnail" className="resource-thumbnail" />;
    }

    return <p>No content available.</p>;
  };

  const formatPublishedDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString('en-US', options);
    return formattedDate;
  };

  return (
    <div className="resource-detail-page">
      <div className="resource-card">
        <h1>{title}</h1>
        <p style={{ textAlign: 'right' }}>{publishedDt ? formatPublishedDate(publishedDt) : 'Date not available'}</p>

        {/* Thumbnail Image */}
        {thumbnail && <img src={thumbnail} alt={title} className="resource-thumbnail" />}

        {/* Content */}
        <div className="content">
          {renderContent()}
        </div>

        {/* Bookmark Action */}
        <div className="navigation">
          <button className="action-btn"><FaBookmark /> Bookmark</button>
        </div>
      </div>
    </div>
  );
};

export default ResourceDetailPage;
