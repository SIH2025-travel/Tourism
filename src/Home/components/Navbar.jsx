import React from "react";
import { FaSearch, FaBell, FaGlobe, FaUserCircle } from "react-icons/fa";
import "./Navbar.css";
import { useAuth } from "../../Auth/AuthProvider";
import logo from "../../assets/Logo.png";


export default function Navbar() {
  const { user } = useAuth();

  const username = user
    ? user.email || user.user_metadata?.full_name || "Profile"
    : "John Doe"; // fallback
  const profilePic = "https://via.placeholder.com/40"; // Replace with actual pic

  return (
    <nav className="navbar">
       {/* Left: Logo Image */}
       <div className="navbar-left">
        <img src={logo} alt="Logo" className="logo-img" />
      </div>

      {/* Middle: Search Bar */}
<div className="navbar-search">
  <div className="search-container">
    <FaSearch className="search-icon" />
    <input type="text" placeholder="Search for places, trips, or packages..." />
  </div>
</div>


      {/* Right: Icons + Username + Profile */}
       {/* Right: User + Username + Icons */}
      <div className="navbar-right">
         <FaBell className="icon" />
         <FaGlobe className="icon" />
           <span className="username">{username}</span>
        <FaUserCircle className="user-icon" />
      
        
       
      </div>
    </nav>
  );
}
