import React, { useState, useEffect, useRef } from "react";

function HeroSection() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const inputRef = useRef(null);

  // Fetch autocomplete suggestions when query changes
  useEffect(() => {
    if (query.trim().length === 0) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(`https://boozeorno-backend.onrender.com/autocomplete?q=${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error("Failed to fetch suggestions");
        const data = await res.json();
        setSuggestions(data);
        setShowSuggestions(true);
      } catch (err) {
        console.error(err);
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    fetchSuggestions();
  }, [query]);

  async function handleSearch() {
    if (!query.trim()) {
      setError("Please enter a medication name or ingredient.");
      setResults(null);
      return;
    }
    setError(null);
    setResults(null);
    setShowSuggestions(false);

    try {
      const response = await fetch(`https://boozeorno-backend.onrender.com/search?q=${encodeURIComponent(query)}`);
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

  // When user clicks a suggestion, fill input and hide suggestions
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    inputRef.current.focus();
  };

  return (
    <section className="hero-section">
      <h1>WANNA PARTY BUT:</h1>
      <h1>-YOU'RE ON MEDS?</h1>
      <h1>-HAVE A MEDICAL CONDITION?</h1>
      <p>See how safe it is to drink tonight.</p>
      <h2>TRY IT NOW</h2>
      <div className="search-bar" style={{ position: "relative" }}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter a medication you are taking"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // delay to allow click
          autoComplete="off"
        />
        <button className="search-button" onClick={handleSearch}>BOOZE OR NO</button>

        {showSuggestions && suggestions.length > 0 && (
          <ul
            style={{
              position: "absolute",
              top: "40px",
              left: 0,
              right: 0,
              maxHeight: "150px",
              overflowY: "auto",
              backgroundColor: "black",
              border: "1px solid #ccc",
              borderRadius: "4px",
              zIndex: 1000,
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            {suggestions.map((suggestion, idx) => (
              <li
                key={idx}
                style={{ padding: "8px", cursor: "pointer" }}
                onClick={() => handleSuggestionClick(suggestion)}
                onMouseDown={e => e.preventDefault()} // prevent blur on click
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {results && (
        <div className="results">
          <p>
            This medication has the active ingredient <strong>{results.active_ingredient}</strong>.{" "}
            There are generic brands available: <strong>{results.medication_brand}</strong>.{" "}
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
