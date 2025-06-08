import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import DisclaimerSection from './components/DisclaimerSection';
import TagLine from './components/TagLine';
import SignupPage from './pages/SignupPage';
import AlcoholPlannerPage from './pages/AlcoholPlannerPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import EmailConfirmation from './pages/EmailConfirmation';
import Footer from './components/Footer';

function LandingPage() {
  return (
   <>
    <NavBar />
    <HeroSection />
    <FeaturesSection />
    <TagLine />
    <DisclaimerSection />
    <Footer />
   </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/planner" element={<AlcoholPlannerPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/emailconfirmed" element={<EmailConfirmation/>} />
      </Routes>
    </Router>
  )
}

export default App;