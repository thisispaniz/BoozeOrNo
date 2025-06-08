import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <header className="header">
            <div className="logo">
                <a href="/" ><img src="/Booze or No.svg" alt="BoozeOrNo" /></a>
            </div>
            <nav className="nav">
                <a href="#about" className="nav-link">About</a>
                <a href="/signup" className="nav-link">Signup</a>
                <Link to="/login" className="nav-link-yellow">Login</Link>
            </nav>
        </header>
    )}

export default NavBar;
