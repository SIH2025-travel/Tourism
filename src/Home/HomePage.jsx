import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Chatbot from "../Chatbot/Chatbot";

import bgImage from "../assets/HomePageBG.jpg";
import sittongImg from "../assets/Sittong.jpg";
import lepchajagatImg from "../assets/Lepchajagat.jpg";
import tinchuleyImg from "../assets/Tinchuley.jpg";
import lamahattaImg from "../assets/Lamahatta.jpg";
import takdahImg from "../assets/Takdah.jpg";
import "./HomePage.css";

export const places = [
  {
    id: 1,
    title: "Sittong",
    img: sittongImg,
    subtitle: "The Orange Valley",
    description: "Famous for its orange orchards and serene village life.",
    buttonText: "Book Your Trip to Sittong",
    readMore:
      "Sittong is known as the orange valley of North Bengal. Experience rural charm, visit orange orchards, and enjoy nature.",
  },
  {
    id: 2,
    title: "Lepchajagat",
    img: lepchajagatImg,
    subtitle: "Whispering Pines",
    description: "A quiet retreat with pine forests and Kanchenjunga views.",
    buttonText: "Book Your Trip to Lepchajagat",
    readMore:
      "Lepchajagat offers breathtaking views of Kanchenjunga, with thick forests perfect for bird watching and peace.",
  },
  {
    id: 3,
    title: "Tinchuley",
    img: tinchuleyImg,
    subtitle: "The Balcony of the Hills",
    description: "Peaceful hamlet offering tea gardens and riverside walks.",
    buttonText: "Book Your Trip to Tinchuley",
    readMore:
      "Tinchuley is known for eco-tourism, panoramic Himalayan views, lush tea gardens, and beautiful sunrise points.",
  },
  {
    id: 4,
    title: "Lamahatta",
    img: lamahattaImg,
    subtitle: "Eco Village of Tranquility",
    description: "Perfect for nature lovers, eco-park and pine forest trails.",
    buttonText: "Book Your Trip to Lamahatta",
    readMore:
      "Lamahatta is an eco-tourism village with pine forests, prayer flags, and a peaceful eco-park.",
  },
  {
    id: 5,
    title: "Takdah",
    img: takdahImg,
    subtitle: "Colonial Charm",
    description: "British cantonment town with orchids and tea estates.",
    buttonText: "Book Your Trip to Takdah",
    readMore:
      "Takdah is famous for colonial bungalows, orchid centers, and tea estates — a blend of history & nature.",
  },
];

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatingCard, setAnimatingCard] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [filter, setFilter] = useState("all");

  const navigate = useNavigate();

  const tours = [
    {
      id: 1,
      img: sittongImg,
      title: "Sittong Adventure",
      desc: "3 Days / 2 Nights - Explore orange orchards and trails.",
      duration: "3d2n",
    },
    {
      id: 2,
      img: lepchajagatImg,
      title: "Lepchajagat Escape",
      desc: "2 Days / 1 Night - Serene pine forests and Kanchenjunga views.",
      duration: "2d1n",
    },
    {
      id: 3,
      img: tinchuleyImg,
      title: "Tinchuley Retreat",
      desc: "4 Days / 3 Nights - Tea gardens, riverside walks, sunrise points.",
      duration: "4d3n",
    },
    {
      id: 4,
      img: takdahImg,
      title: "Takdah Delight",
      desc: "3 Days / 2 Nights - Colonial charm with orchids and tea estates.",
      duration: "3d2n",
    },
  ];

  const filteredTours =
    filter === "all"
      ? tours
      : tours.filter((t) => {
        if (filter === "2") return t.duration === "2d1n";
        if (filter === "3") return t.duration === "3d2n";
        if (filter === "4") return t.duration === "4d3n";
        return true;
      });

  // Always show the active place first, then the rest
  const reorderedPlaces = [
    places[activeIndex],
    ...places.filter((_, idx) => idx !== activeIndex),
  ];

  const handleCardClick = (newIndex) => {
    if (newIndex === activeIndex) return;
    setAnimatingCard(newIndex);
    setTimeout(() => {
      setActiveIndex(newIndex);
      setAnimatingCard(null);
    }, 800);
  };

  const handleReadMore = (idx) => {
    navigate(`/home/place/${places[idx].id}`);
  };

  const scrollBooking = (offset) => {
    const container = document.getElementById("booking-cards");
    if (container) {
      container.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const toggleWishlist = (id, e) => {
    e.stopPropagation();
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
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
              <h2>{places[activeIndex].subtitle}</h2>
              <h1>{places[activeIndex].title}</h1>
              <p>{places[activeIndex].description}</p>

              <div className="button-group">
                <button
                  className="read-more-btn"
                  onClick={() => handleReadMore(activeIndex)}
                >
                  Read More
                </button>
                <button className="explore-btn">
                  {places[activeIndex].buttonText}
                </button>
              </div>
            </div>

            <div className="homepage-cards">
              {reorderedPlaces.map((place, idx) => (
                <div
                  key={place.id}
                  className={`card ${animatingCard === idx ? "active" : ""}`}
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
              ))}
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
          <button className="carousel-btn left" onClick={() => scrollBooking(-300)}>
            ‹
          </button>
          <div className="booking-cards" id="booking-cards">
            {filteredTours.map((tour) => (
              <div key={tour.id} className="booking-card">
                <div className="image-container">
                  <img src={tour.img} alt={tour.title} />
                  <button
                    className="wishlist-btn"
                    onClick={(e) => toggleWishlist(tour.id, e)}
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
          <button className="carousel-btn right" onClick={() => scrollBooking(300)}>
            ›
          </button>
        </div>
      </section>
    </>
  );
}
