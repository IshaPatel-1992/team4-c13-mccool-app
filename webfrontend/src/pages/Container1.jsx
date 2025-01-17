import React from "react";
import { Box, Typography } from "@mui/material";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium"; // Icon for Coaching
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks"; // Icon for Resources
import TrackChangesIcon from "@mui/icons-material/TrackChanges"; // Icon for Goals

const Container1 = () => {
  const handleClick = (action) => {
    alert(`Navigating to ${action}`);
    // Implement navigation logic here
  };

  const ctaItems = [
    { id: 1, title: "Coaching", icon: <WorkspacePremiumIcon style={{ fontSize: 50 }} /> },
    { id: 2, title: "Resources", icon: <LibraryBooksIcon style={{ fontSize: 50 }} /> },
    { id: 3, title: "Assessments", icon: <TrackChangesIcon style={{ fontSize: 50 }} /> },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 3,
        padding: 3,
        backgroundColor: "#1a2a43",
      }}
    >
      {ctaItems.map((item) => (
        <Box
          key={item.id}
          onClick={() => handleClick(item.title)}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: 150,
            height: 150,
            backgroundColor: "#3a6ea5",
            borderRadius: 2,
            boxShadow: 2,
            cursor: "pointer",
            transition: "transform 0.2s, box-shadow 0.2s",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: 4,
            },
          }}
        >
          <Box
            sx={{
              fontSize: 50,
              color: "#fff",
              marginBottom: 1,
            }}
          >
            {item.icon}
          </Box>
          <Typography
            sx={{
              fontSize: 16,
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            {item.title}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Container1;
