import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slices/authSlice'; 
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';

export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      await dispatch(login({ email, password }));
      navigate('/home');
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleLogin} className="mx-auto p-5" style={{ width: '600px' }}>
        <h1 className="h3 mb-3 text-center">Please sign in</h1>

        {/* Error message */}
        {error && <div className="alert alert-danger">{error.message}</div>}

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
        <button type="reset" className="btn btn-danger m-3">
          Reset
        </button>
      </form>
    </div>
  );
}
