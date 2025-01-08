import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AboutUs from './pages/AboutUs';
import Coaching from './pages/Coaching';
import { WhenLoggedIn, WhenNotLoggedIn, WithLogin } from './LoginContext';

function App() {
  return (
    <BrowserRouter>
      <WithLogin>
        <Routes>
          {/* Routes for users who are not logged in */}
          <Route
            path="./pages/AboutUs"
            element={
              <WhenNotLoggedIn>
                <AboutUs />
              </WhenNotLoggedIn>
            }
          />
          <Route
            path="./pages/Coaching"
            element={
              <WhenNotLoggedIn>
                <LoginPage />
              </WhenNotLoggedIn>
            }
          />

          {/* Routes for logged-in users */}
          <Route
            path="./pages/Coaching"
            element={
              <WhenLoggedIn>
                <Coaching />
              </WhenLoggedIn>
            }
          />
          <Route
            path="/login"
            element={
              <WhenLoggedIn>
                <Navigate to="/" />
              </WhenLoggedIn>
            }
          />

          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </WithLogin>
    </BrowserRouter>
  );
}

export default App;
