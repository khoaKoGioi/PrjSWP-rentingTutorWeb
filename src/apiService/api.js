// apiService/api.js

import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Replace with your backend API base URL


export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : 'Login failed'
    );
  }
};

export const registerUser = async (email, username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, { email, username, password });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : 'Registration failed'
    );
  }
};

export const fetchUserProfile = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : 'Failed to fetch user profile'
    );
  }
};
