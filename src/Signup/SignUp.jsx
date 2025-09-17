// SignUp.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link
import "./SignUp.css";
import bgimg from '../assets/BG.jpg';
import { supabase, isSupabaseConfigured } from "../Supabase/Supabase";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
        <div className="login-box1">
          <h2>Create Account</h2>
        </div>
        <p className="subtitle">Sign up to start exploring North Bengal</p>

        <form onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          if (isSupabaseConfigured && supabase) {
            const { data, error } = await supabase.auth.signUp({
              email,
              password,
            });
            setLoading(false);
            if (error) return alert(error.message);
            // optionally update profile with name
            navigate('/home');
          } else {
            setLoading(false);
            // fallback: guest continue
            navigate('/home');
          }
        }}>
          <label>Name</label>
          <input value={name} onChange={e => setName(e.target.value)} type="name" placeholder="Enter your name" />
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

          <button disabled={loading} type="submit" className="signup-btn">
            {loading ? 'Creating...' : 'Sign Up'}
          </button>
        </form>

        <p className="signin-text">
          Already have an account? <Link to="/login">Sign in</Link> {/* Navigation Link */}
        </p>

        <button className="guest-btn">
          <Link to="/home">
            Continue as Guest
          </Link>
        </button>
        <button className="guest-btn" onClick={() => navigate('/home')}>
          Continue as Guest
        </button>
      </div>
    </div>
  );
}

export default SignUp;