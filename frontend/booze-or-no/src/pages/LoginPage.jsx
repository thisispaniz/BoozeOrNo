// loginpage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import '../App.css';
import Footer from "../components/Footer";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("Please enter both email and password.");
      return;
    }

    setIsLoading(true);
    setMessage(""); // Clear previous messages

    try {
      const res = await fetch('/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // Check if response has content before parsing JSON
      const contentType = res.headers.get("content-type");
      
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned non-JSON response. Service may be unavailable.");
      }

      const text = await res.text();
      
      if (!text.trim()) {
        throw new Error("Server returned empty response. Service may be unavailable.");
      }

      const data = JSON.parse(text);

      if (!res.ok) {
        // Handle different HTTP status codes
        if (res.status === 503) {
          throw new Error("Service temporarily unavailable. Please try again in a few moments.");
        } else if (res.status === 401) {
          throw new Error("Invalid email or password.");
        } else if (res.status === 429) {
          throw new Error("Too many login attempts. Please try again later.");
        } else {
          throw new Error(data.detail || data.message || `Login failed (${res.status})`);
        }
      }

      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("email", email);
        setMessage("✅ Login successful! Redirecting...");
        
        // Add small delay to show success message
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        throw new Error("No access token received from server.");
      }

    } catch (err) {
      console.error("Login error:", err);
      
      // Handle network errors
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        setMessage("❌ Unable to connect to server. Please check your connection.");
      } else {
        setMessage(`❌ ${err.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleLogin();
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="title">LOGIN TO YOUR ACCOUNT</h1>
        <div className="form">
          <input
            className="signup-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          <input
            className="signup-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          <button 
            className="register-btn" 
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? "LOGGING IN..." : "LOGIN"}
          </button>
          {message && <p className="feedback-msg">{message}</p>}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginForm;
