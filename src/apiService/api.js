// apiService/api.js

import axios from 'axios'

const API_URL = 'http://localhost:5000/api'
// const API_URL = 'https://e59e-171-233-29-47.ngrok-free.app/api' // Replace with your backend API base URL

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password })
    return response.data
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Login failed')
  }
}

export const registerStudent = async (
  email,
  userName,
  password,
  fullName,
  avatar,
  dateOfBirth,
  phone,
  address,
  grade,
  school
) => {
  try {
    const formData = new FormData()
    formData.append('email', email)
    formData.append('userName', userName)
    formData.append('password', password)
    formData.append('fullName', fullName)
    formData.append('avatar', avatar)
    formData.append('dateOfBirth', dateOfBirth)
    formData.append('phone', phone)
    formData.append('address', address)

    formData.append('grade', grade)
    formData.append('school', school)
    console.log('Received Data:', {
      email,
      userName,
      password,
      fullName,
      avatar,
      dateOfBirth,
      phone,
      address,
      grade,
      school
    })

    console.log('Register Student Form Data:', formData)

    const response = await axios.post(`${API_URL}/auth/registerStudent`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error in registerStudent:', error.response || error.message || error)

    throw new Error(error.response ? error.response.data.message : 'Registration failed')
  }
}

export const registerTutor = async (
  email,
  userName,
  password,
  fullName,
  avatar,
  dateOfBirth,
  phone,
  address,
  workplace,
  credentialFile,
  degreeFile,
  description
) => {
  try {
    const formData = new FormData()
    formData.append('email', email)
    formData.append('userName', userName)
    formData.append('password', password)
    formData.append('fullName', fullName)
    formData.append('avatar', avatar)
    formData.append('dateOfBirth', dateOfBirth)
    formData.append('phone', phone)
    formData.append('address', address)

    formData.append('workplace', workplace)
    formData.append('credentialFile', credentialFile)
    formData.append('degreeFile', degreeFile)
    formData.append('description', description)

    const response = await axios.post(`${API_URL}/auth/registerTutor`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Registration failed')
  }
}

export const fetchUserProfile = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Failed to fetch user profile')
  }
}
