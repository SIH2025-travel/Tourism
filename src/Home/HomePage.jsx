import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import bgImage from "../assets/HomePageBG.jpg";
import sittongImg from "../assets/Sittong.jpg";
import lepchajagatImg from "../assets/Lepchajagat.jpg";
import tinchuleyImg from "../assets/Tinchuley.jpg";
import lamahattaImg from "../assets/Lamahatta.jpg";
import Chatbot from "../Chatbot/Chatbot";



const places = [
  { id: 1, title: "Sittong", img: sittongImg, link: "#nagano" },
  { id: 2, title: "Lepchajagat", img: lepchajagatImg, link: "#marrakech" },
  { id: 3, title: "Tinchuley", img: tinchuleyImg, link: "#yosemite" },
  { id: 4, title: "Lamahatta", img: lamahattaImg, link: "#loslances" },
import takdahImg from "../assets/Takdah.jpg";

// ✅ Export places so it can be used in PlaceDetail.jsx
export const places = [
  { 
    id: 1, 
    title: "Sittong", 
    img: sittongImg, 
    subtitle: "The Orange Valley", 
    description: "Famous for its orange orchards and serene village life amidst nature.",
    buttonText: "Book Your Trip to Sittong",
    readMore: "Sittong is known as the orange valley of North Bengal. It is a cluster of villages where you can experience rural charm, visit orange orchards, and stay in homestays while enjoying nature."
  },
  { 
    id: 2, 
    title: "Lepchajagat", 
    img: lepchajagatImg, 
    subtitle: "Whispering Pines", 
    description: "A quiet retreat with pine forests and stunning Kanchenjunga views.",
    buttonText: "Book Your Trip to Lepchajagat",
    readMore: "Lepchajagat is a serene hamlet offering breathtaking views of Kanchenjunga, surrounded by thick forests of rhododendron, oak, and pine. It's perfect for bird watching and peaceful retreats."
  },
  { 
    id: 3, 
    title: "Tinchuley", 
    img: tinchuleyImg, 
    subtitle: "The Balcony of the Hills", 
    description: "A peaceful hamlet offering tea gardens and riverside walks.",
    buttonText: "Book Your Trip to Tinchuley",
    readMore: "Tinchuley is a small mountain village known for its eco-tourism. It offers panoramic views of the Himalayas, lush tea gardens, and beautiful sunrise points."
  },
  { 
    id: 4, 
    title: "Lamahatta", 
    img: lamahattaImg, 
    subtitle: "Eco Village of Tranquility", 
    description: "Perfect for nature lovers, known for its eco-park and pine forest trails.",
    buttonText: "Book Your Trip to Lamahatta",
    readMore: "Lamahatta is an eco-tourism village surrounded by pine forests and prayer flags. Its eco-park and watchtower provide a peaceful escape amidst nature."
  },
  { 
    id: 5, 
    title: "Takdah", 
    img: takdahImg, 
    subtitle: "Colonial Charm", 
    description: "Once a British cantonment, now known for orchid nurseries and tea estates.",
    buttonText: "Book Your Trip to Takdah",
    readMore: "Takdah is famous for its old British bungalows, scenic orchid centers, and vast tea estates. A blend of colonial history and natural beauty."
  }
];

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const [animatingCard, setAnimatingCard] = useState(null);

  const navigate = useNavigate();
  const cardRefs = useRef([]);

  const reorderedPlaces = [
    ...places.slice(activeIndex + 1),
    ...places.slice(0, activeIndex),
  ];

  const handleCardClick = (newIndex) => {
    setAnimatingCard(newIndex);
    setTimeout(() => {
      setFade(true);
    }, 400);
    setTimeout(() => {
      setActiveIndex(newIndex);
      setDisplayIndex(newIndex);
      setFade(false);
      setAnimatingCard(null);
    }, 1000);
  };

  const handleReadMore = (idx) => {
    const cardElement = cardRefs.current[idx];
    if (cardElement) {
      const rect = cardElement.getBoundingClientRect();
      navigate(`/home/place/${places[idx].id}`, { state: { rect } });
    }
  };

  return (
    <div
      className="homepage"
      style={{ backgroundImage: `url(${places[activeIndex]?.img || bgImage})` }}
    >
      <Navbar />
      <div className="home-body">
        <Sidebar />
        <main className="home-content">
          <div className={`homepage-left ${fade ? "fade-out" : "fade-in"}`}>
            <h2>{places[displayIndex].subtitle}</h2>
            <h1>{places[displayIndex].title}</h1>
            <p>{places[displayIndex].description}</p>
            <button
              className="read-more-btn"
              onClick={() => handleReadMore(displayIndex)}
            >
              Read More
            </button>
            <button className="explore-btn">
              {places[displayIndex].buttonText}
            </button>
          </div>
  <div className="homepage" style={{ backgroundImage: `url(${bgImage})` }}>
  {/* Main homepage content */}
  <div className="chatbot"><Chatbot /></div>
  <main className="home-content">
    {/* Left Section */}
    <div className="homepage-left">
      <h2>Offbeat Places Of</h2>
      <h1>North Bengal</h1>
      <p>
        Explore breathtaking destinations around North Bengal with curated
        travel guides and adventures.
      </p>
      <button className="explore-btn">Book Your Journey</button>
    </div>

          <div className="homepage-cards">
            {reorderedPlaces.map((place, idx) => {
              const isAnimating = animatingCard === places.indexOf(place);
              return (
                <div
                  key={place.id}
                  ref={(el) => (cardRefs.current[idx] = el)}
                  className={`card ${isAnimating ? "active" : ""}`}
                  style={{
                    transform: `translateX(${idx * 220}px) scale(${idx === 0 ? 1 : 0.9})`,
                    opacity: idx > 2 ? 0 : 1,
                    zIndex: 10 - idx,
                  }}
                  onClick={() => handleCardClick(places.indexOf(place))}
                >
                  <img src={place.img} alt={place.title} />
                  <h3>{place.title}</h3>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
