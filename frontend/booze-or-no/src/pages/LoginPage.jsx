import React, { useState } from "react";
import '../App.css';
import NavBar from "../components/NavBar";
import TagLine from "../components/TagLine";

const SignupForm = () => {

  return (
    <>
      <NavBar />
      <div className="container">
        <h1 className="title">LOGIN TO YOUR ACCOUNT</h1>
        <div className="form">
          <input className="signup-input" type="email" placeholder="email" />
          <input
            className="signup-input"
            type="password"
            placeholder="password"
          />
          <button className="register-btn">LOGIN</button>
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
