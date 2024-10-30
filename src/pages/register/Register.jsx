import React, { useState, useEffect } from 'react';
import './register.css';
import { register } from '../../services/authService.js';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState(''); // State for confirmation message

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !email || !password) {
            setError('All fields are required');
            return;
        }

        try {
            await register({ username, email, password });
            setError('');
            setMessage('Registration successful!');
            resetForm();
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    const resetForm = () => {
        setUsername('');
        setEmail('');
        setPassword('');
    };

    // Clears error message when user types in any field
    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
        setError('');
    };

    // Automatically clear success/error messages after 3 seconds
    useEffect(() => {
        if (message || error) {
            const timer = setTimeout(() => {
                setMessage('');
                setError('');
            }, 3000);
            return () => clearTimeout(timer); // Cleanup on component unmount
        }
    }, [message, error]);

    return (
        <div className="register">
            <h2>Register</h2>
            {message && <div className="message">{message}</div>}
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit} className="registerForm">
                <div className="formGroup">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleInputChange(setUsername)}
                        required
                    />
                </div>
                <div className="formGroup">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleInputChange(setEmail)}
                        required
                    />
                </div>
                <div className="formGroup">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handleInputChange(setPassword)}
                        required
                    />
                </div>
                <button type="submit" className="registerBtn">Register</button>
            </form>
        </div>
    );
};

export default Register;