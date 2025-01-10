import React from 'react';
import Navbar from '../components/NavBar';
import QuickSearchBar from '../pages/QuickSearchBar'
import Container1 from './Container1';
import AboutUs from './AboutUs';

const App = () => {
  return (
    <div>
      <Navbar />
      <Container1 />
      <QuickSearchBar />               
  </div>
  );
};

export default App;
