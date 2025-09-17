import React from "react";
import "./Navbar.css";
import { FaBell, FaGlobe, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../Auth/AuthProvider";

const Navbar = () => {
  const { user } = useAuth();

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
        {user ? (
          <span className="profile-text">
            {user.email || user.user_metadata?.full_name || "Profile"}
          </span>
        ) : null}
      </div>
    </header>
  );
};

export default Navbar;
