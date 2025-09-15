import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import heroImage from "../assets/LandingPageBG.jpeg";
import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";

export default function LandingPage() {
  const navigate = useNavigate();
  const offerHeadingRef = useRef(null);
  const [headingVisible, setHeadingVisible] = useState(false);

  const handleStartJourney = () => {
    navigate("/login");
  };

  // Intersection Observer for scroll-up animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHeadingVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (offerHeadingRef.current) {
      observer.observe(offerHeadingRef.current);
    }

    return () => {
      if (offerHeadingRef.current) observer.unobserve(offerHeadingRef.current);
    };
  }, []);

  return (
    <div className="landingpage">
      {/* Hero Section */}
      <section
        className="landingpage-hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="landingpage-overlay"></div>
        <div className="landingpage-hero-content">
          <h1>Discover North Bengal</h1>
          <p className="landingpage-subtitle">
            Your ultimate guide to the hidden gems of the Eastern Himalayas
          </p>
          <p className="landingpage-description">
            Explore breathtaking hill stations, authentic local cuisine, cozy
            accommodations, and offbeat destinations with our comprehensive
            travel companion.
          </p>
          <button className="landingpage-btn" onClick={handleStartJourney}>
            Start Your Journey
          </button>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="landingpage-offer">
        <h2
          ref={offerHeadingRef}
          className={`blur-heading ${headingVisible ? "visible" : ""}`}
        >
          What We Offer
        </h2>
        <div className="landingpage-offer-grid">
          <div className="landingpage-offer-card">
            <div className="landingpage-icon">📍</div>
            <h3>Interactive Maps</h3>
            <p>
              Navigate through North Bengal with our detailed, clickable maps
              showing all major attractions and hidden spots.
            </p>
          </div>

          <div className="landingpage-offer-card">
            <div className="landingpage-icon">⛰️</div>
            <h3>Tour Packages</h3>
            <p>
              Curated tour packages for every budget, from luxury retreats to
              budget-friendly adventures.
            </p>
          </div>

          <div className="landingpage-offer-card">
            <div className="landingpage-icon">☕</div>
            <h3>Local Cuisine</h3>
            <p>
              Discover authentic restaurants, street food, and local delicacies
              that define North Bengal's rich culinary heritage.
            </p>
          </div>

          <div className="landingpage-offer-card">
            <div className="landingpage-icon">📷</div>
            <h3>Cost Estimation</h3>
            <p>
              Plan your budget effectively with our detailed cost breakdowns for
              accommodations, food, and activities.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="landingpage-footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} North Bengal Explorer. All rights reserved.</p>
          <div className="footer-socials">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="mailto:contact@northbengalexplorer.com">
              <FaEnvelope />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
