import React, { useState } from "react";
import '../App.css';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

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

      setMessage("✅ Login successful! You are now logged in.");
      // Future: redirect to dashboard
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
  };

  return (
    <>
      <NavBar />
      <div className="container">
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
          <button className="register-btn" onClick={handleLogin}>LOGIN</button>
          {message && <p className="feedback-msg">{message}</p>}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginForm;
