import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import LandingPage from "./Landing/LandingPage";  
import HomePage from "./Home/HomePage";          
import Signin from "./Signin/LoginPage";             
import Signup from "./Signup/SignUp";             
import PlaceDetail from "./Home/PlaceDetail"; 
import SightseeingPage from "./Home/SightseeingPage"; 
import FoodsPage from "./Home/FoodsPage"; 
import HotelsPage from "./Home/HotelsPage"; 
import ContributionPage from "./Contribution/ContributionPage";
import Planner from "./Planner/Planner";
import PlannerResults from "./Planner/Results";

// Auth
import { AuthProvider } from './Auth/AuthProvider';
import ProtectedRoute from './Auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Home Page */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route path="/guest-home" element={<HomePage />} />

          {/* Place details */}
          <Route
            path="/home/place/:id"
            element={
              <ProtectedRoute>
                <PlaceDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home/place/:id/sightseeing"
            element={
              <ProtectedRoute>
                <SightseeingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home/place/:id/foods"
            element={
              <ProtectedRoute>
                <FoodsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home/place/:id/hotels"
            element={
              <ProtectedRoute>
                <HotelsPage />
              </ProtectedRoute>
            }
          />

          {/* Contribute */}
          <Route
            path="/contribute"
            element={
              <ProtectedRoute>
                <ContributionPage />
              </ProtectedRoute>
            }
          />

          {/* Planner */}
          <Route
            path="/planner"
            element={
              <ProtectedRoute>
                <Planner />
              </ProtectedRoute>
            }
          />
          <Route
            path="/planner/results"
            element={
              <ProtectedRoute>
                <PlannerResults />
              </ProtectedRoute>
            }
          />

          {/* Auth */}
          <Route path="/login" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />

          {/* 404 */}
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
    </AuthProvider>
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
