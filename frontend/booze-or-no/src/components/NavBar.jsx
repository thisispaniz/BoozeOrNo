import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <header className="header">
            <div className="logo">
                <img src="/Booze or No.svg" alt="BoozeOrNo" />
            </div>
            <nav className="nav">
                <a href="#about" className="nav-link">About</a>
                <a href="#login" className="nav-link-yellow">Login</a>
            </nav>
        </header>
    )}

export default NavBar;
