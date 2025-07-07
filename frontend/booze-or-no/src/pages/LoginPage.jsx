import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';
import Footer from "../components/Footer";

const LoginForm = ({ onLogin }) => {  // ✅ Accept the onLogin prop
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("Please enter both email and password.");
      return;
    }

    try {
      const res = await fetch('/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Login failed");
      }

      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("email", email);
        onLogin(); // ✅ Trigger login state update in App.jsx
      }

      setMessage("✅ Login successful! You are now logged in.");
      navigate("/dashboard");
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin(e);
    }
  };

  return (
    <>
      <div className="container" onKeyDown={handleKeyDown}>
        <h1 className="title">LOGIN TO YOUR ACCOUNT</h1>
        <div className="form">
          <input
            className="signup-input"
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="signup-input"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="register-btn" onClick={handleLogin} >LOGIN</button>
          {message && <p className="feedback-msg">{message}</p>}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginForm;
