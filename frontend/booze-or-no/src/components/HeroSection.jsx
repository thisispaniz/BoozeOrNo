import React from "react";
import "../App.css";

function HeroSection() {
    return (
        <section className="hero-section">
            <h1>WANNA PARTY BUT:</h1>
            <h1>-YOU'RE ON MEDS?</h1>
            <h1>-HAVE A MEDICAL CONDITION?</h1>
            <p>See how safe it is to drink tonight.</p>
            <h2>TRY IT NOW</h2>
            <div className="search-bar">
                <input type="text" placeholder="Enter a medication you are taking" />
                <button className="search-button">BOOZE OR NO</button>
            </div>
        </section>
    );
}

export default HeroSection;