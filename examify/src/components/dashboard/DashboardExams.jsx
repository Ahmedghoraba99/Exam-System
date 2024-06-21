import React, { useState, useEffect } from "react";

export function DashboardExams() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:8080/questions", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch questions");
      }
      const questionsData = await response.json();
      setQuestions(questionsData);
    } catch (error) {
      console.error("Error fetching questions:", error.message);
      setMessage("Failed to fetch questions. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(selectedQuestions);
    // return
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:8080/exams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, questions: selectedQuestions }),
      });

      if (!response.ok) {
        throw new Error("Failed to add exam");
      }

      // Reset form after successful submission
      setMessage("Exam added successfully!");
    } catch (error) {
      console.error("Error adding exam:", error.message);
      setMessage("Failed to add exam. Please try again.");
    }
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedQuestions([...selectedQuestions, value]);
    } else {
      setSelectedQuestions(
        selectedQuestions.filter((questionId) => questionId !== value)
      );
    }
  };

  const handleReset = () => {
    setName("");
    setSelectedQuestions([]);
    setMessage("");
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };
  return (
    <div className="p-3">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="examName" className="form-label">
            Exam Name
          </label>
          <input
            type="text"
            className="form-control"
            id="examName"
            placeholder="Enter exam name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Select Questions</label>
          {questions.map((question) => (
            <div key={question._id} className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id={question._id}
                value={question._id}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor={question._id}>
                {question.question}
              </label>
            </div>
          ))}
        </div>
        <button type="submit" className="btn btn-primary">
          Add Exam
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={handleReset}
        >
          Reset
        </button>
      </form>
      {message && (
        <div
          className={`mt-3 alert ${
            message.includes("success") ? "alert-success" : "alert-danger"
          }`}
          role="alert"
        >
          {message}
        </div>
      )}
    </div>
  );
}

