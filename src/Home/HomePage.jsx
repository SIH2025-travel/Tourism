import React, { useState } from "react";
import "./HomePage.css";

import Sidebar from "./components/Sidebar";

import bgImage from "../assets/HomePageBG.jpg";
import sittongImg from "../assets/Sittong.jpg";
import lepchajagatImg from "../assets/Lepchajagat.jpg";
import tinchuleyImg from "../assets/Tinchuley.jpg";
import lamahattaImg from "../assets/Lamahatta.jpg";
import takdahImg from "../assets/Takdah.jpg";

const places = [
  { 
    id: 1, 
    title: "Sittong", 
    img: sittongImg, 
    subtitle: "The Orange Valley", 
    description: "Famous for its orange orchards and serene village life amidst nature.",
    buttonText: "Book Your Trip to Sittong"
  },
  { 
    id: 2, 
    title: "Lepchajagat", 
    img: lepchajagatImg, 
    subtitle: "Whispering Pines", 
    description: "A quiet retreat with pine forests and stunning Kanchenjunga views.",
    buttonText: "Plan Lepchajagat Escape"
  },
  { 
    id: 3, 
    title: "Tinchuley", 
    img: tinchuleyImg, 
    subtitle: "The Balcony of the Hills", 
    description: "A peaceful hamlet offering tea gardens and riverside walks.",
    buttonText: "Discover Tinchuley"
  },
  { 
    id: 4, 
    title: "Lamahatta", 
    img: lamahattaImg, 
    subtitle: "Eco Village of Tranquility", 
    description: "Perfect for nature lovers, known for its eco-park and pine forest trails.",
    buttonText: "Explore Lamahatta"
  },
  { 
    id: 5, 
    title: "Takdah", 
    img: takdahImg, 
    subtitle: "Colonial Charm", 
    description: "Once a British cantonment, now known for orchid nurseries and tea estates.",
    buttonText: "Visit Takdah"
  }
];

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0);   // which card is active (background)
  const [displayIndex, setDisplayIndex] = useState(0); // which place's text is showing
  const [fade, setFade] = useState(false);             // control fade animation

  // Reorder cards so active one is background
  const reorderedPlaces = [
    ...places.slice(activeIndex + 1),
    ...places.slice(0, activeIndex),
  ];

  // Handle card click
  const handleCardClick = (newIndex) => {
    setFade(true); // start fading out text

    // Wait for fade-out animation (600ms) before switching text
    setTimeout(() => {
      setActiveIndex(newIndex);
      setDisplayIndex(newIndex);
      setFade(false); // fade text back in
    }, 600);
  };

  return (
    <div
      className="homepage"
      style={{ backgroundImage: `url(${places[activeIndex]?.img || bgImage})` }}
  >
      <div className="home-body">
        <Sidebar />

        <main className="home-content">
          {/* Left Section with fade animation */}
          <div className={`homepage-left ${fade ? "fade-out" : "fade-in"}`}>
            <h2>{places[displayIndex].subtitle}</h2>
            <h1>{places[displayIndex].title}</h1>
            <p>{places[displayIndex].description}</p>
            <button className="explore-btn">
              {places[displayIndex].buttonText}
            </button>
          </div>

          {/* Right Section – Queue of Cards */}
          <div className="homepage-cards">
            {reorderedPlaces.map((place, idx) => (
              <div
                key={place.id}
                className={`card ${idx === 0 ? "active-card" : ""}`}
                style={{
                  transform: `translateX(${idx * 220}px) scale(${
                    idx === 0 ? 1 : 0.9
                  })`,
                  opacity: idx > 2 ? 0 : 1,
                  zIndex: 10 - idx,
                }}
                onClick={() => handleCardClick(places.indexOf(place))}
              >
                <img src={place.img} alt={place.title} />
                <h3>{place.title}</h3>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}