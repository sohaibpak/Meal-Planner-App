import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginForm = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [mealPlan, setMealPlan] = useState("");
  const [loadingMealPlan, setLoadingMealPlan] = useState(false);
  const [error, setError] = useState("");

  // Fetch data from Google Sheets
  useEffect(() => {
    const fetchData = async () => {
      const API_KEY = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY; // Environment variable for API key
      const SPREADSHEET_ID = "11Ph33EX6cUXEmAnOB5o9IZyYj4FPiuitY4iEQaNIvMc";
      const RANGE = "Meal Planner Submissions";

      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;

      try {
        const response = await axios.get(url);
        setData(response.data.values || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data from Google Sheets.");
      }
    };

    fetchData();
  }, []);

  // Function to get the meal plan using OpenAI API
  const getMealPlan = async (dietaryRestrictions) => {
    try {
      setLoadingMealPlan(true);

      const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY; // Environment variable for API key

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are an AI assistant specializing in meal planning.",
            },
            {
              role: "user",
              content: `Create a detailed 7-day meal plan for a family of 4. Dietary restrictions: ${dietaryRestrictions}. Provide breakfast, lunch, and dinner options for each day.`,
            },
          ],
          max_tokens: 1000,
        },
        {
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`, // Correct API key usage
            "Content-Type": "application/json",
          },
        }
      );

      const generatedMealPlan =
        response.data.choices[0]?.message?.content?.trim(); // Extract the actual meal plan content

      if (generatedMealPlan) {
        setMealPlan(generatedMealPlan);
      } else {
        setError("No meal plan generated. Please refine your dietary input.");
      }
    } catch (error) {
      console.error(
        "Error fetching meal plan:",
        error.response?.data || error.message
      );
      setError(
        "Could not generate meal plan. Please check your API key or try again later."
      );
    } finally {
      setLoadingMealPlan(false);
    }
  };

  // Handle login functionality
  const handleLogin = async () => {
    if (!name || !email) {
      alert("Please enter both name and email.");
      return;
    }

    const user = data
      .slice(1)
      .find(
        (row) =>
          row[1]?.toLowerCase().trim() === name.toLowerCase().trim() &&
          row[2]?.toLowerCase().trim() === email.toLowerCase().trim()
      );

    if (user) {
      setLoggedInUser(user);

      const dietaryRestrictions = user[3]?.trim() || "No restrictions";
      getMealPlan(dietaryRestrictions);
    } else {
      alert("Invalid name or email. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      {error && <div className="alert alert-danger">{error}</div>}
      {!loggedInUser ? (
        <div className="card p-4">
          <h2 className="text-center mb-3">Login Form</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              style={{
                backgroundColor: "#133e87",
                color: "white",
                border: "none",
                padding: "6px 12px",
                fontSize: "1.2rem",
                marginTop: "10px",
                borderRadius: "5px",
              }}
              type="button"
              className="btn btn-primary"
              onClick={handleLogin}
            >
              Login
            </button>
          </form>
        </div>
      ) : (
        <div className="mt-4">
          <h1 className="text-center">Welcome, {loggedInUser[1]}</h1>
          <h2>Your Meal Plan:</h2>
          {loadingMealPlan ? (
            <p>Loading meal plan...</p>
          ) : mealPlan ? (
            <pre className="bg-light p-3">{mealPlan}</pre>
          ) : (
            <p>No meal plan available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default LoginForm;
