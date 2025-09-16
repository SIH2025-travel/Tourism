import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Planner.css';
import generateItinerary from './generateItinerary.js';
import { supabase, isSupabaseConfigured, saveTripLocally } from '../Supabase/Supabase';

export default function Planner() {
  const [destination, setDestination] = useState('');
  const [budget, setBudget] = useState('');
  const [days, setDays] = useState(2);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const b = Number(budget);
    if (!destination || !b || b <= 0) return alert('Please enter valid destination and budget');
    setLoading(true);
    const trip = generateItinerary({ destination, budget: b, days });

    // Try saving to Supabase if configured
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('trips').insert([
          { destination, budget: b, days, itinerary: trip, created_at: new Date().toISOString() }
        ]);
        if (error) console.warn('Supabase save error', error.message);
      } catch (err) {
        console.warn('Supabase save failed', err);
      }
    } else {
      saveTripLocally({ destination, budget: b, days, itinerary: trip, created_at: new Date().toISOString() });
    }

    setLoading(false);
    // pass itinerary via state to results page
    navigate('/planner/results', { state: { trip } });
  };

  return (
    <div className="planner-page">
      <h2>Create a Trip</h2>
      <form className="planner-form" onSubmit={submit}>
        <label>Destination</label>
        <input value={destination} onChange={e => setDestination(e.target.value)} placeholder="e.g., Sittong" />

        <label>Budget (INR)</label>
        <input value={budget} onChange={e => setBudget(e.target.value)} type="number" placeholder="e.g., 5000" />

        <label>Days</label>
        <input value={days} onChange={e => setDays(Number(e.target.value))} type="number" min={1} max={7} />

        <button disabled={loading} className="planner-btn">{loading ? 'Generating...' : 'Generate Itinerary'}</button>
      </form>
    </div>
  );
}
