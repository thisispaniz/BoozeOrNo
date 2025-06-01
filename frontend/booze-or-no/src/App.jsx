import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import DisclaimerSection from './components/DisclaimerSection';
import SignupPage from './pages/SignupPage';
import AlcoholPlannerPage from './pages/AlcoholPlannerPage';

function LandingPage() {
  return (
   <>
    <NavBar />
    <HeroSection />
    <FeaturesSection />
    <DisclaimerSection />
   </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/planner" element={<AlcoholPlannerPage />} />
      </Routes>
    </Router>
  )
}

export default App;