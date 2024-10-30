import axios from 'axios';

const API_URL = 'http://localhost:2704/api/auth';

// Register function to call the backend API
export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData, {
            withCredentials: true, // Includes credentials with requests
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Registration failed');
    }
};