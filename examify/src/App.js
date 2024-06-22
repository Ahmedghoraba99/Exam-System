import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserRole } from "./store/slices/authSlice";
import { ExamList } from "./components/ExamList";
import { Login } from "./components/Login";
import { Register } from "./components/register";
import { TakeExam } from "./components/TakeExam";
import { Results } from "./components/Results";
import { Home } from "./components/Home";
import { Logout } from "./components/Logout";
import { Layouts } from "./components/Layouts";
import { Dashboard } from "./layouts/Dashboard";
import { DashboardAddExams } from "./components/dashboard/DashboardAddExams";
import { DashboardResults } from "./components/dashboard/DashboardResults";
import { DashboardAddQuestions } from "./components/dashboard/DashboardAddQuestions";
import { DashboardUsers } from "./components/dashboard/DashboardUsers";
import { DashboardExamTable } from "./components/dashboard/DashboardExamTable";
import { DashboardQuestionTable } from "./components/dashboard/DashboardQuestionTable";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  // const userRole = useSelector(selectUserRole);
  const role = localStorage.getItem("role");
  console.log("UserRole from Redux:", role);

  return (
    <Router>
      <Routes>
        {role === "admin" && (
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<DashboardUsers />} />
            <Route path="/dashboard/users" element={<DashboardUsers />} />
            <Route path="/dashboard/exams" element={<DashboardAddExams />} />
            <Route
              path="/dashboard/questionTable"
              element={<DashboardQuestionTable />}
            />
            <Route
              path="/dashboard/examsTable"
              element={<DashboardExamTable />}
            />
            <Route
              path="/dashboard/questions"
              element={<DashboardAddQuestions />}
            />
            <Route path="/dashboard/results" element={<DashboardResults />} />
          </Route>
        )}

        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />

        <Route
          element={
            // <ProtectedRoute>
            <Layouts />
            // </ProtectedRoute>
          }
        >
          <Route path="/exams" element={<ExamList />} />
          <Route path="/exams/:examId" element={<TakeExam />} />
          <Route path="/results" element={<Results />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
