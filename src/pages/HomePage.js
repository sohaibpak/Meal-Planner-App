import { Link } from "react-router-dom";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const HomePage = () => {
  const googleFormLink = "https://forms.gle/2DV27RDtgc85Pbpx8"; // Replace with your Google Form link

  const handleFormRedirect = () => {
    // Navigate to Google Form in a new tab
    window.open(googleFormLink, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="container text-center mt-5">
      {/* Header Section */}
      <header className="mb-4 header">
        <h1 className="display-4">Welcome to Meal Planner</h1>
        <p className="lead">
          Plan your weekly meals effortlessly while considering everyone's
          dietary preferences.
        </p>
      </header>

      {/* Call-to-Action Section */}
      <div>
        <h2 className="mb-3">Get Started</h2>
        <p className="mb-4">
          Click the button below to share your preferences and receive a
          personalized weekly meal plan.
        </p>
        <button
          style={{
            backgroundColor: "#133e87",
            border: "none",
            padding: "12px 24px",
            marginTop: "10px",
            borderRadius: "5px",
          }}
          className="btn btn-primary"
          onClick={handleFormRedirect}
        >
          <Link
            style={{
              backgroundColor: "#133e87",
              color: "white",
              border: "none",
              textDecoration: "none",
              fontSize: "1.2rem",
              borderRadius: "5px",
            }}
            to="/loginform"
          >
            Fill Out Preferences Form
          </Link>
        </button>
      </div>

      {/* Footer Section */}
      <footer className="mt-5">
        <p className="text-muted">
          &copy; 2025 Meal Planner. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
