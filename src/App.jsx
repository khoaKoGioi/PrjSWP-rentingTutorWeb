import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./views/HomePage";
import Login from "./views/Login";
import RegisterStudent from "./views/RegisterStudent";
import RegisterTutor from "./views/RegisterTutor";
import ClassList from "./views/ClassList";
import ClassDetail from "./views/ClassDetail";
const App = () => {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterStudent />} />
        <Route path="/registerTutor" element={<RegisterTutor />} />
        <Route path="/ClassList" element={<ClassList />} />
        <Route path="/card/:id" element={<ClassDetail/>} />
      </Routes>
    </Router>
  );
};

export default App;
