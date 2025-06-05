import React, { useState } from "react";
import '../App.css';
import NavBar from "../components/NavBar";
import TagLine from "../components/TagLine";

const SignupForm = () => {
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRequirements = [
    { label: "At least 8 characters", test: (pw) => pw.length >= 8 },
    { label: "One uppercase letter", test: (pw) => /[A-Z]/.test(pw) },
    { label: "One lowercase letter", test: (pw) => /[a-z]/.test(pw) },
    { label: "One number", test: (pw) => /\d/.test(pw) },
    { label: "One special character", test: (pw) => /[!@#$%^&*]/.test(pw) },
  ];

  return (
    <>
      <NavBar />
      <div className="container">
        <h1 className="title">CREATE AN ACCOUNT</h1>
        <div className="form">
          <div className="name-fields">
            <input className="signup-input" type="text" placeholder="First name" />
            <input className="signup-input" type="text" placeholder="Last name" />
          </div>
          <input className="signup-input" type="email" placeholder="email" />
          <input
            className="signup-input"
            type="password"
            placeholder="password"
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
          <button className="register-btn">REGISTER</button>
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
