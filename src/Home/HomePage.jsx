import React, { useState } from "react";
import "./HomePage.css";
import bgImage from "../assets/HomePageBG.jpg"; // fixed extension
import sittongImg from "../assets/Sittong.jpg";
import lepchajagatImg from "../assets/Lepchajagat.jpg";
import tinchuleyImg from "../assets/Tinchuley.jpg";
import lamahattaImg from "../assets/Lamahatta.jpg";


const places = [
  {
    id: 1,
    title: "Sittong",
    img: sittongImg,
    link: "#nagano",
  },
  {
    id: 2,
    title: "Lepchajagat",
    img: lepchajagatImg,
    link: "#marrakech",
  },
  {
    id: 3,
    title: "Tinchuley",
    img: tinchuleyImg,
    link: "#yosemite",
  },
  {
    id: 4,
    title: "Lamahatta",
    img: lamahattaImg,
    link: "#loslances",
  },
];

export default function HomePage() {
  const [activeCard, setActiveCard] = useState(null);

  return (
    <div
      className="homepage"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Left Content */}
      <div className="homepage-left">
        <h2>Offbeat Places Of</h2>
        <h1>North Bengal</h1>
        <p>
          Explore breathtaking destinations around North Bengal with curated travel
          guides and adventures.
        </p>
        <button className="explore-btn">Book Your Journey</button>
      </div>

      {/* Right Cards */}
      <div className="homepage-cards">
        {places.map((place) => (
          <div
            key={place.id}
            className={`card ${activeCard === place.id ? "active" : ""}`}
            onClick={() => setActiveCard(place.id)}
          >
            <img src={place.img} alt={place.title} />
            <h3>{place.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
