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
            <div className="medicine-search-results my-5 p-4">
                <div className=" d-flex flex-column gap-3">
                <div className="medicine-title-info d-flex flex-column gap-0 p-3 bg-main-dark">
                    <h2>Darvocet-N</h2>
                    <p className="m-0">Active Ingredient: <span className="active-ingredient-name fw-bold">Propoxyphene</span></p>
                </div>
                <div className="alcohol-interaction p-3 bg-main-dark border-high-risk py-4">
                    <p className="m-0">Interaction with alcohol: <span className="interaction-risk text-uppercase fw-bold high-risk">high risk</span></p>
                </div>
                <div className="side-effects p-3 bg-main-dark">
                    <p>Alcohol interaction side-effects include:</p>
                    <ul className="fw-bold fs-5">
                    <li>Increased risk of overdose</li>
                    <li>Severe drowsiness</li>
                    <li>Respiratory depression</li>
                    <li>Increased risk of liver damage</li>
                    </ul>
                </div>
                </div>
            </div>
            <Footer />
        </div>
    )
};

export default InteractionChecker;
