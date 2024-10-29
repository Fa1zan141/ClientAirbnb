// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import ConfirmationPage from './pages/ConfirmationPage';

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/bookings" element={<BookingPage />} />
      <Route path="/confirmation" element={<ConfirmationPage />} />
    </Routes>
  </Router>
);

export default App;
