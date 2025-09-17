import React from "react";
import { FaSearch } from "react-icons/fa";
import "./Navbar.css";

export default function Navbar() {
  const username = "John Doe"; // 🔹 Replace with dynamic username if available
  const profilePic =
    "https://via.placeholder.com/40"; // 🔹 Replace with actual profile picture

  return (
    <nav className="navbar">
      {/* Left: Logo or Site Name */}
      <div className="navbar-left">
        <h2 className="logo">TravelMate</h2>
      </div>

      {/* Middle: Search bar */}
      <div className="navbar-search">
        <FaSearch className="search-icon" />
        <input type="text" placeholder="Search places, trips..." />
      </div>

      {/* Right: Username + Profile Pic */}
      <div className="navbar-right">
        <span className="username">{username}</span>
        <img src={profilePic} alt="Profile" className="profile-pic" />
      </div>
    </nav>
  );
}
