import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export function DashboardQuestionTable() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/questions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const deleteQuestion = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/questions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setQuestions(questions.filter((question) => question._id !== id));
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  return (
    <div className="container mt-5 p-3">
      <h1>Questions</h1>
      <div className="list-group">
        {questions.map((question) => (
          <div
            key={question._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <h5>{question.question}</h5>
              <p>{question.answer}</p>
            </div>
            <button
              className="btn btn-danger"
              onClick={() => deleteQuestion(question._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
