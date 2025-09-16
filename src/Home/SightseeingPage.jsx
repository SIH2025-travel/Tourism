import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { places } from "./HomePage";
import "./SubPages.css";

export default function SightseeingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const place = places.find((p) => p.id === parseInt(id));

  if (!place) return <p className="not-found">Sightseeing info not found!</p>;

  return (
    <div className="sub-page">
      <Navbar />
      <div className="sub-content">
        <h1 className="sub-title">{place.title} – Sightseeing</h1>
        <p className="sub-description">
          Discover the best sightseeing attractions in <b>{place.title}</b>. 
          This section can include must-visit places, natural views, cultural 
          spots, and hidden gems that make {place.title} special.
        </p>

        {/* Example cards for sightseeing spots */}
        <div className="sub-cards">
          <div className="sub-card">
            <img src={place.img} alt="spot" />
            <h3>Main Attraction 1</h3>
            <p>A short description about this sightseeing spot.</p>
          </div>
          <div className="sub-card">
            <img src={place.img} alt="spot" />
            <h3>Main Attraction 2</h3>
            <p>A short description about this sightseeing spot.</p>
          </div>
          <div className="sub-card">
            <img src={place.img} alt="spot" />
            <h3>Main Attraction 3</h3>
            <p>A short description about this sightseeing spot.</p>
          </div>
        </div>

        <button className="explore-btn" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    </div>
  );
}
