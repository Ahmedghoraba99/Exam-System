import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

export function Layouts() {
  const navigate = useNavigate();

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home">
            <img
              src="./logo.png"
              alt=""
              width="45"
              height="36"
              className="d-inline-block align-text-top"
            />
            Examify
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            <span className="navbar-text">
              <button
                className="btn btn-danger fw-bold"
                onClick={() => navigate("/logout")}
              >
                Logout
              </button>
            </span>
          </div>
        </div>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
