import React, { useState, useEffect } from "react";
export function DashboardExamTable() {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
      const response = await fetch("http://localhost:8080/exams", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setExams(data);
    } catch (error) {
      console.error("Error fetching exams:", error);
    }
  };

  const deleteExam = async (id) => {
    try {
      const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
      await fetch(`http://localhost:8080/exams/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // After deletion, refetch the exams to update the UI
      fetchExams();
    } catch (error) {
      console.error("Error deleting exam:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="mt-3 mb-4">Exams</h2>
      {exams.map((exam) => (
        <div className="card mb-4" key={exam._id}>
          <div className="card-body">
            <h3 className="card-title">{exam.name}</h3>
            <div className="table-responsive">
              <table className="table table-striped text-center">
                <thead>
                  <tr>
                    <th>Question</th>
                    <th>Answer</th>
                  </tr>
                </thead>
                <tbody>
                  {exam.questions.map((question) => (
                    <tr key={question._id}>
                      <td>{question.question}</td>
                      <td>{question.answer}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              className="btn btn-danger mt-2"
              onClick={() => deleteExam(exam._id)}
            >
              Delete Exam
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
