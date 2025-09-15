import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./Landing/LandingPage";  // ✅ Correct folder
import HomePage from "./Home/HomePage";           // ✅ Inside Home folder
import Signin from "./Signin/LoginPage";             // ✅ Inside Signin folder
import Signup from "./Signup/SignUp";             // ✅ Inside Signup folder


function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page at root */}
        <Route path="/" element={<LandingPage />} />

        {/* Home Page */}
        <Route path="/home" element={<HomePage />} />

        {/* Login (Signin) Page */}
        <Route path="/login" element={<Signin />} />

        {/* Signup Page */}
        <Route path="/signup" element={<Signup />} />

        {/* 404 Fallback */}
        <Route
          path="*"
          element={
            <div style={styles.notFound}>
              <h1>404 - Page Not Found</h1>
              <p>The page you are looking for does not exist.</p>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

const styles = {
  notFound: {
    textAlign: "center",
    marginTop: "100px",
    fontFamily: "Arial, sans-serif",
    color: "#333",
  },
};

export default App;
