import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectAuthToken } from '../store/slices/authSlice';

const ProtectedRoute = ({ children }) => {
  const token = useSelector(selectAuthToken);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
