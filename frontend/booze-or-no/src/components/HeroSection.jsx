import React, { useState } from "react";

function HeroSection() {
  const [query, setQuery] = useState("");
  const [interaction, setInteraction] = useState(null);
  const [brandName, setBrandName] = useState(null);
  const [activeIngredient, setActiveIngredient] = useState(null);
  const [error, setError] = useState(null);

  async function handleSearch() {
    if (!query.trim()) {
      setError("Please enter a medication name or ingredient.");
      return;
    }
    setError(null);
    setBrandName(null);
    setActiveIngredient(null);
    setInteraction(null);

    try {
      const response = await fetch(`/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      setBrandName(data.length > 0 ? data[0].medication_brand : "No results found.");
      setActiveIngredient(data.length > 0 ? data[0].active_ingredient : "---");
      setInteraction(data.length > 0 ? data[0].alcohol_interaction : "---");
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
      {brandName && <p>Medicine brand name: {brandName}</p>}
      {activeIngredient && <p>Active ingredient: {activeIngredient}</p>}
      {interaction && <p>Alcohol interaction info: {interaction}</p>}
    </section>
  );
}

export default HeroSection;
