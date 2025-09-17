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

import { useAuth } from "../../Auth/AuthProvider";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { FaCamera } from "react-icons/fa";


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const ok = await signOut();
    if (ok) {
      setIsOpen(false);
      navigate('/');
    } else {
      alert('Logout failed. Try again.');
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? "closed" : "open"}`}>
        {/* Profile Section */}
        <div className="profile-section">
          <FaUserCircle className="profile-pic" />
          <h3 className="user-name">{user?.user_metadata?.full_name || user?.email || 'User Name'}</h3>
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

              <Link to="/contribute" className="menu-item">
          <FaCamera className="icon" /> Contribute
        </Link>
          <hr />
          <a href="#" className="menu-item">
            <FaCog className="icon" /> Settings
          </a>
          <a href="#" className="menu-item">
            <FaQuestionCircle className="icon" /> Help & Support
          </a>
          <button type="button" className="menu-item logout" onClick={handleLogout}>
            <FaSignOutAlt className="icon" /> Logout
          </button>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
