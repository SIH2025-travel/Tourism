import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Planner.css';

export default function Results() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const trip = state?.trip;
  if (!trip) return (
    <div className="planner-page">
      <h3>No itinerary found</h3>
      <button onClick={() => navigate('/planner')}>Create one</button>
    </div>
  );

  return (
    <div className="planner-page">
      <h2>Your Itinerary for {trip.destination || 'Trip'}</h2>
      <p>Estimated total cost: ₹{trip.totalEstimatedCost}</p>
      <div className="itinerary">
        {trip.itinerary.map(day => (
          <div key={day.day} className="it-day">
            <h4>Day {day.day}</h4>
            <ul>
              {day.activities.map((a, i) => (
                <li key={i}>{a.time} — {a.activity} (₹{a.cost})</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
