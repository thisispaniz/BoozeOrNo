// src/pages/AlcoholPlannerPage.jsx
import React, { useState } from 'react';
import '../App.css';
import Footer from '../components/Footer';

const rFactors = {
    male: 0.73,
    female: 0.66
};

const drinks = [
    {name: 'Beer (300 ml @ 5%)', alcoholOz: 0.50721},
    { name: 'Beer (500 ml @ 5%)', alcoholOz: 0.84535 },
    { name: 'Wine (One Glass - 150 ml @ 12%)', alcoholOz: 0.608652 },
    { name: 'Liquor (One Shot - 44 ml @ 40%)', alcoholOz: 0.595128 }
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

    const maxBAC = 0.08;
    const r = rFactors[sex];
    const weightNum = parseFloat(weight) * 2.2046;
    const maxAlcoholOz = ((maxBAC + 0.015 * hours) * weightNum * r) / 5.14;

    const drinkPlan = drinks.map(drink => ({
        ...drink,
        count: Math.floor(maxAlcoholOz / drink.alcoholOz)
    }));

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
        <div className='page-container'>
            <div className="planner-container">
                <h1>Alcohol Metabolism Planner</h1>
                <form onSubmit={handleSubmit} className="planner-form">
                    <label>
                        Sex:
                        <select value={sex} onChange={(e) => setSex(e.target.value)}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </label>

                    <label>
                        Weight (kg):
                        <input className='calcinput' type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
                    </label>

                    <label>
                        The alcohol needs to be out of your system by:
                        <input className='calcinput' type="datetime-local" value={targetTime} onChange={(e) => setTargetTime(e.target.value)} />
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
                        <path
                            d = {results.timePoints.map((point, index) => {
                                const x = (index / (results.timePoints.length - 1)) * 600;
                                const y = 200 - parseFloat(point.bac) * 200;
                                return `${index === 0 ? 'M' : 'L'} ${x},${y}`;
                            }).join(' ')}
                            fill = "none"
                            stroke='#FFC300'
                            strokeWidth="2"
                        />
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
        <Footer />
    </div>
);
}

export default AlcoholPlannerPage;