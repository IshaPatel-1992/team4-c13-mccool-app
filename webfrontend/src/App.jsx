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
} from "react-router-dom";
import Resources from "./pages/Resources";
import UserProfile from "./pages/UserProfile";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AboutUs from "./pages/AboutUs";
import Coaching from "./pages/Coaching";
import ContactUs from "./pages/ContactUs";
import ResourceDetailPage from "./pages/ResourceDetailPage";

function App() {
  return (
    <BrowserRouter>
      <WithLogin>
        {/* You can place logic for logged in and not logged in here */}
        <Routes>
          {/* Route definitions */}
          <Route path="/" element={<Layout />}>
            {/* Define the pages that should be rendered inside the layout */}
            <Route index element={<HomePage />} />
            <Route path="Signup" element={<Signup />} />
            <Route path="Login" element={<Login />} />
            <Route path="Resources" element={<Resources />} />
            <Route path="UserProfile" element={<UserProfile />} />
            <Route path="AboutUs" element={<AboutUs />} />
            <Route path="Coaching" element={<Coaching />} />
            <Route path="ContactUs" element={<ContactUs />} />
            <Route path="/resources/:id" element={<ResourceDetailPage />} />
            
            {/* Default route for undefined paths */}
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </WithLogin>
    </BrowserRouter>
  );
}

export default App;
