import React, { useState } from "react";

function HeroSection() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function handleSearch() {
    if (!query.trim()) {
      setError("Please enter a medication name or ingredient.");
      return;
    }
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`https://boozeorno-backend.onrender.com/search?q=${query}`);
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      setResult(data.length > 0 ? data[0].alcohol_interaction : "No results found.");
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
      {result && <p>Alcohol interaction info: {result}</p>}
    </section>
  );
}

export default HeroSection;
