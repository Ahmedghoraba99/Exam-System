import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGauge,
  faHouse,
  faSquarePollVertical,
  faPen,
  faQuestion,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { Logout } from "../Logout";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark position-sticky left-0 top-0"
      style={{ width: "280px", height: "100vh" }}
    >
      <a
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <FontAwesomeIcon icon={faGauge} className="p-2 fs-3" />
        <span className="fs-3"> Dashboard</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li>
          <Link to="/dashboard/users" className="nav-link text-white">
            <FontAwesomeIcon icon={faUserTie} className="p-2" />
            Users
          </Link>
        </li>
        <li>
          <Link to="/dashboard/results" className="nav-link text-white">
            <FontAwesomeIcon icon={faSquarePollVertical} className="p-2" />
            Results
          </Link>
        </li>
        <li>
          <Link to="/dashboard/exams" className="nav-link text-white">
            <FontAwesomeIcon icon={faPen} className="p-2" />
            Add Exam
          </Link>
        </li>
        <li>
          <Link to="/dashboard/examsTable" className="nav-link text-white">
            <FontAwesomeIcon icon={faPen} className="p-2" />
            All Exams
          </Link>
        </li>
        <li>
          <Link to="/dashboard/questions" className="nav-link text-white">
            <FontAwesomeIcon icon={faQuestion} className="p-2" />
            Add Question
          </Link>
        </li>
        <li>
          <Link to="/dashboard/questionTable" className="nav-link text-white">
            <FontAwesomeIcon icon={faQuestion} className="p-2" />
            All Question
          </Link>
        </li>

        <button
          className="btn btn-danger fw-bold"
          onClick={() => navigate("/logout")}
        >
          Logout
        </button>
      </ul>
    </div>
  );
}

export default Sidebar;
