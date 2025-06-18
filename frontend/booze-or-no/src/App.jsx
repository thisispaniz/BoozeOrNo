import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import DisclaimerSection from './components/DisclaimerSection';
import FeaturesSection from './components/FeaturesSection';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import NavBar from './components/NavBar';
import TagLine from './components/TagLine';
import AlcoholPlannerPage from './pages/AlcoholPlannerPage';
import Dashboard from './pages/Dashboard';
import EmailConfirmation from './pages/EmailConfirmation';
import Footer from './components/Footer';
import InteractionChecker from './pages/InteractionChecker';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';



function LandingPage() {
  return (
    <div className='page-container'>
      <NavBar />
      <HeroSection />
      <FeaturesSection />
      <TagLine />
      <DisclaimerSection />
      <Footer />
    </div>
  );
}

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = Boolean(localStorage.getItem("token")); // adjust based on your auth logic

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/planner" element={<AlcoholPlannerPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/emailconfirmed" element={<EmailConfirmation />} />
        <Route path="/medicationxalcohol" element={<InteractionChecker />} />
      </Routes>
    </Router>
  )
}

export default App;
