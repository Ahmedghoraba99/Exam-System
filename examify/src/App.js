import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {ExamList} from './components/ExamList';
import { Login } from './components/Login';
// import ExamPage from './components/ExamPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/exams" element={<ExamList />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/exams/:id" element={<ExamPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
