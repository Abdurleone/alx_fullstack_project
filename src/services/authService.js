// src/services/authService.js

import axios from 'axios';

// Define the base URL for the authentication API
const API_URL = 'http://localhost:2704/api/auth'; // Adjusted to your backend URL

// Register function to call the backend API
export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData, {
            withCredentials: true, // Include credentials with requests
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Registration failed');
    }
};

// Export other functions as needed, such as login if you have one