import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./views/HomePage";
import Login from "./views/Login";
import RegisterStudent from "./views/RegisterStudent";
import RegisterTutor from "./views/RegisterTutor";
import ClassList from "./views/ClassList";
import ClassDetail from "./views/ClassDetail";
import UserProfile from "./views/UserProfile";
import TutorProfile from "./views/TutorProfile";
import ViewTutorProfile from "./views/ViewTutorProfile";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterStudent />} />
        <Route path="/registerTutor" element={<RegisterTutor />} />
        <Route path="/ClassList" element={<ClassList />} />
        <Route path="/card/:id" element={<ClassDetail />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/tutorProfile" element={<TutorProfile />} />
        <Route path="/ViewTutorProfile" element={<ViewTutorProfile />} />
      </Routes>
    </Router>
  );
};

export default App;
