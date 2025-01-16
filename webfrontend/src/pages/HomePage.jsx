import React from 'react';
import Navbar from '../components/NavBar';
import QuickSearchBar from '../pages/QuickSearchBar'
import Container1 from './Container1';
import CommunityUpdate from './CommunityUpdate';

const App = () => {
  return (
    <div>
      <Container1 />
      <QuickSearchBar />   
      <CommunityUpdate />           
  </div>
  );
};

export default App;
