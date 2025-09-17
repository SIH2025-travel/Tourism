import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa"; // For Read More
import { FaPlaneDeparture } from "react-icons/fa"; // For Book Trip
import "./HomePage.css";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar"; 
import Chatbot from "../Chatbot/Chatbot";

import bgImage from "../assets/HomePageBG.jpg";
import sittongImg from "../assets/Sittong.jpg";
import lepchajagatImg from "../assets/Lepchajagat.jpg";
import tinchuleyImg from "../assets/Tinchuley.jpg";
import lamahattaImg from "../assets/Lamahatta.jpg";
import takdahImg from "../assets/Takdah.jpg";

export const places = [
  { id: 1, title: "Sittong", img: sittongImg, subtitle: "The Orange Valley", description: "Famous for its orange orchards and serene village life amidst nature.", buttonText: "Book Your Trip to Sittong", readMore: "Sittong is known as the orange valley of North Bengal. It is a cluster of villages where you can experience rural charm, visit orange orchards, and stay in homestays while enjoying nature." },
  { id: 2, title: "Lepchajagat", img: lepchajagatImg, subtitle: "Whispering Pines", description: "A quiet retreat with pine forests and stunning Kanchenjunga views.", buttonText: "Book Your Trip to Lepchajagat", readMore: "Lepchajagat is a serene hamlet offering breathtaking views of Kanchenjunga, surrounded by thick forests of rhododendron, oak, and pine. It's perfect for bird watching and peaceful retreats." },
  { id: 3, title: "Tinchuley", img: tinchuleyImg, subtitle: "The Balcony of the Hills", description: "A peaceful hamlet offering tea gardens and riverside walks.", buttonText: "Book Your Trip to Tinchuley", readMore: "Tinchuley is a small mountain village known for its eco-tourism. It offers panoramic views of the Himalayas, lush tea gardens, and beautiful sunrise points." },
  { id: 4, title: "Lamahatta", img: lamahattaImg, subtitle: "Eco Village of Tranquility", description: "Perfect for nature lovers, known for its eco-park and pine forest trails.", buttonText: "Book Your Trip to Lamahatta", readMore: "Lamahatta is an eco-tourism village surrounded by pine forests and prayer flags. Its eco-park and watchtower provide a peaceful escape amidst nature." },
  { id: 5, title: "Takdah", img: takdahImg, subtitle: "Colonial Charm", description: "Once a British cantonment, now known for orchid nurseries and tea estates.", buttonText: "Book Your Trip to Takdah", readMore: "Takdah is famous for its old British bungalows, scenic orchid centers, and vast tea estates. A blend of colonial history and natural beauty." }
];

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const [animatingCard, setAnimatingCard] = useState(null);
  const [wishlist, setWishlist] = useState([]); // ✅ Wishlist state
  const [selectedDurations, setSelectedDurations] = useState([]); // multiple filter
  const [tours, setTours] = useState([
    { id: 1, img: sittongImg, title: "Sittong Adventure", desc: "3 Days / 2 Nights - Explore orange orchards and nature trails.", duration: "3d2n" },
    { id: 2, img: lepchajagatImg, title: "Lepchajagat Escape", desc: "2 Days / 1 Night - Serene pine forests and Kanchenjunga views.", duration: "2d1n" },
    { id: 3, img: tinchuleyImg, title: "Tinchuley Retreat", desc: "4 Days / 3 Nights - Tea gardens, riverside walks, and sunrise points.", duration: "4d3n" },
    { id: 4, img: takdahImg, title: "Takdah Delight", desc: "3 Days / 2 Nights - Colonial charm with orchid nurseries and tea estates.", duration: "3d2n" }
  ]);

const handleDurationChange = (duration) => {
  setSelectedDurations((prev) =>
    prev.includes(duration)
      ? prev.filter((d) => d !== duration) // remove if already selected
      : [...prev, duration] // add new
  );
};
const moveCarousel = (direction) => {
  setTours((prev) => {
    if (direction === "right") {
      const [first, ...rest] = prev;
      return [...rest, first]; // move first to last
    } else {
      const last = prev[prev.length - 1];
      return [last, ...prev.slice(0, -1)]; // move last to front
    }
  });
};

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
      navigate(`/home/place/${places[idx].id}`);
    }
  };

  const scrollBooking = (scrollOffset) => {
    const container = document.getElementById("booking-cards");
    if (container) {
      container.scrollBy({ left: scrollOffset, behavior: "smooth" });
    }
  };

  // ✅ Wishlist toggle
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
        style={{ backgroundImage: `url(${places[activeIndex]?.img || bgImage})` }}
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
                <button className="read-more-btn" onClick={() => handleReadMore(displayIndex)}>
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
          <div className="chatbot"><Chatbot /></div>
        </div>

      </div>

     <section className="booking-section">
  <h2>Explore Tour Packages</h2>

  {/* Filter with Checkboxes */}
  <div className="booking-filter">
    <label>
      <input
        type="checkbox"
        checked={selectedDurations.includes("2d1n")}
        onChange={() => handleDurationChange("2d1n")}
      />
      2D / 1N
    </label>
    <label>
      <input
        type="checkbox"
        checked={selectedDurations.includes("3d2n")}
        onChange={() => handleDurationChange("3d2n")}
      />
      3D / 2N
    </label>
    <label>
      <input
        type="checkbox"
        checked={selectedDurations.includes("4d3n")}
        onChange={() => handleDurationChange("4d3n")}
      />
      4D / 3N
    </label>
  </div>

  {/* Carousel */}
  <div className="booking-carousel">
    <button className="carousel-btn left" onClick={() => moveCarousel("left")}>‹</button>
    <div className="booking-cards" id="booking-cards">
      {tours
        .filter((tour) =>
          selectedDurations.length === 0 || selectedDurations.includes(tour.duration)
        )
        .map((tour) => (
          <div key={tour.id} className="booking-card">
            <div className="image-container">
              <img src={tour.img} alt={tour.title} />
              <button
                className="wishlist-btn"
                onClick={() => toggleWishlist(tour.id)}
              >
                {wishlist.includes(tour.id) ? (
                  <FaHeart color="#ff6b35" size={24} />
                ) : (
                  <FaRegHeart color="#fff" size={24} />
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
    <button className="carousel-btn right" onClick={() => moveCarousel("right")}>›</button>
  </div>
</section>

    </>
  );
}
