// src/components/ListingCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './ListingCard.css';

const ListingCard = ({ listing }) => {
  const {
    _id,
    name,
    summary,
    price,
    images,
    number_of_reviews,
  } = listing;

  return (
    <div className="listing-card">
      <img 
        src={images.picture_url} 
        alt={name} 
        className="listing-card-image" 
      />
      <h2 className="listing-card-title">{name}</h2>
      <p className="listing-card-summary">{summary}</p>
      <p className="listing-card-price">${price.$numberDecimal}/night</p>
      <p className="listing-card-rating">⭐ {number_of_reviews} Reviews</p>
      <Link 
        to={`/bookings?listing_id=${_id}`} 
        className="listing-card-link"
      >
        View Details
      </Link>
    </div>
  );
};

export default ListingCard;
