import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginForm from "./pages/LoginForm";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/loginform" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}

export default App;
