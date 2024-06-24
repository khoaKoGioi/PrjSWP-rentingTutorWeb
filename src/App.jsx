import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/JWTAuthContext";

import HomePage from "./views/HomePage";
import Login from "./views/Login";
import RegisterStudent from "./views/RegisterStudent";
import RegisterTutor from "./views/RegisterTutor";
import ClassList from "./views/ClassList";
import ClassDetail from "./views/ClassDetail";
import UserProfile from "./views/UserProfile";
import ViewTutorProfile from "./views/ViewTutorProfile";

import AuthGuard from "./auth/AuthGuard";


const App = () => {
  
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterStudent />} />
          <Route path="/registerTutor" element={<RegisterTutor />} />
          <Route path="/ClassList" element={<ClassList />} />
          <Route path="/card/:id"element={<ClassDetail />}
          />
          {/* Protected routes */}
          
          <Route
            path="/profile"
            element={
              <AuthGuard>
                <UserProfile />
              </AuthGuard>
            }
          />
          <Route
            path="/tutor-profile"
            element={
              <AuthGuard>
                <ViewTutorProfile />
              </AuthGuard>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
