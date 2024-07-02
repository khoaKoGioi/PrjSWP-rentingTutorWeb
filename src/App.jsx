import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/JWTAuthContext'

import HomePage from './views/HomePage'
import Login from './views/Login'
import RegisterStudent from './views/RegisterStudent'
import RegisterTutor from './views/RegisterTutor'
import ClassList from './views/ClassList'
import ClassDetail from './views/ClassDetail'
import UserProfile from './views/UserProfile'
import ViewTutorProfile from './views/ViewTutorProfile'
import AuthGuard from './auth/AuthGuard'
import ClassManagement from './views/ClassManagement'
import AdminPortal from './views/AdminPortal'
import ClassListManagement from './views/ClassListManagement'
import FeedbackManagement from './views/feedbackManagement'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<RegisterStudent />} />
          <Route path='/registerTutor' element={<RegisterTutor />} />
          <Route path='/Classlist' element={<ClassList />} />
          <Route path='/classDetail/:id' element={<ClassDetail />} />
          <Route path='/manage-classes' element={<ClassManagement />} />
          <Route path='/admin-portal' element={<AdminPortal />} />
          <Route path='/admin-classlist' element={<ClassListManagement />} />
          <Route path='/admin-feedback' element={<FeedbackManagement />} />
          {/* Protected routes */}

          <Route
            path='/profile'
            element={
              <AuthGuard>
                <UserProfile />
              </AuthGuard>
            }
          />
          <Route
            path='/tutor-profile'
            element={
              <AuthGuard>
                <ViewTutorProfile />
              </AuthGuard>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
