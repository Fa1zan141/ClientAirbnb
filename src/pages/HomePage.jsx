// src/pages/HomePage.jsx
import React, { useState } from 'react';
import ListingCard from '../components/ListingCard';
import './HomePage.css';

const HomePage = () => {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [listings, setListings] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    
    const fetchListings = async () => {
      const allListings = [
        {
          id: 1,
          name: "Luxury Apartment",
          summary: "A luxurious apartment in the heart of Barcelona.",
          daily_price: "$200",
          rating: "4.5",
        },
        {
          id: 2,
          name: "Cozy Studio",
          summary: "Perfect for solo travelers or couples.",
          daily_price: "$100",
          rating: "4.0",
        },
        {
          id: 3,
          name: "Beachfront Villa",
          summary: "A stunning villa with ocean views.",
          daily_price: "$300",
          rating: "5.0",
        },
      ];

      // Filter listings based on user inputs
      const filteredListings = allListings.filter(listing => {
        const matchesLocation = location ? listing.summary.includes(location) : true;
        const matchesType = propertyType ? listing.type === propertyType : true;
        const matchesBedrooms = bedrooms ? listing.bedrooms === Number(bedrooms) : true;
        return matchesLocation && matchesType && matchesBedrooms;
      });

      setListings(filteredListings);
    };

    fetchListings();
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
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Studio">Studio</option>
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
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <button type="submit" className="submit-btn">Search</button>
        </form>
      </section>

      <section className="property-listing">
        {listings.length > 0 ? (
          listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))
        ) : (
          <p>No listings found. Please adjust your search criteria.</p>
        )}
      </section>
    </div>
  );
};

export default HomePage;

