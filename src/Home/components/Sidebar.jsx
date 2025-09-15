import React, { useState } from "react";
import {
  FaUserCircle,
  FaPen,
  FaPlane,
  FaHeart,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
  FaTachometerAlt,
  FaBars,
  FaTimes
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* Toggle Button */}
      <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
        {/* Profile Section */}
        <div className="profile-section">
          <FaUserCircle className="profile-pic" />
          <h3 className="user-name">User Name</h3>
          <button className="edit-btn">
            <FaPen className="icon" /> Edit Profile
          </button>
        </div>

        {/* Menu Section */}
        <nav className="menu">
          <a href="#" className="menu-item">
            <FaTachometerAlt className="icon" /> Dashboard
          </a>
          <a href="#" className="menu-item">
            <FaPlane className="icon" /> My Trip
          </a>
          <a href="#" className="menu-item">
            <FaHeart className="icon" /> Wishlist
          </a>
          <hr />
          <a href="#" className="menu-item">
            <FaCog className="icon" /> Settings
          </a>
          <a href="#" className="menu-item">
            <FaQuestionCircle className="icon" /> Help & Support
          </a>
          <a href="#" className="menu-item logout">
            <FaSignOutAlt className="icon" /> Logout
          </a>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
