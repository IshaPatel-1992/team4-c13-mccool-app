import { useState } from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import Layout from './components/Layout';
import { WhenLoggedIn, WhenNotLoggedIn, WithLogin } from "./LoginContext";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  Link,
  NavLink,
} from "react-router-dom";
import Resources from "./pages/Resources";
import UserProfile from "./pages/UserProfile";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import BookMeeting from "./pages/BookMeeting";
import AboutUs from "./pages/AboutUs";
import Coaching from "./pages/Coaching";

function App() {
  return (
    <BrowserRouter>
      <WithLogin>
        <WhenNotLoggedIn>
          <Routes></Routes>
        </WhenNotLoggedIn>
        <WhenLoggedIn>
          <Routes></Routes>
        </WhenLoggedIn>
        <Routes>
        <Route path="/" element={<Layout />}>
        {/* Define the pages that should be rendered inside the layout */}
          <Route index element={<HomePage />} />
          <Route path="Signup" element={<Signup />} />
          <Route path="Login" element={<Login />} />
          <Route path="BookMeeting" element={<BookMeeting />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="Resources" element={<Resources />} />
          <Route path="UserProfile" element={<UserProfile />} />
          <Route path="AboutUs" element={<AboutUs />} />
          <Route path="Coaching" element={<Coaching />} />
          </Route>  
          </Routes> 
      </WithLogin>
    </BrowserRouter>
  );
}

export default App;
