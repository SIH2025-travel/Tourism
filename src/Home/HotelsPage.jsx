// src/Home/HotelsPage.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { places } from "./HomePage";
import "./SubPages.css";

export default function HotelsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const place = places.find((p) => p.id === parseInt(id));

  if (!place) return <p className="not-found">Hotels info not found!</p>;

  return (
    <div className="sub-page">
      <Navbar />
      <div className="sub-content">
        <h1 className="sub-title">{place.title} – Hotels & Resorts</h1>
        <p className="sub-description">
          Find the best hotels, resorts, and homestays in <b>{place.title}</b>. 
          (Replace this with real accommodation info later.)
        </p>

        <div className="sub-cards">
          <div className="sub-card">
            <img src={place.img} alt="hotel" />
            <h3>Hotel/Resort 1</h3>
            <p>Comfortable stay with great amenities.</p>
          </div>
          <div className="sub-card">
            <img src={place.img} alt="hotel" />
            <h3>Hotel/Resort 2</h3>
            <p>Peaceful location with scenic views.</p>
          </div>
        </div>

        <button className="explore-btn" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    </div>
  );
}
