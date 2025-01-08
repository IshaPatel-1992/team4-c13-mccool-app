import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, ListItemIcon, TextField, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import SchoolIcon from '@mui/icons-material/School';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

import LoginBar from './LoginBar';
import Logo from './Logo';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // State for toggling search input visibility
  const [searchQuery, setSearchQuery] = useState(''); // State for the search query

  const navigate = useNavigate();

  const toggleDrawer = (open) => {
    setIsDrawerOpen(open);
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleMenuItemClick = (link) => {
    navigate(link);
    setIsDrawerOpen(false); // Close the drawer after navigation
  };

  const menuItems = [
    { text: 'Homepage', icon: <HomeIcon style={{ fontSize: 30 }} />, link: '../pages/HomePage' },
    { text: 'About Us', icon: <InfoIcon style={{ fontSize: 30 }} />, link: '../pages/AboutUs' },
    { text: 'VIP Call', icon: <PhoneInTalkIcon style={{ fontSize: 30 }} />, link: '/VIPCall' },
    { text: 'Coaching', icon: <SchoolIcon style={{ fontSize: 30 }} />, link: '/Coaching' },
    { text: 'Community Feed', icon: <SupervisedUserCircleIcon style={{ fontSize: 30 }} />, link: '/Community' },
    { text: 'Contact Us', icon: <ContactMailIcon style={{ fontSize: 30 }} />, link: '/ContactUs' },
  ];

  return (
    <>
      {/* Navigation Bar */}
      <AppBar position="static" style={{ backgroundColor: '#ffffff' }}>
        <Toolbar>
          {/* Hamburger Menu */}
          <IconButton edge="start" color="black" aria-label="menu" onClick={() => toggleDrawer(true)}>
            <MenuIcon style={{ fontSize: 35 }} />
          </IconButton>

          {/* Logo */}
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            <Logo />
          </Typography>

          {/* Search Icon */}
          {!isSearchOpen && (
            <IconButton color="black" onClick={handleSearchToggle}>
              <SearchIcon style={{ fontSize: 35 }} />
            </IconButton>
          )}

          {/* Search Input */}
          {isSearchOpen && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                style={{ backgroundColor: '#f1f1f1', borderRadius: '4px' }}
              />
              <IconButton color="black" onClick={handleSearchToggle}>
                <CloseIcon style={{ fontSize: 25 }} />
              </IconButton>
            </div>
          )}

          {/* LoginBar */}
          <LoginBar />
        </Toolbar>
      </AppBar>

      {/* Side Drawer */}
      <Drawer anchor="left" open={isDrawerOpen} onClose={() => toggleDrawer(false)}>
        <div style={{ width: 250 }}> {/* Adjusted for better responsiveness */}
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
