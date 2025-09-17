// src/Home/HomePage.jsx
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Chatbot from "../Chatbot/Chatbot";

import bgImage from "../assets/HomePageBG.jpg";
import sittongImg from "../assets/Sittong.jpg";
import lepchajagatImg from "../assets/Lepchajagat.jpg";
import tinchuleyImg from "../assets/Tinchuley.jpg";
import takdahImg from "../assets/Takdah.jpg";

import { places } from "./places"; // ✅ moved to separate file

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
    setTimeout(() => setFade(true), 400);
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

  const scrollBooking = (scrollOffset) => {
    const container = document.getElementById("booking-cards");
    if (container) {
      container.scrollBy({ left: scrollOffset, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div
        className="homepage"
        style={{
          backgroundImage: `url(${places[activeIndex]?.img || bgImage})`,
        }}
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

            <div className="homepage-cards">
              {reorderedPlaces.map((place, idx) => {
                const isAnimating = animatingCard === places.indexOf(place);
                return (
                  <div
                    key={place.id}
                    ref={(el) => (cardRefs.current[idx] = el)}
                    className={`card ${isAnimating ? "active" : ""}`}
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
                );
              })}
            </div>
          </main>

          <div className="chatbot">
            <Chatbot />
          </div>
        </div>
      </div>

      {/* Booking Section with Carousel */}
      <section className="booking-section">
        <h2>Explore Tour Packages</h2>
        <div className="booking-carousel">
          <button
            className="carousel-btn left"
            onClick={() => scrollBooking(-300)}
          >
            ‹
          </button>

          <div className="booking-cards" id="booking-cards">
            <div className="booking-card">
              <img src={sittongImg} alt="Sittong Tour" />
              <h3>Sittong Adventure</h3>
              <p>3 Days / 2 Nights - Explore orange orchards and nature trails.</p>
              <button className="book-now-btn">Book Now</button>
            </div>

            <div className="booking-card">
              <img src={lepchajagatImg} alt="Lepchajagat Tour" />
              <h3>Lepchajagat Escape</h3>
              <p>2 Days / 1 Night - Serene pine forests and Kanchenjunga views.</p>
              <button className="book-now-btn">Book Now</button>
            </div>

            <div className="booking-card">
              <img src={tinchuleyImg} alt="Tinchuley Tour" />
              <h3>Tinchuley Retreat</h3>
              <p>
                4 Days / 3 Nights - Tea gardens, riverside walks, and sunrise
                points.
              </p>
              <button className="book-now-btn">Book Now</button>
            </div>

            <div className="booking-card">
              <img src={takdahImg} alt="Takdah Tour" />
              <h3>Takdah Delight</h3>
              <p>
                3 Days / 2 Nights - Colonial charm with orchids and tea estates.
              </p>
              <button className="book-now-btn">Book Now</button>
            </div>
          </div>

          <button
            className="carousel-btn right"
            onClick={() => scrollBooking(300)}
          >
            ›
          </button>
        </div>
      </section>
    </>
  );
}
