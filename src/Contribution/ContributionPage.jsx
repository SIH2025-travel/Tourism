import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Home/components/Navbar";
import "./ContributionPage.css";

export default function ContributionPage() {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    image: null,
    imagePreview: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setFormData({
        ...formData,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted data:", formData);
    alert("Thank you for your contribution! (Backend integration needed)");
    setFormData({
      name: "",
      location: "",
      description: "",
      image: null,
      imagePreview: "",
    });
  };

  const handleBackHome = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <div className="contribution-page">
      <Navbar />

      {/* ✅ Floating Back to Home Button */}
      <button className="back-home-btn" onClick={handleBackHome}>
        ← Back to Home
      </button>

      {/* ✅ Page Heading (outside the form) */}
      <h1 className="page-heading">✈️ Contribute a New Place</h1>

      <div className="contribution-container">
        <form className="contribution-form" onSubmit={handleSubmit}>
          <h1>Contribution Form</h1> {/* ✅ Small title inside form */}

          <label>Place Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter place name"
          />

          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            placeholder="Enter location"
          />

          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Write a short description..."
          ></textarea>

          <label>Upload Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />

          {formData.imagePreview && (
            <div className="image-preview">
              <img src={formData.imagePreview} alt="Preview" />
            </div>
          )}

          <button type="submit" className="submit-btn">
            Submit Contribution
          </button>
        </form>
      </div>
    </div>
  );
}
