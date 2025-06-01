// src/pages/AlcoholPlannerPage.jsx
import React, { useState } from 'react';
import './AlcoholPlannerPage.css';

const rFactors = {
  male: 0.73,
  female: 0.66
};

const drinks = [
  { name: 'Beer (12 oz @ 5%)', alcoholOz: 0.6 },
  { name: 'Wine (5 oz @ 12%)', alcoholOz: 0.6 },
  { name: 'Liquor (1.5 oz @ 40%)', alcoholOz: 0.6 }
];

function AlcoholPlannerPage() {
  const [sex, setSex] = useState('male');
  const [weight, setWeight] = useState('');
  const [targetTime, setTargetTime] = useState('');
  const [results, setResults] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const now = new Date();
    const endTime = new Date(targetTime);
    const hours = (endTime - now) / (1000 * 60 * 60);

    if (hours <= 0 || !weight || !sex) {
      alert('Please enter valid inputs.');
      return;
    }

    const maxBAC = 0.08; // We'll use 0.08 as upper limit for safety
    const r = rFactors[sex];
    const weightNum = parseFloat(weight);
    const maxAlcoholOz = ((maxBAC + 0.015 * hours) * weightNum * r) / 5.14;

    // Estimate how many of each drink you could safely consume
    const drinkPlan = drinks.map(drink => ({
      ...drink,
      count: Math.floor(maxAlcoholOz / drink.alcoholOz)
    }));

    // Generate BAC over time (simple decay model)
    const timePoints = [];
    let totalAlcohol = maxAlcoholOz;
    let bac = (totalAlcohol * 5.14) / (weightNum * r);
    for (let h = 0; h <= hours; h += 0.5) {
      const t = new Date(now.getTime() + h * 3600000);
      const decayedBAC = Math.max(bac - 0.015 * h, 0).toFixed(3);
      timePoints.push({ time: t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), bac: decayedBAC });
    }

    setResults({ drinkPlan, timePoints });
  }

  return (
    <div className="planner-container">
      <h2>Alcohol Metabolism Planner</h2>
      <form onSubmit={handleSubmit} className="planner-form">
        <label>
          Sex:
          <select value={sex} onChange={(e) => setSex(e.target.value)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>

        <label>
          Weight (lbs):
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </label>

        <label>
          Be sober by:
          <input type="datetime-local" value={targetTime} onChange={(e) => setTargetTime(e.target.value)} />
        </label>

        <button type="submit">Calculate</button>
      </form>

      {results && (
        <div className="results">
          <h3>You can drink:</h3>
          <ul>
            {results.drinkPlan.map(drink => (
              <li key={drink.name}>{drink.count} × {drink.name}</li>
            ))}
          </ul>

          <h3>BAC Over Time</h3>
          <div className="graph-container">
            <svg width="100%" height="200">
              {results.timePoints.map((point, index) => {
                const x = (index / (results.timePoints.length - 1)) * 100;
                const y = 200 - parseFloat(point.bac) * 200; // scale BAC to svg height
                return (
                  <circle key={index} cx={`${x}%`} cy={y} r="2" fill="blue">
                    <title>{point.time}: {point.bac}</title>
                  </circle>
                );
              })}
            </svg>
            <div className="x-labels">
              {results.timePoints.map((point, i) => (
                <span key={i}>{i % 2 === 0 ? point.time : ''}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AlcoholPlannerPage;