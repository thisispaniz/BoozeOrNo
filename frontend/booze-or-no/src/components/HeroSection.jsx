import React, { useState, useEffect, useRef } from "react";

function HeroSection() {
  const [query, setQuery] = useState("");
  const [displayedText, setDisplayText] = useState(null);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  // Fetch autocomplete suggestions
  useEffect(() => {
    if (query.trim().length === 0) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(`/autocomplete?q=${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error("Failed to fetch suggestions");
        const data = await res.json();

        // Use data directly — it's an array of strings (brand or ingredient)
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

  // Handle search
  async function handleSearch(searchTerm = query) {
    if (!searchTerm.trim()) {
      setError("Please enter a medication name or ingredient.");
      setDisplayText(null);
      return;
    }

    setError(null);
    setDisplayText(null);
    setShowSuggestions(false);

    try {
      const response = await fetch(`/search?q=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      if (data.length === 0) {
        setError("No results found.");
      } else {
        setDisplayText(data[0].displayed_text);
      }
    } catch (e) {
      console.error(e);
      setError("Failed to fetch data. Make sure the backend is running.");
    }
  }

  const handleSuggestionClick = (text) => {
    setQuery(text);
    setShowSuggestions(false);
    inputRef.current.focus();
    handleSearch(text); // Immediately trigger search on suggestion click
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
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          autoComplete="off"
        />
        <button className="search-button" onClick={() => handleSearch()}>BOOZE OR NO</button>

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
            {suggestions.map((text, idx) => (
              <li
                key={idx}
                style={{
                  padding: "12px 16px",
                  cursor: "pointer",
                  fontSize: "16px",
                  lineHeight: "1.4",
                  backgroundColor: "black",
                  color: "white",
                  borderBottom: "1px solid #444"
                }}
                onClick={() => handleSuggestionClick(text)}
                onMouseDown={(e) => e.preventDefault()} // prevent blur on click
              >
                {text}
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {displayedText && <p style={{ whiteSpace: "pre-line" }}>{displayedText}</p>}
    </section>
  );
}

export default HeroSection;
