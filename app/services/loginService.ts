// authService.js

import axios from 'axios';

// Replace this with your API endpoint
const API_URL = 'http://localhost:3000/auth/login';

/**
 * Logs in a user with the provided email and password.
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<object>} The response from the API.
 */
export const login = async (email, password) => {
  try {
    const response = await axios.post(API_URL, {
      email,
      password,
    });

    // Save the token or other user info in local storage or state management
    const { data } = response;
    return data;
  } catch (error) {
    // Handle error response (you can customize this part)
    console.error('Login failed:', error.response?.data || error.message);
    throw error;
  }
};
