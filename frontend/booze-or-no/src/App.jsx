import { useState, useEffect } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import DisclaimerSection from './components/DisclaimerSection';
import FeaturesSection from './components/FeaturesSection';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import NavBar from './components/NavBar';
import NavBarLoggedIn from './components/NavBar-LoggedIn';
import TagLine from './components/TagLine';
import AlcoholPlannerPage from './pages/AlcoholPlannerPage';
import Dashboard from './pages/Dashboard';
import EmailConfirmation from './pages/EmailConfirmation';
import InteractionChecker from './pages/InteractionChecker';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AboutUs from './pages/AboutUs';
import Conditions from './pages/Conditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import ContactUs from './pages/ContactUs';
import ProfileSection from './components/ProfileSection'

function LandingPage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <TagLine />
      <DisclaimerSection />
      <Footer />
    </>
  );
}

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = Boolean(localStorage.getItem("token"));
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem("token")));

  // Robust login handler that forces a re-check of localStorage
  const handleLogin = () => {
    // Force a re-check of localStorage
    const tokenExists = Boolean(localStorage.getItem("token"));
    console.log("Login handler called, token exists:", tokenExists); // Debug log
    setIsLoggedIn(tokenExists);
  };

  // Robust logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  // Sync login state if token changes in another tab
  useEffect(() => {
    const handleStorage = () => {
      const tokenExists = Boolean(localStorage.getItem("token"));
      console.log("Storage event detected, token exists:", tokenExists); // Debug log
      setIsLoggedIn(tokenExists);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Additional safety check: periodically verify login state matches localStorage
  useEffect(() => {
    const checkLoginStatus = () => {
      const currentLoginState = Boolean(localStorage.getItem("token"));
      if (currentLoginState !== isLoggedIn) {
        console.log("Login state mismatch detected, correcting:", { currentLoginState, isLoggedIn }); // Debug log
        setIsLoggedIn(currentLoginState);
      }
    };

    // Check every 2 seconds (you can adjust this interval)
    const interval = setInterval(checkLoginStatus, 2000);

    return () => clearInterval(interval);
  }, [isLoggedIn]);

  return (
    <Router>
      {/* Switch NavBar based on login state */}
      {isLoggedIn ? ( 
        <NavBarLoggedIn onLogout={handleLogout} /> 
      ) : ( 
        <NavBar /> 
      )}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignupPage onLogin={handleLogin} />} />
        <Route path="/planner" element={<AlcoholPlannerPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/emailconfirmed" element={<EmailConfirmation />} />
        <Route path="/medicationxalcohol" element={<InteractionChecker />} />
        <Route path='/conditionxalcohol' element={<Conditions />} />
        <Route path='/privacypolicy' element={<PrivacyPolicy />} />
        <Route path='/termsofservice' element={<TermsOfService />} />
        <Route path='/contactus' element={<ContactUs />} />
      </Routes>
    </Router>
  );
}

export default App;
