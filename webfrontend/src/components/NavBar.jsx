import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, ListItemIcon, TextField, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import SchoolIcon from '@mui/icons-material/School';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

import LoginBar from "./LoginBar";
import Logo from "./Logo";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // State for toggling search input visibility
  const [searchQuery, setSearchQuery] = useState(''); // State for the search query

  const toggleDrawer = (open) => {
    setIsDrawerOpen(open);
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
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
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            <Logo />
          </Typography>
          
          {/* Search Icon Button */}
          <IconButton color="black" onClick={handleSearchToggle}>
            <SearchIcon />
          </IconButton>

          {/* Search Input Field (shown when search icon is clicked) */}
          {isSearchOpen && (
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              style={{ marginLeft: '10px', backgroundColor: '#f1f1f1', borderRadius: '4px' }}
            />
          )}
          <LoginBar />
        </Toolbar>
      </AppBar>

      {/* Side Drawer */}
      <Drawer anchor="left" open={isDrawerOpen} onClose={() => toggleDrawer(false)}>
        <div style={{ width: 500 }}>
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

export default Navbar;
