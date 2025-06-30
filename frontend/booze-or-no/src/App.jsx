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

  // Sync login state if token changes in another tab
  useEffect(() => {
    const handleStorage = () => {
      setIsLoggedIn(Boolean(localStorage.getItem("token")));
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <Router>
      {/* Switch NavBar based on login state */}
      {isLoggedIn ? ( <NavBarLoggedIn onLogout={() => setIsLoggedIn(false)} /> ) : ( <NavBar /> )}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/signup" element={<SignupPage onLogin={() => setIsLoggedIn(true)} />} />
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
