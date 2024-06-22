import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await dispatch(logout());
        localStorage.clear();
        navigate("/login");
        // window.location.href = "/login";
      } catch (err) {
        console.error("Error logging out:", err);
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
