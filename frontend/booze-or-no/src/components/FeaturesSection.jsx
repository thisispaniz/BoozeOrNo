import React from "react";
import "../App.css";

function FeaturesSection() {
    return (
        <section className="features-section">
            <div className="feature-texts">
                <h2 className="h1-black">CREATE AN ACCOUNT TO ACCESS FULL FEATURES</h2>
                <p className="p-black">&#10003; Enter as many long-term or short-term medications</p>
                <p className="p-black">&#10003; Enter medical conditions</p>
                <p className="p-black">&#10003; Get personalized recommendations based on your alcohol metabolism</p>
            </div>
            <a href="/signup"><button className="sign-me-up">SIGN ME UP</button></a>
        </section>
    );
}

export default FeaturesSection;