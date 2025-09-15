import React from "react";
import "./HomePage.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const HomePage = () => {
  return (
    <div className="homepage">
      <Navbar />
      <div className="home-body">
        <Sidebar />
        <main className="home-content">
          <h1>Welcome to Home Page</h1>
          <p>This is your main content area.</p>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
