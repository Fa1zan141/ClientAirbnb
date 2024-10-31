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

    // Destructure additional fields from the listing
    const {
        name,
        summary,
        space,
        description,
        neighborhood_overview,
        notes,
        transit,
        access,
        interaction,
        house_rules,
        property_type,
        room_type,
        bed_type,
        minimum_nights,
        maximum_nights,
        cancellation_policy,
        last_scraped,
        first_review,
        last_review,
        accommodates,
        bedrooms,
        beds,
        images,
        review_scores,
        price
    } = listing;

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
            <p className="listing-detail-summary"><strong>Summary:</strong> {summary || 'No summary available.'}</p>
            <p className="listing-detail-price"><strong>Price:</strong> {price ? `$${price.$numberDecimal}/night` : "Price not available"}</p>
            <p className="listing-detail-bedrooms"><strong>Bedrooms:</strong> {bedrooms !== undefined ? bedrooms : "Not specified"}</p>
            <p className="listing-detail-accommodates"><strong>Accommodates:</strong> {accommodates !== undefined ? accommodates : "Not specified"}</p>
            <p className="listing-detail-property-type"><strong>Property Type:</strong> {property_type || 'Not specified'}</p>
            <p className="listing-detail-room-type"><strong>Room Type:</strong> {room_type || 'Not specified'}</p>
            <p className="listing-detail-bed-type"><strong>Bed Type:</strong> {bed_type || 'Not specified'}</p>
            <p className="listing-detail-minimum-nights"><strong>Minimum Nights:</strong> {minimum_nights || 'Not specified'}</p>
            <p className="listing-detail-maximum-nights"><strong>Maximum Nights:</strong> {maximum_nights || 'Not specified'}</p>
            <p className="listing-detail-cancellation-policy"><strong>Cancellation Policy:</strong> {cancellation_policy || 'Not specified'}</p>
            <p className="listing-detail-space"><strong>Space:</strong> {space || 'No details available.'}</p>
            <p className="listing-detail-description"><strong>Description:</strong> {description || 'No description available.'}</p>
            <p className="listing-detail-neighborhood"><strong>Neighborhood Overview:</strong> {neighborhood_overview || 'No details available.'}</p>
            <p className="listing-detail-notes"><strong>Notes:</strong> {notes || 'No notes available.'}</p>
            <p className="listing-detail-transit"><strong>Transit:</strong> {transit || 'No transit details available.'}</p>
            <p className="listing-detail-access"><strong>Access:</strong> {access || 'No access details available.'}</p>
            <p className="listing-detail-interaction"><strong>Interaction:</strong> {interaction || 'No interaction details available.'}</p>
            <p className="listing-detail-house-rules"><strong>House Rules:</strong> {house_rules || 'No house rules available.'}</p>
            <p className="listing-detail-reviews"><strong>Reviews:</strong> ⭐ {review_scores?.review_scores_rating ? `${review_scores.review_scores_rating} (based on reviews)` : "No reviews available"}</p>
            <p className="listing-detail-first-review"><strong>First Review:</strong> {first_review ? new Date(first_review).toLocaleDateString() : 'Not available'}</p>
            <p className="listing-detail-last-review"><strong>Last Review:</strong> {last_review ? new Date(last_review).toLocaleDateString() : 'Not available'}</p>
            <p className="listing-detail-last-scraped"><strong>Last Scraped:</strong> {last_scraped ? new Date(last_scraped).toLocaleDateString() : 'Not available'}</p>
        </div>
    );
};

export default ListingDetailPage;
