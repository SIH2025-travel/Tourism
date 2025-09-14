import React from "react";
import { MapPin } from "lucide-react";
import "../styles/HomePage.css";

const locations = [
  { name: "Darjeeling", x: "70%", y: "10%" },
  { name: "Kalimpong", x: "80%", y: "15%" },
  { name: "Kurseong", x: "65%", y: "25%" },
  { name: "Siliguri", x: "50%", y: "40%" },
  { name: "Dooars", x: "40%", y: "55%" },
  { name: "Jalpaiguri", x: "50%", y: "60%" },
  { name: "Alipurduar", x: "30%", y: "65%" },
  { name: "Cooch Behar", x: "35%", y: "80%" },
];

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Header */}
      <header className="homepage-header">
        <h1>North Bengal Explorer</h1>
        <p>Click on any location to discover hotels, tours, restaurants, and cost estimates</p>
      </header>

      {/* Main Content */}
      <main className="homepage-main">
        {/* Map Section */}
        <div className="homepage-map-card">
          <div className="homepage-map">
            {locations.map((loc, i) => (
              <div
                key={i}
                className="homepage-location"
                style={{ top: loc.y, left: loc.x }}
              >
                <div className="homepage-location-dot"></div>
                <span className="homepage-location-label">{loc.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="homepage-info">
          {/* Select a Location Card */}
          <div className="homepage-card homepage-card-center">
            <MapPin size={32} className="homepage-icon" />
            <h2>Select a Location</h2>
            <p>Click on any location on the map to explore hotels, tours, restaurants, and get cost estimates.</p>
          </div>

          {/* Quick Stats Card */}
          <div className="homepage-card">
            <h2>Quick Stats</h2>
            <ul className="homepage-stats">
              <li><span>Destinations</span> <span>8</span></li>
              <li><span>Hill Stations</span> <span>4</span></li>
              <li><span>Wildlife Areas</span> <span>3</span></li>
              <li><span>Heritage Sites</span> <span>2</span></li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
