import React, { useState, useEffect } from 'react';
import ListingCard from '../components/ListingCard';
import './HomePage.css';

const HomePage = () => {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [listings, setListings] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]); // State for property types
  const [bedroomOptions, setBedroomOptions] = useState([]); // State for bedroom counts

  // Fetch property types and bedroom options on component mount
  useEffect(() => {
    const fetchPropertyTypes = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/listings/property-types');
        const types = await response.json();
        setPropertyTypes(types);
      } catch (error) {
        console.error('Error fetching property types:', error);
      }
    };

    const fetchBedrooms = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/listings/bedrooms');
        const bedrooms = await response.json();
        setBedroomOptions(bedrooms);
      } catch (error) {
        console.error('Error fetching bedrooms:', error);
      }
    };

    fetchPropertyTypes();
    fetchBedrooms();
  }, []);

  // Handle search listings
  const handleSearch = async (e) => {
    e.preventDefault();
    
    try {
      const query = new URLSearchParams({
        location,
        property_type: propertyType,
        bedrooms
      }).toString();

      const response = await fetch (`http://localhost:3000/api/listings?${query}`);
      const data = await response.json();
      setListings(data);
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };

  return (
    <div className="container">
      <section className="form-section">
        <h2>Find Your Perfect Stay</h2>
        <form onSubmit={handleSearch}>
          <div className="form-group">
            <label htmlFor="location">Location *</label>
            <input
              type="text"
              id="location"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="propertyType">Type of Property</label>
            <select
              id="propertyType"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="input"
            >
              <option value="">Select property type</option>
              {propertyTypes.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="bedrooms">Number of Bedrooms</label>
            <select
              id="bedrooms"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="input"
            >
              <option value="">Select number of bedrooms</option>
              {bedroomOptions.map((bedroom, index) => (
                <option key={index} value={bedroom}>{bedroom}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="submit-btn">Search</button>
        </form>
      </section>

      <section className="property-listing">
      {listings.length > 0 ? (
          listings?.map((listing) => {
            // Extract listing_id from the reviews array (assuming it's in the first review)
            const listingId = listing.reviews && listing.reviews[0]?.listing_id;
            return (
              // Use listingId from the first review as the key
              <ListingCard key={listingId} listing={listing} listingId={listingId} />
            );
          })
        ) : (
          <p>No listings found. Please adjust your search criteria.</p>
        )}
      </section>
    </div>
  );
};

export default HomePage;