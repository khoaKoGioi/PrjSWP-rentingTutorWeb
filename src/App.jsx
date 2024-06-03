import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./views/HomePage";
import Login from "./views/Login";
import Register from "./views/Register";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
