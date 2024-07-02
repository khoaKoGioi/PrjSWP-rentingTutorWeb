// AuthContext.js

import React, { createContext, useEffect, useReducer } from 'react'
import { loginUser, registerStudent, registerTutor, fetchUserProfile } from '../apiService/api'

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

    case 'REGISTER_STUDENT': {
      const { token, user } = action.payload
      localStorage.setItem('token', token) // Store token in localStorage
      return { ...state, isAuthenticated: true, user }
    }
    case 'REGISTER_TUTOR': {
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

  registerStudent: () => {},
  registerTutor: () => {}
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

  const serverLogin = async (formData) => {
    const res = await axios.post(`http://localhost:3000/users/login`, formData)
    console.log(res.data)
    return res.data
  }
  // const config = {
  //   method: 'post',
  //   url: '/login', // endpoint without baseURL
  //   baseURL: 'http://localhost:3000/users', // base URL for your API
  //   headers: { 'Content-Type': 'application/json' }
  // }

  // try {
  //   console.log('response')

  //   // Corrected payload (password instead of passsword)
  //   const response = await axios(config, formData)

  //   console.log(response)
  //   const { user } = response.data
  //   console.log(user)

  //   const result = await dispatch({ type: 'LOGIN', payload: { user } })

  //   if (rememberMe) {
  //     localStorage.setItem('rememberMe', 'true')
  //   } else {
  //     localStorage.removeItem('rememberMe')
  //   }
  // } catch (error) {
  //   throw new Error(error.response && error.response.data ? error.response.data.message : 'Login failed')
  // }

  const register = async (userType, formData) => {
    try {
      let response
      if (userType === 'student') {
        response = await registerStudent(
          formData.email,
          formData.userName,
          formData.password,
          formData.fullName,
          formData.avatar,
          formData.dateOfBirth,
          formData.phone,
          formData.address,

          formData.grade,
          formData.school
        )
        console.log('Registration Response:', response)
        dispatch({ type: 'REGISTER_STUDENT', payload: response })
      } else if (userType === 'tutor') {
        response = await registerTutor(
          formData.email,
          formData.userName,
          formData.password,
          formData.fullName,
          formData.avatar,
          formData.dateOfBirth,
          formData.phone,
          formData.address,

          formData.workplace,
          formData.credentialFile,
          formData.degreeFile,
          formData.description
        )
        console.log('Registration Response:', response)
        dispatch({ type: 'REGISTER_TUTOR', payload: response })
      }

      localStorage.setItem('rememberMe', 'true')
      return response // Return the response from the API call if needed
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
    <AuthContext.Provider
      value={{
        ...state,
        method: 'BackendAPI',
        login,
        logout,
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
