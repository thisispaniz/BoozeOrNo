import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import DisclaimerSection from './components/DisclaimerSection';
import SignupPage from './pages/SignupPage';

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
      </Routes>
    </Router>
  )
}

export default App;