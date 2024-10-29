import React, { useState } from 'react';
import './register.css';
import { register } from '../../services/authService.js';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError('All fields are required');
      return;
    }

    try {
      await register({ username, email, password });
      setError('');
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="register">
      <h2>Register</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit} className="registerForm">
        <div className="formGroup">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="registerBtn">Register</button>
      </form>
    </div>
  );
};

export default Register;