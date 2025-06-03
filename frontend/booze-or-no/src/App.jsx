import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import DisclaimerSection from './components/DisclaimerSection';
import TagLine from './components/TagLine';
import SignupPage from './pages/SignupPage';
import AlcoholPlannerPage from './pages/AlcoholPlannerPage';
import LoginPage from './pages/LoginPage'

function LandingPage() {
  return (
   <>
    <NavBar />
    <HeroSection />
    <FeaturesSection />
    <TagLine />
    <DisclaimerSection />
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
      </Routes>
    </Router>
  )
}

export default App;