// signuppage.jsx
import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import '../App.css';
import NavBar from "../components/NavBar";
import TagLine from "../components/TagLine";

const SignupForm = () => {
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);

  const passwordRequirements = [
    { label: "At least 8 characters", test: (pw) => pw.length >= 8 },
    { label: "One uppercase letter", test: (pw) => /[A-Z]/.test(pw) },
    { label: "One lowercase letter", test: (pw) => /[a-z]/.test(pw) },
    { label: "One number", test: (pw) => /\d/.test(pw) },
    { label: "One special character", test: (pw) => /[!@#$%^&*]/.test(pw) },
  ];

  const allValid = passwordRequirements.every((rule) => rule.test(password));

  const handleSignup = async () => {
    if (!allValid) {
      setMessage("Password does not meet requirements.");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setMessage(error ? error.message : "Check your email to confirm your registration.");
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <h1 className="title">CREATE AN ACCOUNT</h1>
        <div className="form">
          <input className="signup-input" type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
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
                  <li key={idx} className={rule.test(password) ? "valid" : "invalid"}>
                    {rule.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button className="register-btn" onClick={handleSignup}>REGISTER</button>
          {message && <p>{message}</p>}
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
