import React, { useState } from "react";
import '../App.css';
import NavBar from "../components/NavBar";
import TagLine from "../components/TagLine";

const SignupForm = () => {
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const passwordRequirements = [
    { label: "At least 8 characters", test: (pw) => pw.length >= 8 },
    { label: "One uppercase letter", test: (pw) => /[A-Z]/.test(pw) },
    { label: "One lowercase letter", test: (pw) => /[a-z]/.test(pw) },
    { label: "One number", test: (pw) => /\d/.test(pw) },
    { label: "One special character", test: (pw) => /[!@#$%^&*]/.test(pw) },
  ];

  const handleSignup = async () => {
    setMessage(""); // clear any previous message

    if (!email || !password) {
      setMessage("❌ Email and password are required.");
      return;
    }

    try {
      const res = await fetch('/register', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

      setMessage("✅ Signup successful! Please check your email to confirm.");
    } catch (err) {
      console.error("Network or server error:", err);
      setMessage("❌ Network error. Try again.");
    }
  };

  return (
    <>
      <NavBar />
      <div className="container">
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
          <button className="register-btn" onClick={handleSignup}>
            REGISTER
          </button>
          {message && <p className="feedback-message">{message}</p>}
          <p className="login-link">
            Have an account already? <span>LOGIN</span>
          </p>
        </div>
      </div>
      <TagLine />
    </>
  );
};

export default SignupForm;
