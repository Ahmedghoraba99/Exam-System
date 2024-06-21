
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function DashboardResults ()  {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/results', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-4 p-3 ">
      <h2>Results</h2>
      <table className="table table-striped text-center">
        <thead>
          <tr>
            <th>Exam</th>
            <th>User</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {results.map(result => (
            <tr key={result._id}>
              <td>{result.exam.name}</td>
              <td>{result.user.name}</td>
              <td>{result.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

