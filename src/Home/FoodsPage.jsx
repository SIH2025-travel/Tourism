// src/Home/FoodsPage.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { places } from "./HomePage";
import "./SubPages.css";

export default function FoodsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const place = places.find((p) => p.id === parseInt(id));

  if (!place) return <p className="not-found">Foods info not found!</p>;

  return (
    <div className="sub-page">
      <Navbar />
      <div className="sub-content">
        <h1 className="sub-title">{place.title} – Local Foods</h1>
        <p className="sub-description">
          Explore the traditional and local delicacies of <b>{place.title}</b>. 
          (Replace this with real food details later.)
        </p>

        <div className="sub-cards">
          <div className="sub-card">
            <img src={place.img} alt="food" />
            <h3>Special Dish 1</h3>
            <p>A delicious specialty unique to {place.title}.</p>
          </div>
          <div className="sub-card">
            <img src={place.img} alt="food" />
            <h3>Special Dish 2</h3>
            <p>Another mouth-watering local delicacy to try.</p>
          </div>
        </div>

        <button className="explore-btn" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    </div>
  );
}