import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import {ExamList} from './components/ExamList';
import { Login } from './components/Login';
import { Register } from './components/register';
import { TakeExam } from './components/TakeExam';
import {Results} from './components/Results';
import { Home } from './components/Home';
import {Logout} from './components/Logout';
import { Layouts } from './components/Layouts';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />

        <Route element={<Layouts />}>
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
