import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("id");
    if (!userId) {
      navigate("/login");
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`/users/${userId}`);
        setUserName(response.data.user.name);
        // console.log(response.data.user.name);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err);
        navigate("/login");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <div className="container p-5" style={{ maxWidth: "800px" }}>
        <h1 className="text-center m-5">
          Welcome to Examify, <span id="userName">{userName}</span>!
        </h1>
        <div className="row justify-content-center align-items-center vh-75">
          {/* Take an exam */}
          <div className="col-md-6 mb-3">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title fw-bold">Take an exam!</h5>
                <p className="card-text">
                  Test and develop your skills with a set of skillfully crafted
                  Exams
                </p>
                <a href="/exams" className="p-3">
                  <img
                    className="d-block mx-auto w-75 home-img"
                    src="./test.gif"
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>
          {/* View results */}
          <div className="col-md-6 mb-3">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title fw-bold">View your results</h5>
                <p className="card-text">
                  View your result over time and track your progress
                </p>
                <a href="/results" className="p-3">
                  <img
                    className="d-block mx-auto w-75 home-img"
                    src="./student.gif"
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
