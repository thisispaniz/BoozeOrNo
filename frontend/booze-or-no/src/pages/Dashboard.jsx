import React from "react";
import '../App.css';
import NavBarLoggedIn from "../components/NavBar-Loggedin";
import TagLine from "../components/TagLine";
import ProfileSection from "../components/ProfileSection";
import FeaturesSection from "../components/FeaturesSection";

const Dashboard = () => {
    return (
        <>
            <NavBarLoggedIn />
            <h1 className="title">Welcome, Max!</h1>
            <ProfileSection />
            <TagLine />
        </>
    )
}

export default Dashboard;