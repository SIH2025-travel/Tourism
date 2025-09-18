// src/Home/HomePage.jsx
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./HomePage.css";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Chatbot from "../Chatbot/Chatbot";

import bgImage from "../assets/HomePageBG.jpg";
import sittongImg from "../assets/Sittong.jpg";
import lepchajagatImg from "../assets/Lepchajagat.jpg";
import tinchuleyImg from "../assets/Tinchuley.jpg";
import takdahImg from "../assets/Takdah.jpg";

// ✅ Export places so PlaceDetail can import them
export const places = [
  {
    id: 1,
    title: "Sittong",
    subtitle: "The Orange Valley",
    description: "Famous for its orange orchards and serene village life.",
    img: sittongImg,
    buttonText: "Book Your Trip to Sittong",
    more: "Sittong is known as the orange valley of North Bengal..."
  },
  {
    id: 2,
    title: "Lepchajagat",
    subtitle: "Serenity in Pines",
    description: "A quiet hamlet with mesmerizing Kanchenjunga views.",
    img: lepchajagatImg,
    buttonText: "Book Your Trip to Lepchajagat",
    more: "Lepchajagat is located close to Darjeeling..."
  },
  {
    id: 3,
    title: "Tinchuley",
    subtitle: "Tea Gardens & Sunrise",
    description: "Charming village with tea gardens and riverside walks.",
    img: tinchuleyImg,
    buttonText: "Book Your Trip to Tinchuley",
    more: "Tinchuley is popular for its natural beauty..."
  },
  {
    id: 4,
    title: "Takdah",
    subtitle: "Colonial Charm",
    description: "Known for orchid nurseries and tea estates.",
    img: takdahImg,
    buttonText: "Book Your Trip to Takdah",
    more: "Takdah was once a British cantonment area..."
  }
];

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [animatingCard, setAnimatingCard] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [filter, setFilter] = useState("all");

  // Tours (linked to places)
  const tours = [
    {
      id: 1,
      img: sittongImg,
      title: "Sittong Adventure",
      desc: "3 Days / 2 Nights - Explore orange orchards and nature trails.",
      duration: "3d2n"
    },
    {
      id: 2,
      img: lepchajagatImg,
      title: "Lepchajagat Escape",
      desc: "2 Days / 1 Night - Serene pine forests and Kanchenjunga views.",
      duration: "2d1n"
    },
    {
      id: 3,
      img: tinchuleyImg,
      title: "Tinchuley Retreat",
      desc: "4 Days / 3 Nights - Tea gardens, riverside walks, and sunrise points.",
      duration: "4d3n"
    },
    {
      id: 4,
      img: takdahImg,
      title: "Takdah Delight",
      desc: "3 Days / 2 Nights - Colonial charm with orchid nurseries and tea estates.",
      duration: "3d2n"
    }
  ];

  // ✅ Filtering tours
  const filteredTours =
    filter === "all"
      ? tours
      : tours.filter((t) => {
          if (filter === "2") return t.duration === "2d1n";
          if (filter === "3") return t.duration === "3d2n";
          if (filter === "4") return t.duration === "4d3n";
          return true;
        });

  const navigate = useNavigate();
  const cardRefs = useRef([]);

  const reorderedPlaces = [
    ...places.slice(activeIndex + 1),
    ...places.slice(0, activeIndex),
  ];

  const handleCardClick = (newIndex) => {
    setAnimatingCard(newIndex);
    setTimeout(() => {
      setActiveIndex(newIndex);
      setDisplayIndex(newIndex);
      setAnimatingCard(null);
    }, 600);
  };

  const handleReadMore = (idx) => {
    navigate(`/home/place/${places[idx].id}`);
  };

  const scrollBooking = (scrollOffset) => {
    const container = document.getElementById("booking-cards");
    if (container) {
      container.scrollBy({ left: scrollOffset, behavior: "smooth" });
    }
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
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
            <div className="homepage-left">
              <h2>{places[displayIndex].subtitle}</h2>
              <h1>{places[displayIndex].title}</h1>
              <p>{places[displayIndex].description}</p>

              <div className="button-group">
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

      {/* Booking Section */}
      <section className="booking-section">
        <h2>Explore Tour Packages</h2>

        {/* Filter Bar */}
        <div className="filter-bar">
          <label htmlFor="duration">Filter by Duration:</label>
          <select
            id="duration"
            className="filter-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="2">2 Days / 1 Night</option>
            <option value="3">3 Days / 2 Nights</option>
            <option value="4">4 Days / 3 Nights</option>
          </select>
        </div>

        <div className="booking-carousel">
          <button
            className="carousel-btn left"
            onClick={() => scrollBooking(-300)}
          >
            ‹
          </button>
          <div className="booking-cards" id="booking-cards">
            {filteredTours.map((tour) => (
              <div key={tour.id} className="booking-card">
                <div className="image-container">
                  <img src={tour.img} alt={tour.title} />
                  <button
                    className="wishlist-btn"
                    onClick={() => toggleWishlist(tour.id)}
                  >
                    {wishlist.includes(tour.id) ? (
                      <FaHeart color="red" />
                    ) : (
                      <FaRegHeart color="black" />
                    )}
                  </button>
                </div>
                <h3>{tour.title}</h3>
                <p>{tour.desc}</p>
                <button
                  className="book-now-btn"
                  onClick={() => alert(`Booking for ${tour.title} clicked`)}
                >
                  Book Now
                </button>
              </div>
            ))}
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
