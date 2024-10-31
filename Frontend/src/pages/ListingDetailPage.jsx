import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ListingDetailPage.css';

const ListingDetailPage = () => {
    const { listing_id } = useParams(); 
    console.log("Listing ID from params:", listing_id); 
  
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
        const fetchListingDetails = async () => {
            if (!listing_id) {
                setError('Listing ID is required');
                setLoading(false);
                return;
            }
        
            try {
                const response = await fetch(`http://localhost:3000/api/listings/${listing_id}`);
        
                console.log("Fetching listing details with ID:", listing_id, "Response status:", response.status);
        
                if (!response.ok) {
                    const errorMsg = response.status === 404 ? 'Listing not found' : 'Failed to fetch listing details';
                    throw new Error(errorMsg);
                }
        
                const data = await response.json();
                setListing(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };        

        fetchListingDetails();
    }, [listing_id]);
  
    if (error) {
        return <div className="error">Error fetching listing details: {error}</div>;
    }
    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (!listing) {
        return <div className="error">No listing found.</div>;
    }

    const { name, summary, price, images, bedrooms, property_type, review_scores } = listing;
    const fallbackImage = "https://picsum.photos/600/400";

    return (
        <div className="listing-detail-page">
            <h1 className="listing-detail-title">{name}</h1>
            <img 
                src={images?.picture_url || fallbackImage} 
                alt={name} 
                className="listing-detail-image" 
                onError={(e) => e.target.src = fallbackImage} 
            />
            <p className="listing-detail-summary">{summary || 'No summary available.'}</p>
            <p className="listing-detail-price">Price: {price ? `$${price.$numberDecimal}/night` : "Price not available"}</p>
            <p className="listing-detail-bedrooms">Bedrooms: {bedrooms !== undefined ? bedrooms : "Not specified"}</p>
            <p className="listing-detail-property-type">Property Type: {property_type || 'Not specified'}</p>
            <p className="listing-detail-reviews">⭐ {review_scores?.review_scores_rating ? `${review_scores.review_scores_rating} (based on reviews)` : "No reviews available"}</p>
        </div>
    );
};

export default ListingDetailPage;
