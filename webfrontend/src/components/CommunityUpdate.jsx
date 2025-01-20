import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar"; // Material UI Avatar component
import "./CommunityUpdate.css";

const CommunityUpdate = () => {
  const updates = [
    {
      id: 1,
      name: "Stanley",
      time: "2h ago",
      location: "Calgary",
      avatar: "../assets/Stanley.jpg", // Replace with actual image URL
      content: "Team Success",
    },
    {
      id: 2,
      name: "Chineyere",
      time: "1h ago",
      location: "Toronto",
      avatar: "../assets/Chineyere.jpg", // Replace with actual image URL
      content: "Project Milestone Achieved",
    },
    {
      id: 3,
      name: "Melaine",
      time: "3h ago",
      location: "USA",
      avatar: "../assets/Melaine.jpg", // Replace with actual image URL
      content: "Community Collaboration",
    },
    {
      id: 4,
      name: "Mark",
      time: "3h ago",
      location: "Vancouver",
      avatar: "../assets/Mark.jpg", // Replace with actual image URL
      content: "Team Motivation",
    },
    {
      id: 5,
      name: "Rachel",
      time: "5h ago",
      location: "Montreal",
      avatar: "../assets/Rachel.jpg", // Replace with actual image URL
      content: "Leadership Meeting",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % updates.length);
    }, 3000); // Change the set of cards every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [updates.length]);

  // Get the three cards to display at the current index
  const visibleUpdates = updates.slice(
    currentIndex,
    currentIndex + 3
  ).concat(
    updates.slice(0, Math.max(0, (currentIndex + 3) - updates.length))
  );

  return (
    <div className="community-update">
      <h3>Community Updates</h3>
      <div className="update-cards-container">
        {visibleUpdates.map((update) => (
          <div key={update.id} className="update-card">
            <div className="update-header">
              <div className="user-info">
                <Avatar
                  alt={update.name}
                  src={update.avatar}
                  className="user-avatar"
                />
                <div>
                  <p className="user-name">{update.name}</p>
                  <p className="update-meta">
                    {update.time} · {update.location}
                  </p>
                </div>
              </div>
              <div className="update-options">...</div>
            </div>
            <div className="update-content">
              <div className="update-image">
                <p>{update.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityUpdate;
