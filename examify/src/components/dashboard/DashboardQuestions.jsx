import React, { useState } from "react";

export function DashboardQuestions() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = () => {
    setQuestion("");
    setAnswer("");
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const url = "http://localhost:8080/questions";

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ question, answer }),
    };

    try {
      const response = await fetch(url, requestOptions);
      if (response.ok) {
        setMessage("Question created successfully!");
      } else {
        setMessage("Error creating question.");
      }
    } catch (error) {
      console.error("Error creating question:", error);
      setMessage("Error creating question. Please try again later.");
    }
  };

  return (
    <div className=" p-4">
      <h2>Create a Question</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="question" className="form-label">
            Question:
          </label>
          <input
            type="text"
            id="question"
            className="form-control"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="answer" className="form-label">
            Answer:
          </label>
          <input
            type="text"
            id="answer"
            className="form-control"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={handleReset}
        >
          Reset
        </button>
      </form>
      {message && <p className="alert alert-success mt-3">{message}</p>}
    </div>
  );
}
