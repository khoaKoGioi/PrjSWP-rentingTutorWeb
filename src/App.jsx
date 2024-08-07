import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/JWTAuthContext'
import { createContext,useState } from "react";

import HomePage from './views/HomePage'
import Login from './views/Login'
import RegisterStudent from './views/RegisterStudent'
import RegisterTutor from './views/RegisterTutor'
import ClassList from './views/ClassList'
import ClassDetail from './views/ClassDetail'
import UserProfile from './views/UserProfile'
import Complaint from './views/Complaint'
import AuthGuard from './auth/AuthGuard'
import ClassManagement from './views/ClassManagement'
import AdminPortal from './views/AdminPortal'
import FeedbackManagement from './views/feedbackManagement'
import AdminPortalClass from './views/AdminPortalClass'
import TutorRequest from './views/TutorRequest'
import AccessDeniedPage from './components/AccessDeniedPage'
import ViewTutorProfile from './views/ViewTutorProfile'
import AdminTutorRequests from './views/AdminTutorRequest'
import AdminPortalTransaction from './views/AdminPortalTransaction'
import AdminPortalComplaints from './views/AdminPortalComplaints';

import Reset from './views/Reset'
import OTPinput from './views/OTPInput'
export const RecoveryContext = createContext();
const App = () => {
  const [email, setEmail] = useState();
  const [otp, setOTP] = useState();

  return (
    <AuthProvider>
       <RecoveryContext.Provider
      value={{ otp, setOTP, setEmail, email }}
    >

    
      <Router>
        
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/reset-password' element={<Reset/>} />
          <Route path='/OTP-page' element={<OTPinput/>} />

          <Route path='/register-student' element={<RegisterStudent />} />
          <Route path='/register-tutor' element={<RegisterTutor />} />
          <Route path='/complaint' element={<Complaint />} />
          <Route path='/Classlist' element={<ClassList />} />
          <Route path='/Classlist/ClassDetail' element={<ClassList />} />
          <Route path='/classDetail/:id' element={<ClassDetail />} />
          <Route path='/manage-classes' element={<ClassManagement />} />

          <Route path='/admin-portal' element={<AdminPortal />} />
          <Route path='/admin-portal-class' element={<AdminPortalClass />} />
          <Route path='/admin-portal-complaints' element={<AdminPortalComplaints />} />
          <Route path='/admin-feedback' element={<FeedbackManagement />} />
          
          <Route path='/tutor-profile/:id' element={<ViewTutorProfile />} />
          <Route path='/view-tutor-request' element={<TutorRequest />} />
          <Route path='/unauthorized' element={<AccessDeniedPage />} />
          <Route path='/admin-portal-tutor-request' element={<AdminTutorRequests />} />
          <Route path='/admin-portal-transaction' element={<AdminPortalTransaction />} />

          {/* Protected routes */}

          <Route
            path='/profile'
            element={
              <AuthGuard>
                <UserProfile />
              </AuthGuard>
            }
          />
        </Routes>
      </Router>
    </RecoveryContext.Provider>  
    </AuthProvider>
  )
}

export default App
