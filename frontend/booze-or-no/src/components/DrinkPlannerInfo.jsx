import React from "react";
import "../App.css";

function DrinkPlannerInfo () {
    return (
        <section className="drinkplanner-section">
            <img className="drinkplanner-logo" src="./Frame 49.svg" alt="" />
            <h3>Planning to drink tonight or sometime soon?</h3>
            <h3>need to  be sober for work, school, medication,  breastfeeding, or any other reason?</h3>
            <p className="info">We’ll cross check your plans with your profile to estimate how much you can drink and by when, to ensure you’ll be sober when you need to be. </p>
            <a href="/planner"><button className="entire-section">DRINK PLANNER</button></a>
        </section>
    )
}

export default DrinkPlannerInfo;