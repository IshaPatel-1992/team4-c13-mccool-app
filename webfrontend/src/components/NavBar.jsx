import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  TextField,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import SchoolIcon from "@mui/icons-material/School";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import TaskIcon  from "@mui/icons-material/Task";

import LoginBar from "./LoginBar";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navigate = useNavigate();

  const toggleDrawer = (open) => {
    setIsDrawerOpen(open);
  };

  const handleMenuItemClick = (link) => {
    navigate(link);
    setIsDrawerOpen(false); // Close the drawer after navigation
  };

  const menuItems = [
    {
      text: "Homepage",
      icon: <HomeIcon style={{ fontSize: 30 }} />,
      link: "/",
    },
    {
      text: "About Us",
      icon: <InfoIcon style={{ fontSize: 30 }} />,
      link: "AboutUs",
    },
    {
      text: "VIP Call",
      icon: <PhoneInTalkIcon style={{ fontSize: 30 }} />,
      link: "BookMeeting",
    },
    {
      text: "Coaching",
      icon: <SchoolIcon style={{ fontSize: 30 }} />,
      link: "Coaching",
    },
    {
      text: "Community Feed",
      icon: <SupervisedUserCircleIcon style={{ fontSize: 30 }} />,
      link: "Community",
    },
    {
      text: "Self Assessment", 
      icon: <TaskIcon   style={{ fontSize: 30 }} />, 
      link: "SelfAssessment", 
    },
    {
      text: "Resources", 
      icon: <MenuBookIcon style={{ fontSize: 30 }} />, 
      link: "Resources", 
    },
    {
      text: "AdminResources", 
      icon: <MenuBookIcon style={{ fontSize: 30 }} />, 
      link: "AdminResources", 
    },
    {
      text: "Contact Us",
      icon: <ContactMailIcon style={{ fontSize: 30 }} />,
      link: "ContactUs",
    },
  ];

  return (
    <>
      {/* Navigation Bar */}
      <AppBar position="static" style={{ backgroundColor: "#ffffff" }}>
        <Toolbar>
          {/* Hamburger Menu */}
          <IconButton
            edge="start"
            color="black"
            aria-label="menu"
            onClick={() => toggleDrawer(true)}
          >
            <MenuIcon style={{ fontSize: 35 }} />
          </IconButton>

          {/* Logo */}
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            <Logo />
          </Typography>
          {/* LoginBar */}
          <LoginBar />
        </Toolbar>
      </AppBar>

      {/* Side Drawer */}
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => toggleDrawer(false)}
      >
        <div style={{ width: 250 }}>
          {" "}
          {/* Adjusted for better responsiveness */}
          <List>
            {menuItems.map((item, index) => (
              <ListItem
                button
                key={index}
                onClick={() => handleMenuItemClick(item.link)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
