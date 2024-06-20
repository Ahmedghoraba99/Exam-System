import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/axios';

export const TakeExam = () => {
  const { examId } = useParams();

  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(null);
  const [userId, setUserId] = useState(null);
  const [submitted, setSubmitted] = useState(false); 
  const [timeLeft, setTimeLeft] = useState(3600); 
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await axiosInstance.get(`/exams/${examId}`);
        setExam(response.data);
        setLoading(false);
        setTimerActive(true); 
      } catch (err) {
        console.error('Error fetching exam:', err);
        setError('Failed to fetch exam. Please try again later.');
        setLoading(false);
      }
    };

    fetchExam();
  }, [examId]);

  useEffect(() => {
    const storedUserId = localStorage.getItem('id');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      const intervalId = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalId);
            handleSubmit(); 
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }
  },);

  const handleChange = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer,
    });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    try {
      const userScore = calculateScore();
      setScore(userScore);

      const resultData = {
        user: userId,
        exam: examId,
        score: userScore,
      };

      const response = await axiosInstance.post('/results/submit', resultData);
      console.log('Exam submitted:', response.data);

      setSubmitted(true);
      setTimerActive(false); 
    } catch (err) {
      console.error('Error submitting exam:', err);
      setError('Failed to submit exam. Please try again later.');
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    exam.questions.forEach((question) => {
      const userAnswer = answers[question._id];
      if (userAnswer && userAnswer.toLowerCase() === question.answer.toLowerCase()) {
        correctAnswers++;
      }
    });
    return correctAnswers;
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  if (!exam || !exam.questions || exam.questions.length === 0) {
    return <div>No questions found for this exam.</div>;
  }

  if (!submitted) {
    return (
      <div className="container-fluid py-5" style={{ backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
        <div className="container bg-white p-5 rounded shadow-lg">
          <h1 className="text-center mb-5">Exam Name: <span className="fw-bold">{exam.name}</span></h1>
          <h3 className="text-center mb-4">Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}</h3>
          <form onSubmit={handleSubmit} className="take-exam-form">
            {exam.questions.map((question) => (
              <div key={question._id} className="question mb-4">
                <h3 className="h3">{question.question}</h3>
                <input
                  type="text"
                  className="form-control mt-3"
                  placeholder="Enter your answer here..."
                  value={answers[question._id] || ''}
                  onChange={(e) => handleChange(question._id, e.target.value)}
                />
                <div className="card mt-3 invisible">
                  <div className="card-body">
                    <h5 className="card-title">Answer</h5>
                    <p className="card-text">{question.answer}</p>
                  </div>
                </div>
              </div>
            ))}
            <button type="submit" className="btn btn-success fw-bold p-2 fs-5 w-100">
              <i className="fa-solid fa-circle-check"></i> Submit answers
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-5" style={{ backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <div className="container bg-white p-5 rounded shadow-lg text-center">
        <h1 className="mb-5">Your score: <span className="fw-bold">{score}</span></h1>
        <a href="/exams" className="btn btn-primary fw-bold p-2 fs-5">
          Go to Exams
        </a>
      </div>
    </div>
  );
};


