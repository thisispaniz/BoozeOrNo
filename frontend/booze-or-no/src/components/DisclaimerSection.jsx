import React from "react";
import "../App.css";

function DisclaimerSection() {
    return (
        <div className="disclaimer-section">
            <div className="row">
                <div className="column column-photo"><img src="/Booze or No.svg" alt="BoozeOrNo" /></div>
                <div className="column column-text"><p>DON'T KILL YOURSELF DRINKING</p></div>
            </div>
            <div className="disclaimer">
                <h3>DISCLAIMER</h3>
                <p>
                Our recommendations are based on up-to-date, science-backed medical data. However, this platform is not a substitute for professional medical advice, diagnosis, or treatment. We are not your doctor. The safest option is always to consult with your healthcare provider—and when in doubt, it’s best not to drink.
                </p>
            </div>
        </div>
    );
}

export default DisclaimerSection;