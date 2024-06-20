// Results.js
import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import { useParams } from 'react-router-dom';

export function Results() {
  const { resultId } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await axiosInstance.get(`/results/${resultId}`);
        setResult(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching result:', err);
        setError('Failed to fetch result. Please try again later.');
        setLoading(false);
      }
    };

    fetchResult();
  }, [resultId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-5">
      <h1 className="h3 mb-3 text-center">Exam Results</h1>
      <div className="result-card p-5 mx-auto" style={{ width: '600px' }}>
        <h2>{result.examName}</h2>
        <p>Total Score: {result.totalScore}</p>
        <p>Correct Answers: {result.correctAnswers}</p>
        <p>Incorrect Answers: {result.incorrectAnswers}</p>
        <h3>Answers:</h3>
        <ul>
          {result.answers.map((answer, index) => (
            <li key={index}>
              <strong>Question:</strong> {answer.questionText} <br />
              <strong>Your Answer:</strong> {answer.userAnswer} <br />
              <strong>Correct Answer:</strong> {answer.correctAnswer}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
