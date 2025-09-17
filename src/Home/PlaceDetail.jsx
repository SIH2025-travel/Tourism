import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { places } from "./HomePage";
import { FaMapMarkedAlt } from "react-icons/fa";   // Sightseeing
import { GiHamburger } from "react-icons/gi";      // Foods
import { FaHotel } from "react-icons/fa";          // Hotels
import "./PlaceDetail.css";

export default function PlaceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const place = places.find((p) => p.id === parseInt(id));
  if (!place) return <p className="not-found">Place not found!</p>;

  return (
    <div
      className="place-detail"
      style={{ backgroundImage: `url(${place.img})` }}
    >
      <Navbar />

      <div className="place-content">
        <h2 className="place-subtitle">{place.subtitle}</h2>
        <h1 className="place-title">{place.title}</h1>

        {/* ✅ Cards Section */}
        <div className="place-cards">
          <div
            className="detail-card"
            onClick={() => navigate(`/home/place/${place.id}/sightseeing`)}
          >
            <FaMapMarkedAlt size={50} color="#ff4d4d" />
            <h3>Sightseeing</h3>
            <p>Explore the top attractions and scenic spots.</p>
          </div>

          <div
            className="detail-card"
            onClick={() => navigate(`/home/place/${place.id}/foods`)}
          >
            <GiHamburger size={50} color="#ffb347" />
            <h3>Local Foods</h3>
            <p>Discover authentic flavors and traditional cuisine.</p>
          </div>

          <div
            className="detail-card"
            onClick={() => navigate(`/home/place/${place.id}/hotels`)}
          >
            <FaHotel size={50} color="#4da6ff" />
            <h3>Hotels & Resorts</h3>
            <p>Find comfortable stays and cozy resorts.</p>
          </div>
        </div>

        <button className="explore-btn" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    </div>
  );
}
