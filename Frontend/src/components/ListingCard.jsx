import React from 'react';
import { Link } from 'react-router-dom';
import './ListingCard.css';

const ListingCard = ({ listing, listingId }) => {
  const {
    _id,
    name,
    summary,
    price,
    images,
    number_of_reviews,
  } = listing;

  const fallbackImage = "https://picsum.photos/300/200";
  const defaultSummary = "A wonderful place to stay with amazing amenities and a comfortable environment.";
  const defaultReviews = "No reviews available";

  return (
    <div className="listing-card">
      <img 
        src={images?.picture_url || fallbackImage} 
        alt={name} 
        className="listing-card-image" 
        onError={(e) => e.target.src = fallbackImage} 
      />
      <h2 className="listing-card-title">{name}</h2>
      <p className="listing-card-summary">{summary || defaultSummary}</p>
      <p className="listing-card-price">
        {price ? `$${price.$numberDecimal}/night` : "Price not available"}
      </p>
      <p className="listing-card-rating">
        ⭐ {number_of_reviews ? `${number_of_reviews} Reviews` : defaultReviews}
      </p>
      <Link 
        to={`/listing-detail/${listingId}`} 
        className="listing-card-link"
      >
        View Details
      </Link>
    </div>
  );
};

export default ListingCard;
