import React from "react";
import { FaSearch, FaBell, FaGlobe, FaUserCircle } from "react-icons/fa";
import "./Navbar.css";
import { useAuth } from "../../Auth/AuthProvider";

export default function Navbar() {
  const { user } = useAuth();

  const username = user
    ? user.email || user.user_metadata?.full_name || "Profile"
    : "John Doe"; // fallback
  const profilePic = "https://via.placeholder.com/40"; // Replace with actual pic

  return (
    <nav className="navbar">
      {/* Left: Logo */}
      <div className="navbar-left">
        <h2 className="logo">TravelMate</h2>
      </div>

      {/* Middle: Search Bar */}
      <div className="navbar-search">
        <FaSearch className="search-icon" />
        <input type="text" placeholder="Search places, trips..." />
      </div>

      {/* Right: Icons + Username + Profile */}
      <div className="navbar-right">
        <FaGlobe className="icon" />
        <FaBell className="icon" />
        <FaUserCircle className="icon" />
        <span className="username">{username}</span>
        <img src={profilePic} alt="Profile" className="profile-pic" />
      </div>
    </nav>
  );
}
