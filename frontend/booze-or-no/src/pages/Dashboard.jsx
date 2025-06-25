import React from "react";
import '../App.css';
import Footer from "../components/Footer";
import ProfileSection from "../components/ProfileSection";
import DrinkPlannerInfo from "../components/DrinkPlannerInfo";
import AlcoholCheckerInfo from "../components/AlcoholCheckerInfo";

const Dashboard = () => {
  const email = localStorage.getItem("email") || "User";

  return (
    <>
      <h1 className="title">Welcome, {email}!</h1>
      <ProfileSection />
      <DrinkPlannerInfo />
      <AlcoholCheckerInfo />
      <Footer />
    </>
  );
};

export default Dashboard;
