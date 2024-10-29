// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <Link to="/" className="navbar-brand">Airbnb</Link>
    <div className="navbar-links">
      <Link to="/">Stays</Link>
      <Link to="/">Experiences</Link>
    </div>
  </nav>
);

export default Navbar;
