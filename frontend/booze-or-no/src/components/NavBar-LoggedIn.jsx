import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

function NavBarLoggedIn() {
    return (
        <header className="header">
            <div className="logo">
                <a href="/" ><img src="/Booze or No.svg" alt="BoozeOrNo" /></a>
            </div>
            <nav className="nav">
                <a href="" className="nav-link">Logout</a>
                <a href="/dashboard"><img className="avatar-navbar" src="/avatar-1577909_1280.png" alt="" /></a>
            </nav>
        </header>
    )}

export default NavBarLoggedIn;
