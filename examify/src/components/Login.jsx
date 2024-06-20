import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/login.css';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:8080/login', {
        email,
        password,
      });

      console.log('Login successful:', response.data); 

      // Save token to local storage
      localStorage.setItem('token', response.data.token); 

      // Redirect to another page or update state to indicate successful login
      setLoading(false);
      window.location.href = '/exams'; 

    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid username or password');
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleLogin} className="mx-auto p-5" style={{ width: '600px' }}>
        <h1 className="h3 mb-3 text-center">Please sign in</h1>

        {/* Error message */}
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="auth-switcher m-5 mx-auto">
          <Link to="/login" className="switch-button switch-button-active text-light">Login</Link>
          <Link to="/register" className="switch-button text-light">Register</Link>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
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
            className="form-control"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary m-3" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <button type="reset" className="btn btn-danger m-3">Reset</button>
      </form>
    </div>
  );
}
