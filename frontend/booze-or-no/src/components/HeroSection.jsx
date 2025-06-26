import React, { useState, useEffect, useRef } from "react";

function HeroSection() {
  const [query, setQuery] = useState("");
  const [displayedText, setDisplayText] = useState(null);
  const [riskLevel, setRiskLevel] = useState(null);
  const [medicationBrand, setMedicationBrand] = useState(null);
  const [activeIngredient, setActiveIngredient] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  function getRiskClass(riskLevel) {
    if (!riskLevel) {
      console.log('empty')
      return '';}

      switch(riskLevel.toLowerCase()) {
        case 'safe':
          return 'safe';
        case 'low-risk':
          return 'low-risk';
        case 'moderate risk':
          return 'moderate-risk';
        case 'elevated risk':
          return 'elevated-risk';
        case 'high risk':
          return 'high-risk';
        case 'very high risk':
          return 'very-high-risk';
        case 'extremely dangerous':
          return 'extremely-dangerous';
        default:
          return 'unknown-risk'; 
      }
    
  }
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
      setMedicationBrand(null);
      setActiveIngredient(null);
      setRiskLevel(null);
      hasSearched(false);
      return;
    }

    setError(null);
    setDisplayText(null);
    setMedicationBrand(null);
    setActiveIngredient(null);
    setRiskLevel(null);
    setHasSearched(true);
    setShowSuggestions(false);


    try {
      const response = await fetch(`/search?q=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      if (data.length === 0) {
        setError("No results found.");
      } else {
        setDisplayText(data[0].displayed_text);
        setActiveIngredient(data[0].active_ingredient);
        setRiskLevel(data[0].risk_level);
        setMedicationBrand(data[0].medication_brand);
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
      {hasSearched && (
      <div className="medicine-search-results my-5 p-4">
        <div className=" d-flex flex-column gap-3">
          <div className="medicine-title-info d-flex flex-column gap-0 p-3 bg-main-dark">
            <h2>{medicationBrand}</h2>
            <p className="m-0">Active Ingredient: <span className="active-ingredient-name fw-bold">{activeIngredient}</span></p>
          </div>
          <div className={`alcohol-interaction p-3 bg-main-dark border-${getRiskClass(riskLevel)} py-4`}>
            <p className="m-0">Interaction with alcohol: <span className={`interaction-risk text-uppercase fw-bold ${getRiskClass(riskLevel)}`}>{riskLevel}</span></p>
          </div>
          <div className="side-effects p-3 bg-main-dark">
            {displayedText && <p style={{ whiteSpace: "pre-line" }}>{displayedText}</p>}
          </div>
        </div>
      </div>
      )}
    </section>
  );
}

export default HeroSection;
