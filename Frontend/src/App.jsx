// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import ConfirmationPage from './pages/ConfirmationPage';
import ThankYouPage from './pages/ThankYouPage'; 
import ListingDetailPage from './pages/ListingDetailPage';

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/bookings" element={<BookingPage />} />
      <Route path="/confirmation" element={<ConfirmationPage />} />
      <Route path="/thankyou" element={<ThankYouPage />} />
      <Route path='/listing-detail/:listing_id' element={<ListingDetailPage/>}/>
    </Routes>
  </Router>
);

export default App;
