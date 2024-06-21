import { createContext, useEffect, useReducer } from 'react'
import axios from 'axios'
import databaseService from '../server/services/database.services'

const initialState = {
  user: null,
  isInitialized: false,
  isAuthenticated: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT': {
      const { isAuthenticated, user } = action.payload
      return { ...state, isAuthenticated, isInitialized: true, user }
    }
    case 'LOGIN': {
      const { user } = action.payload
      localStorage.setItem('user', JSON.stringify(user)) // Store user data in localStorage
      return { ...state, isAuthenticated: true, user }
    }
    case 'LOGOUT': {
      localStorage.removeItem('user') // Remove user data from localStorage on logout
      return { ...state, isAuthenticated: false, user: null }
    }
    case 'REGISTER': {
      const { user } = action.payload
      localStorage.setItem('user', JSON.stringify(user)) // Store user data in localStorage
      return { ...state, isAuthenticated: true, user }
    }
    default:
      return state
  }
}

const AuthContext = createContext({
  ...initialState,
  method: 'LocalStorage', // Indicate the storage method in the context
  login: () => {},
  logout: () => {},
  register: () => {}
})

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const login = async (email, password, rememberMe) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password })
      const { user } = response.data
      // console.log(response)
      // const { user } = await databaseService.getUsers(email, password)
      const result = await dispatch({ type: 'LOGIN', payload: { user } })

      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true')
      } else {
        localStorage.removeItem('rememberMe')
      }
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : 'Login failed')
    }
  }

  const register = async (email, username, password) => {
    try {
      const response = await axios.post('/api/auth/register', {
        email,
        username,
        password
      })
      const { user } = response.data
      dispatch({ type: 'REGISTER', payload: { user } })

      localStorage.setItem('rememberMe', 'true') // Always remember after registration
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : 'Registration failed')
    }
  }

  const logout = () => {
    localStorage.removeItem('user') // Remove user data from localStorage on logout
    localStorage.removeItem('rememberMe') // Remove rememberMe flag on logout
    dispatch({ type: 'LOGOUT' })
  }

  useEffect(() => {
    const userData = localStorage.getItem('user')
    const rememberMe = localStorage.getItem('rememberMe') === 'true'

    if (userData && rememberMe) {
      const parsedUser = JSON.parse(userData)
      dispatch({ type: 'INIT', payload: { isAuthenticated: true, user: parsedUser } })
    } else {
      localStorage.removeItem('user') // Clear user data if rememberMe is false or null
      dispatch({ type: 'INIT', payload: { isAuthenticated: false, user: null } })
    }
  }, [])

  if (!state.isInitialized) return <div>Loading...</div>

  return (
    <AuthContext.Provider value={{ ...state, method: 'LocalStorage', login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
