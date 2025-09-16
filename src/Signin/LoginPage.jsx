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

  // if user already authenticated, redirect to home
  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data }) => {
        if (data?.session?.user) navigate('/home');
      });
    }
  }, []);

  return (
    <div className="login-container">
      <div className="bgimg"><img src={bgimg} alt="bgimg" /></div>
      <Link to="/" className="back-link">← Back to Home</Link>
      <div className="login-box">
        <h2>Welcome Back</h2>
        <p className="subtitle1">Sign in to continue your journey</p>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            if (isSupabaseConfigured && supabase) {
              const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
              });
              setLoading(false);
              if (error) {
                alert(error.message);
              } else {
                navigate('/home');
              }
            } else {
              // fallback: guest sign-in (no persistence)
              setLoading(false);
              navigate('/home');
            }
          }}
        >
          <label>Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Enter your email" />

          <label>Password</label>
          <div className="password-wrapper">
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
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