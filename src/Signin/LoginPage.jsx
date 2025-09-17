// LoginPage.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import "./LoginPage.css";
import bgimg from '../assets/BG.jpg';
import { supabase, isSupabaseConfigured } from "../Supabase/Supabase";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data }) => {
        if (data?.session?.user) navigate('/home');
      });
    }
  }, [navigate]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) {
        alert(error.message);
      } else {
        navigate('/home');
      }
    } else {
      // fallback: guest login
      setLoading(false);
      navigate('/home');
    }
  };

  return (
    <div className="login-container">
      <div className="bgimg"><img src={bgimg} alt="bgimg" /></div>
      <Link to="/" className="back-link">← Back to Home</Link>

      <div className="login-box">
        <h2>Welcome Back</h2>
        <p className="subtitle1">Sign in to continue your journey</p>

        <form onSubmit={handleSignIn}>
          <label>Email</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email" 
          />

          <label>Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <div className="forgot-password">
            <a href="#">Forgot Password?</a>
          </div>

          <button disabled={loading} type="submit" className="signin-btn">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="signup-text">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>

        <button className="guest-btn" onClick={() => navigate('/home')}>
          Continue as Guest
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
