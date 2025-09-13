// SignUp.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import "../styles/SignUp.css";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-container">
      <div className="back-link">← Back to Home</div>
      <div className="login-box">
        <div className="login-box1">
        <h2>Create Account</h2>
        </div>
        <p className="subtitle">Sign up to start exploring North Bengal</p>

        <form>
          <label>Name</label>
          <input type="name" placeholder="Enter your name" />
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
            Sign Up
          </button>
        </form>

        <p className="signin-text">
          Already have an account? <Link to="/">sign in</Link> {/* Navigation Link */}
        </p>

        <button className="guest-btn">Continue as Guest</button>
      </div>
    </div>
  );
}

export default SignUp;
