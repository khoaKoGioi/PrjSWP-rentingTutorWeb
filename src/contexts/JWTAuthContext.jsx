// AuthContext.js

import React, { createContext, useEffect, useReducer } from 'react'
import { loginUser, registerUser, fetchUserProfile } from '../apiService/api'
import axios from 'axios'

const initialState = {
  user: null,
  isAuthenticated: false,
  isInitialized: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT': {
      const { isAuthenticated, user } = action.payload
      return { ...state, isAuthenticated, isInitialized: true, user }
    }
    case 'LOGIN': {
      const { token, user } = action.payload
      localStorage.setItem('token', token) // Store token in localStorage
      return { ...state, isAuthenticated: true, user }
    }
    case 'LOGOUT': {
      localStorage.removeItem('token') // Remove token from localStorage on logout
      return { ...state, isAuthenticated: false, user: null }
    }
    case 'REGISTER': {
      const { token, user } = action.payload
      localStorage.setItem('token', token) // Store token in localStorage
      return { ...state, isAuthenticated: true, user }
    }
    default:
      return state
  }
}

export const AuthContext = createContext({
  ...initialState,
  method: 'BackendAPI', // Indicate the storage method in the context
  login: () => {},
  logout: () => {},
  register: () => {}
})

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const login = async (email, password, rememberMe) => {
    try {
      const { token, user, student } = await loginUser(email, password)
      dispatch({ type: 'LOGIN', payload: { token, user, student } })

      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true')
      } else {
        localStorage.removeItem('rememberMe')
      }
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : 'Login failed')
    }
  }

  // const serverLogin = async (formData) => {
  //   try {
  //     const res = await axios.post(`http://localhost:3000/users/login`, formData)
  //     const { token, user } = res.data.data
  //     dispatch({ type: 'LOGIN', payload: { token, user } })
  //     console.log(res.data.data)

  //     if (formData.rememberMe) {
  //       localStorage.setItem('rememberMe', 'true')
  //     } else {
  //       localStorage.removeItem('rememberMe')
  //     }
  //     return res.data
  //   } catch (error) {
  //     console.log(error)
  //     throw new Error(error.response ? error.response.data.message : 'Login failed')
  //   }
  // }

  const register = async (email, username, password) => {
    try {
      const { token, user } = await registerUser(email, username, password)
      dispatch({ type: 'REGISTER', payload: { token, user } })

      localStorage.setItem('rememberMe', 'true') // Always remember after registration
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : 'Registration failed')
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user') // Remove token from localStorage on logout
    dispatch({ type: 'LOGOUT' })
  }

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token')

      if (token) {
        try {
          const { user } = await fetchUserProfile(token)
          dispatch({ type: 'INIT', payload: { isAuthenticated: true, user } })
        } catch (error) {
          console.error(error)
          dispatch({ type: 'INIT', payload: { isAuthenticated: false, user: null } })
        }
      } else {
        dispatch({ type: 'INIT', payload: { isAuthenticated: false, user: null } })
      }
    }

    fetchUser()
  }, [])

  if (!state.isInitialized) return <div>Loading...</div>

  return (
    <AuthContext.Provider value={{ ...state, method: 'BackendAPI', login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
