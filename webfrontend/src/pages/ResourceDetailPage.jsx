import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Button, CircularProgress, Alert, Box } from "@mui/material";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import DOMPurify from "dompurify";

const API_BASE_URL2 = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

const ResourceDetailPage = () => {
  const { id } = useParams();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    fetchResource();
    checkIfBookmarked();
  }, [id]);

  const fetchResource = async () => {
    if (!id) {
      setError("Resource ID is missing.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL2}/api/resources/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch resource: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setResource(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Check if the resource is bookmarked
  const checkIfBookmarked = () => {
    const storedBookmarks = JSON.parse(localStorage.getItem("bookmarkedResources")) || [];
    setBookmarked(storedBookmarks.includes(id));
  };

  // Toggle Bookmark
  const handleBookmarkToggle = () => {
    const storedBookmarks = JSON.parse(localStorage.getItem("bookmarkedResources")) || [];

    if (bookmarked) {
      // Remove from bookmarks
      const updatedBookmarks = storedBookmarks.filter((item) => item !== id);
      localStorage.setItem("bookmarkedResources", JSON.stringify(updatedBookmarks));
    } else {
      // Add to bookmarks
      storedBookmarks.push(id);
      localStorage.setItem("bookmarkedResources", JSON.stringify(storedBookmarks));
    }

    setBookmarked(!bookmarked);
  };

  if (loading) return <CircularProgress sx={{ display: "block", margin: "auto", mt: 4 }} />;
  if (error) return <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>;
  if (!resource) return <Alert severity="info" sx={{ mt: 2 }}>No resource found.</Alert>;

  const { title, description, contentType, contentURL, content, author, publishedDt, thumbnail } = resource || {};

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Card sx={{ maxWidth: 800, width: "100%", p: 2, boxShadow: 3 }}>
        {thumbnail && <CardMedia component="img" height="250" image={thumbnail} alt={title} />}
        <CardContent>
          <Typography variant="h4" gutterBottom>{title}</Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>By {author || "Unknown"} | {new Date(publishedDt).toLocaleDateString()}</Typography>
          {content && <Typography variant="body1" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} sx={{ mt: 2 }} />}
          {contentURL && (
            <Typography variant="body2" sx={{ mt: 2 }}>
              <a href={contentURL} target="_blank" rel="noopener noreferrer">Read More</a>
            </Typography>
          )}
          <Button variant="contained" startIcon={bookmarked ? <FaBookmark /> : <FaRegBookmark />} onClick={handleBookmarkToggle} sx={{ mt: 3 }}>
            {bookmarked ? "Bookmarked" : "Bookmark"}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ResourceDetailPage;
