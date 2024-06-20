import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {ExamList} from './components/ExamList';
import { Login } from './components/Login';
import { Register } from './components/register';
import { TakeExam } from './components/TakeExam';
import {Results} from './components/Results';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/exams" element={<ExamList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/exams/:examId" element={<TakeExam />} />
        <Route path="/results/:resultId" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;
