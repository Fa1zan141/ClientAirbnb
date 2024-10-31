import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <Link to="/" className="navbar-brand">Airbnb</Link>
    <div className="navbar-links">
      <div id="btn">
      <Link to="/bookings">Make a Booking</Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
