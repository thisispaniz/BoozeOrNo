import React, { useState } from "react";
import '../App.css';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

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
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignupForm;
