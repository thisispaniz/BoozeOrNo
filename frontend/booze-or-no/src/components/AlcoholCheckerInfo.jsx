import React from "react";
import "../App.css"

function AlcoholCheckerInfo () {
    return (
        <div className="AlcoholCheckerInfo-container">
            <section className="drinkplanner-section">
                <div className="logo-container">
                    <img className="drinkplanner-logo" src="./Frame 51.svg" alt="" />
                </div>
                <p className="info">Alcohol can be extra dangerous if you have certain medical conditions. Make sure you’re not at risk before drinking. </p>
                <a href="/conditionxalcohol"><button className="entire-section">Conditions x alcohol checker</button></a>
            </section>
        <section className="drinkplanner-section">
            <div className="logo-container">
                <img className="drinkplanner-logo" src="./Frame 50.svg" alt="" />
            </div>
            <p className="info">Check if it’s dangerous to drink with medications you’re taking or planning to take.</p>
            <a href="/medicationxalcohol"><button className="entire-section">medication x alcohol checker</button></a>
        </section>
        </div>
    );
}

export default AlcoholCheckerInfo;