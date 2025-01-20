# Meal Planning Web App with Dietary Restrictions

## Overview

This is a full-stack web application designed to generate a weekly meal plan for a family of four, taking into account each member's dietary restrictions. The app collects dietary restrictions via a Google Form, integrates OpenAI's GPT for meal plan generation, and displays the meal plans securely on a dashboard. It updates the meal plan automatically every Sunday at 12:00 AM Pakistan Standard Time (PKT).

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Prerequisites

- Basic knowledge of frontend and backend development.
- Node.js and npm installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sohaibpak/Meal-Planner-App.git
   cd Meal-Planner-App
   ```

# Environment Variables

Create a `.env` file in the root of the project with the following structure:

REACT_APP_API_KEY=your_api_key_here
REACT_APP_API_URL=your_api_url_here
