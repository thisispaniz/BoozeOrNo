import React from "react";
import "../App.css";

function NavBar() {
    return (
        <header className="header">
            <div className="logo">
                <img src="/Booze or No.svg" alt="BoozeOrNo" />
            </div>
            <nav className="nav">
                <a href="#about" className="nav-link">About</a>
                <a href="#signup" className="nav-link">Sign up</a>
                <a href="#login" className="nav-link-yellow">Login</a>
            </nav>
        </header>
    )}

export default NavBar;