import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice'; 

export const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await dispatch(logout()); 
      } catch (err) {
        console.error('Error logging out:', err);
      }
    };

    handleLogout();
  }, [dispatch]);

  return (
    <div className="logout-container">
      <p>Logging out...</p>
    </div>
  );
};
