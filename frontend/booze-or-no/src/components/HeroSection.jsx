import React, { useState } from "react";

function HeroSection() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  async function handleSearch() {
    if (!query.trim()) {
      setError("Please enter a medication name or ingredient.");
      setResults(null);
      return;
    }
    setError(null);
    setResults(null);

    try {
      const response = await fetch(`https://boozeorno-backend.onrender.com/search?q=${query}`);
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();

      if (data.length === 0) {
        setError("No results found.");
        setResults(null);
      } else {
        setResults(data[0]);
      }
    } catch (e) {
      setError("Failed to fetch data. Make sure the backend is running.");
      console.error(e);
    }
  }

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
        <button className="search-button" onClick={handleSearch}>BOOZE OR NO</button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {results && (
        <div className="results">
          <p>
            This medication has the active ingredient <strong>{results.active_ingredient}</strong>.{" "}
            <br>
            There are generic brands available: <strong>{results.medication_brand}</strong>.{" "}
              <br>
            It is usually used for/against <strong>{results.symptoms_disorders}</strong>.
          </p>
          {results.alcohol_interaction.toLowerCase() === "none" ? (
            <p>
              There is no known significant interaction of this medication with alcohol, but nevertheless, proceed with caution.
            </p>
          ) : (
            <p>
              Be aware: the following interactions are known to happen with alcohol: <strong>{results.alcohol_interaction}</strong>.
            </p>
          )}
        </div>
      )}
    </section>
  );
}

export default HeroSection;
