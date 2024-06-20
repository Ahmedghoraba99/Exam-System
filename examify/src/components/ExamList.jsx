import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axios'; 
import { Link } from 'react-router-dom';
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
    <div className="exam-list-container">
      <h1 className="exam-list-title">Available Exams</h1>
      <ul className="exam-list">
        {exams.map((exam) => (
          <li key={exam._id} className="exam-item">
            <Link to={`/exams/${exam._id}`} className="exam-link">{exam.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
