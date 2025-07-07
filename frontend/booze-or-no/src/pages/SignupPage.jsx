import React, { useState } from "react";
import '../App.css';
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";

const SignupForm = ({ onLogin }) => {
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const passwordRequirements = [
    { label: "At least 8 characters", test: (pw) => pw.length >= 8 },
    { label: "One uppercase letter", test: (pw) => /[A-Z]/.test(pw) },
    { label: "One lowercase letter", test: (pw) => /[a-z]/.test(pw) },
    { label: "One number", test: (pw) => /\d/.test(pw) },
    { label: "One special character", test: (pw) => /[!@#$%^&*]/.test(pw) },
  ];

  const handleSignup = async () => {
    setMessage("");

    if (!email || !password) {
      setMessage("❌ Email and password are required.");
      return;
    }

    try {
      const res = await fetch('/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Signup failed:", data);
        if (Array.isArray(data.detail)) {
          const messages = data.detail.map(d => d.msg).join(" | ");
          setMessage("❌ " + messages);
        } else {
          setMessage("❌ " + (data.error || "Signup failed."));
        }
        return;
      }

      // ✅ If signup also logs in the user and returns token:
      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("email", email);
        if (onLogin) onLogin(); // Notify App to switch navbar
        setMessage("✅ Signup successful!");
        navigate("/dashboard"); // Optional: navigate immediately
      } else {
        setMessage("✅ Signup successful! Please check your email to confirm.");
      }

    } catch (err) {
      console.error("Network or server error:", err);
      setMessage("❌ Network error. Try again.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSignup(e);
    }
  };

  return (
    <>
      <div className="container" onKeyDown={handleKeyDown}>
        <h1 className="title">CREATE AN ACCOUNT</h1>
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
            onFocus={() => setShowPasswordRules(true)}
            onBlur={() => setShowPasswordRules(false)}
            onChange={(e) => setPassword(e.target.value)}
          />
          {showPasswordRules && (
            <div className="password-rules">
              <ul>
                {passwordRequirements.map((rule, idx) => (
                  <li
                    key={idx}
                    className={rule.test(password) ? "valid" : "invalid"}
                  >
                    {rule.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p>By clicking on register, you are accepting BoozeOrNo's <a className="login-signup" href="/termsofservice">Terms of Service</a>.</p>
          <button className="register-btn" onClick={handleSignup}>
            REGISTER
          </button>
          {message && <p className="feedback-message">{message}</p>}
          <p>
            Have an account already?{" "}
            <Link to="/login" className="login-signup">Login</Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignupForm;
