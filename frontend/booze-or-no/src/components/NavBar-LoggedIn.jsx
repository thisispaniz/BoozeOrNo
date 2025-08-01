import React from "react";
import { useNavigate } from "react-router-dom";  // import useNavigate
import MyIdenticon from './MyIdenticon';
import "../App.css";

function NavBarLoggedIn() {
    const navigate = useNavigate();
    const email = localStorage.getItem("email") || "User";

    const handleLogout = (e) => {
        e.preventDefault();           // prevent default anchor behavior
        localStorage.removeItem("token"); // clear token from localStorage
        navigate("/"); 
        setTimeout(() => {
            window.location.reload();          // refresh the page
        }, 0);
        
    };

    return (
        <header className="header">
        <div className="logo">
            <a href="/" ><img src="/Booze or No.svg" alt="BoozeOrNo" /></a>
        </div>
        <nav className="nav">
            {/* Use a button or anchor with onClick handler */}
            <a href="/" className="nav-link" onClick={handleLogout}>Logout</a>
            <a href="/dashboard">
            {/* <img className="avatar-navbar" src="/avatar-1577909_1280.png" alt="User avatar" /> */}
            <MyIdenticon seed={email} size={44} />
            </a>
        </nav>
        </header>
    );
}

export default NavBarLoggedIn;
