import React from "react";
import '../App.css';
import NavBarLoggedIn from "../components/NavBar-LoggedIn";
import TagLine from "../components/TagLine";
import ProfileSection from "../components/ProfileSection";
import DrinkPlannerInfo from "../components/DrinkPlannerInfo";
import AlcoholCheckerInfo from "../components/AlcoholCheckerInfo";

const Dashboard = () => {
    return (
        <>
            <NavBarLoggedIn />
            <h1 className="title">Welcome, Max!</h1>
            <ProfileSection />
            <DrinkPlannerInfo />
            <AlcoholCheckerInfo />
            <TagLine />
        </>
    )
}

export default Dashboard;