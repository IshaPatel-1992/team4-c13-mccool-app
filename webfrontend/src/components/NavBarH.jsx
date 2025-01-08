import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import SchoolIcon from '@mui/icons-material/School';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

import LoginBar from "./LoginBar";
import Logo from "./Logo";
import "./NavBarH.css"

const NavbarH = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => {
    setIsDrawerOpen(open);
  };

  const menuItems = [
    { text: 'Homepage', icon: <HomeIcon />, link: '/' },
    { text: 'About Us', icon: <InfoIcon />, link: '/about' },
    { text: 'VIP Call', icon: <PhoneInTalkIcon />, link: '/vip-call' },
    { text: 'Coaching', icon: <SchoolIcon />, link: '/Coaching' },
    { text: 'Community Feed', icon: <SupervisedUserCircleIcon />, link: '/community' },
    { text: 'Contact Us', icon: <ContactMailIcon />, link: '/contact' },
  ];

  return (
    <>
      {/* Navigation Bar */}
      <AppBar position="static" style={{ backgroundColor: '#ffffff' }}>
        <Toolbar>
          <IconButton edge="start" color="black" aria-label="menu" onClick={() => toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          
          <LoginBar />
        </Toolbar>
      </AppBar>

      {/* Horizontal Menu for larger screens */}
      <div className="header-nav">
        {menuItems.map((item, index) => (
          <a key={index} href={item.link}>
            <IconButton>{item.icon}</IconButton>
            {item.text}
          </a>
        ))}
      </div>
      {/* Side Drawer for mobile screens */}
      <Drawer anchor="left" open={isDrawerOpen} onClose={() => toggleDrawer(false)}>
        <div style={{ width: 250 }}>
          <List>
            {menuItems.map((item, index) => (
              <ListItem button key={index} onClick={() => console.log(`Navigating to ${item.link}`)}>
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

export default NavbarH;
