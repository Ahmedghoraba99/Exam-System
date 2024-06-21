import React, { useEffect } from 'react';

export const Logout = () => {
  useEffect(() => {
    const handleLogout = async () => {
      try {
        localStorage.removeItem('id');
        localStorage.removeItem('token'); 
      } catch (err) {
        console.error('Error logging out:', err);
      }
    };

    handleLogout();
  },);

  return (
    <div className="logout-container">
      <p>Logging out...</p>
    </div>
  );
};

 
