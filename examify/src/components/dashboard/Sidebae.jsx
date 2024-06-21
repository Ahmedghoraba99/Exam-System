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
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
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
          <Link to="/dashboard/results" className="nav-link text-white">
            <FontAwesomeIcon icon={faSquarePollVertical} className="p-2" />
            Results
          </Link>
        </li>
        <li>
          <Link to="/dashboard/exams" className="nav-link text-white">
            <FontAwesomeIcon icon={faPen} className="p-2" />
            Exams
          </Link>
        </li>
        <li>
          <Link to="/dashboard/questions" className="nav-link text-white">
            <FontAwesomeIcon icon={faQuestion} className="p-2" />
            Questions
          </Link>
        </li>
        <li>
          <Link to="/dashboard/users" className="nav-link text-white">
            <FontAwesomeIcon icon={faUserTie} className="p-2" />
            Users
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
