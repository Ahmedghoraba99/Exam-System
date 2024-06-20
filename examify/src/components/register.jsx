// Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Link } from 'react-router-dom';

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate(); // Initialize useNavigate

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/register', {
        name,
        email,
        password,
      });

      console.log('Registration successful:', response.data);

      setSuccess("Registration successful! Redirecting to login page...");
      setLoading(false);

      setTimeout(() => {
        navigate('/login'); // Redirect to the login page after a short delay
      }, 2000);

    } catch (err) {
      console.error('Registration error:', err);
      setError('Registration failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleRegister} className="mx-auto p-5" style={{ width: '600px' }}>
        <h1 className="h3 mb-3 text-center">Register</h1>

        <div className="auth-switcher m-5 mx-auto">
          <Link to="/login" className="switch-button  text-light">Login</Link>
          <Link to="/register" className="switch-button switch-button-active text-light">Register</Link>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control mb-3"
            id="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control mb-3"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control mb-3"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            className="form-control mb-3"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary m-3" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        <button type="reset" className="btn btn-danger m-3">Reset</button>
      </form>
    </div>
  );
}
