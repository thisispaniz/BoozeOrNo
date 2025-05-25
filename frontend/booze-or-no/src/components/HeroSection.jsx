import React, { useState } from "react";
import "../App.css";

function HeroSection() {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        if (!query.trim()) return;

        try {
            const response = await fetch(`http://backend:8000/search?q=${encodeURIComponent(query)}`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            if (data.length > 0) {
                setResult(data[0].alcohol_interaction); // Show only first match
            } else {
                setResult("No interaction data found for that medication.");
            }
        } catch (err) {
            setError("Failed to fetch data. Make sure the backend is running.");
        }
    };

    return (
        <section className="hero-section">
            <h1>WANNA PARTY BUT:</h1>
            <h1>-YOU'RE ON MEDS?</h1>
            <h1>-HAVE A MEDICAL CONDITION?</h1>
            <p>See how safe it is to drink tonight.</p>
            <h2>TRY IT NOW</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Enter a medication you are taking"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" className="search-button" onClick={handleSearch}>
                    BOOZE OR NO
                </button>
            </div>

            {result && <div className="result"><p>{result}</p></div>}
            {error && <div className="error"><p>{error}</p></div>}
        </section>
    );
}

export default HeroSection;
