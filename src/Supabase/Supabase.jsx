// SupabasePage.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import Chatbot from "../Chatbot/Chatbot"; // ✅ Import chatbot

export default function SupabasePage() {
  const [user, setUser] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserAndHotels = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      const { data, error } = await supabase.from("hotels").select("*");
      if (!error) setHotels(data);
      setLoading(false);
    };
    getUserAndHotels();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/signin");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Supabase Dashboard</h1>
      {user ? (
        <div>
          <p>Welcome, {user.user_metadata?.name || user.email}</p>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      ) : (
        <p>
          You’re not logged in.{" "}
          <button onClick={() => navigate("/signin")}>Sign In</button>
        </p>
      )}

      <h2 style={{ marginTop: "30px" }}>Hotel Listings</h2>
      {hotels.length > 0 ? (
        <ul>
          {hotels.map((hotel) => (
            <li key={hotel.id}>
              <strong>{hotel.name}</strong> — {hotel.location} — ₹{hotel.price}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hotels available.</p>
      )}

      {/* ✅ Floating chatbot on this page */}
      <Chatbot user={user} hotels={hotels} />
    </div>
  );
}
