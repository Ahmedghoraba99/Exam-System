import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchExams, examsSelectors } from "../store/slices/examSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/exams.css";
import { useNavigate } from "react-router-dom";

export const ExamList = () => {
  const dispatch = useDispatch();
  const exams = useSelector(examsSelectors.selectAllExams);
  const loading = useSelector(examsSelectors.selectExamsLoading);
  const error = useSelector(examsSelectors.selectExamsError);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchExams());
  }, [dispatch]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return navigate("/login");

  return (
    <div
      className="container exam-list-container "
      style={{ minWidth: "800px" }}
    >
      <div className="d-flex justify-content-start">
        <Link to="/home" className="btn btn-primary fw-bold fs-5 mb-1">
          <i className="fas fa-home"></i>
        </Link>
      </div>
      <h1 className="exam-list-title text-center">Available Exams</h1>
      <div className="row">
        {exams.map((exam, index) => (
          <div key={exam._id || index} className="col-md-6 mb-4">
            <div className="exam-item list-group-item">
              <Link to={`/exams/${exam._id}`} className="exam-link">
                {exam.name}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
