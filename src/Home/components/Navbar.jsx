import React from "react";
import "./Navbar.css";
import { FaBell, FaGlobe, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="nav-left">
        <h2 className="logo">Logo/Name</h2>
      </div>
      <div className="nav-center">
        <input type="text" placeholder="Search Destination" />
      </div>
      <div className="nav-right">
        <FaGlobe className="icon" />
        <FaBell className="icon" />
        <FaUserCircle className="icon" />
        
      </div>
    </header>
  );
};

export default Navbar;
