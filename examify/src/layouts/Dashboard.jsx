import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebae";
import dashboard from "../styles/dashboard.css";
import React from "react";

export function Dashboard() {
  return (
    <div className="dashboard d-flex ">
      <Sidebar />
      <div className="mt-5" style={{ width: "80vw" }}>
        <Outlet />
      </div>
    </div>
  );
}
