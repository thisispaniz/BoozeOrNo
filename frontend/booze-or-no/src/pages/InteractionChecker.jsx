import React from "react";
import NavBarLoggedIn from "../components/NavBar-LoggedIn";
import Footer from "../components/Footer";

function InteractionChecker () {
    return (
        <div className="page-container">
            <NavBarLoggedIn />
            <div className="checker-container">
                <h1>Medication X Alcohol Checker</h1>
                <div className="search-bar search-bar-checker">
                    <input
                    type="text"
                    placeholder="Enter a medication you are taking"
                    />
                    <button className="search-button">BOOZE OR NO</button>
                </div>
            </div>
            <Footer />
        </div>
    )
};

export default InteractionChecker;
