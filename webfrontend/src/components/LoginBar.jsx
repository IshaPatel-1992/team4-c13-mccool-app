import { useContext, useState } from "react";
import { Avatar, IconButton, Badge } from "@mui/material"; // Material-UI Avatar
import "./LoginBar.css";
import LoginContext, { WhenNotLoggedIn } from "../LoginContext";
import { useNavigate } from "react-router";
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';

export default function LoginBar() {
  const { user, logout } = useContext(LoginContext);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const [notificationCount, setNotificationCount] = useState(5);


  function togglePopup() {
    setMenuOpen(!menuOpen);
  }

  return (
    <>
      {user && (
        <div className="user-profile-container" onClick={togglePopup}>
          {/* User Avatar */}
          <Avatar
            alt={user.name}
            src={user.profileImage || ""}
            style={{
              backgroundColor: "#1976d2", // Fallback color if no image
              cursor: "pointer",
            }}
          >
            {/* Fallback: Show user initials if no image */}
            {user.name ? user.name.charAt(0).toUpperCase() : ""}
          </Avatar>
          {/* Dropdown Menu */}
          {menuOpen && (
            <div className="login-bar-popup">
              <p>Hello, {user.name}!</p>
              <button onClick={logout}>Logout</button>
            </div>
          )}
        </div>
      )}
      <WhenNotLoggedIn>
        <div
          className="login-prompt"
          onClick={() => navigate("/login")}
        >
          
          {/* Profile Icon with Notification Count */}
          <IconButton color="black" aria-label="profile">
          <Badge badgeContent={notificationCount} color="error">
            <PersonIcon style={{ fontSize: 35 }}/>
            </Badge>
          </IconButton>                    
        </div>
      </WhenNotLoggedIn>
    </>
  );
}
