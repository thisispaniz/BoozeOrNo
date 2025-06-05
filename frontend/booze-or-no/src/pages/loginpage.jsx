// loginpage.jsx
import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import '../App.css';
import NavBar from "../components/NavBar";
import TagLine from "../components/TagLine";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setMessage(error ? error.message : "Login successful!");
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <h1 className="title">LOGIN TO YOUR ACCOUNT</h1>
        <div className="form">
          <input className="signup-input" type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input
            className="signup-input"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="register-btn" onClick={handleLogin}>LOGIN</button>
          {message && <p>{message}</p>}
        </div>
      </div>
      <TagLine />
    </>
  );
};

export default LoginForm;
