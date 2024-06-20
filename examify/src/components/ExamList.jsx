import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/exams.css'; 

export function ExamList() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axiosInstance.get('/exams');
        console.log('Response:', response.data);
        setExams(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching exams:', err);
        setError('Failed to fetch exams. Please try again later.');
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container exam-list-container">
      <div className="d-flex justify-content-start">
        <Link to="/home" className="btn btn-primary fw-bold fs-5 mb-1">
          <i className="fas fa-home"></i>
        </Link>
      </div>
      <h1 className="exam-list-title text-center">Available Exams</h1>
      <div className="row">
        {exams.map((exam) => (
          <div key={exam._id} className="col-md-6 mb-4">
            <div className="exam-item list-group-item">
              <Link to={`/exams/${exam._id}`} className="exam-link">{exam.name}</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
