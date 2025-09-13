// LoginPage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import "../Styles/LoginPage.css";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-container">
      <div className="back-link">← Back to Home</div>
      <div className="login-box">
        <h2>Welcome Back</h2>
        <p className="subtitle">Sign in to continue your journey</p>

        <form>
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />

          <label>Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <button type="submit" className="signin-btn">
            Sign In
          </button>
        </form>

        <p className="signup-text">
          Don’t have an account? <Link to="/signup">Sign up</Link> {/* Navigation Link */}
        </p>

        <button className="guest-btn">Continue as Guest</button>
      </div>
    </div>
  );
}

export default LoginPage;
