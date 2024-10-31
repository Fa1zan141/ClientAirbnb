import React, { useState, useEffect } from 'react';
import ListingCard from '../components/ListingCard';
import './HomePage.css';

// Dummy data
const dummyData = [
  {
    "_id": "10009999",
    "listing_url": "https://www.airbnb.com/rooms/10009999",
    "name": "Horto flat with small garden",
    "summary": "One bedroom + sofa-bed in quiet and bucolic neighbourhood right next to the Botanical Garden. Small garden, outside shower, well equipped kitchen and bathroom with shower and tub.",
    "space": "Lovely one bedroom + sofa-bed in the living room, perfect for two but fits up to four comfortably.  There´s a small outside garden with a shower.",
    "description": "This charming ground floor flat is located in Horto, a quiet and bucolic neighborhood just next to the Botanical Garden.",
    "neighborhood_overview": "You´ll be 30 minutes walk from waterfalls in the rainforest with easy hiking trails!",
    "transit": "Easy access to transport and free parking around. Very close to Gávea, Leblon, Ipanema, Copacabana and Botafogo.",
    "property_type": "Apartment",
    "room_type": "Entire home/apt",
    "bedrooms": 1,
    "beds": 2,
    "bathrooms": {
      "$numberDecimal": "1.0"
    },
    "price": {
      "$numberDecimal": "317.00"
    },
    "images": {
      "picture_url": "https://a0.muscache.com/im/pictures/5b408b9e-45da-4808-be65-4edc1f29c453.jpg?aki_policy=large"
    },
    "host": {
      "host_name": "Ynaie",
      "host_location": "Rio de Janeiro, Brazil"
    }
  },
  {
    "_id": "10010000",
    "listing_url": "https://www.airbnb.com/rooms/10010000",
    "name": "Sunny Apartment near the Beach",
    "summary": "Two bedroom flat located in a lively area close to the beach with a beautiful view.",
    "space": "Spacious two bedroom flat with a balcony, suitable for families.",
    "description": "Perfect for beach lovers! Enjoy the sun and the sea.",
    "neighborhood_overview": "Close to restaurants, cafes, and shops.",
    "transit": "Easily accessible via public transport.",
    "property_type": "Apartment",
    "room_type": "Entire home/apt",
    "bedrooms": 2,
    "beds": 2,
    "bathrooms": {
      "$numberDecimal": "1.0"
    },
    "price": {
      "$numberDecimal": "350.00"
    },
    "images": {
      "picture_url": "https://a0.muscache.com/im/pictures/5b408b9e-45da-4808-be65-4edc1f29c453.jpg?aki_policy=large"
    },
    "host": {
      "host_name": "Carlos",
      "host_location": "Rio de Janeiro, Brazil"
    }
  },
  {
    "_id": "10010001",
    "listing_url": "https://www.airbnb.com/rooms/10010001",
    "name": "Charming Cottage in the City",
    "summary": "A cozy cottage located in a quiet area, perfect for a peaceful getaway.",
    "space": "One bedroom with a small garden.",
    "description": "Experience the tranquility of nature while being close to the city.",
    "neighborhood_overview": "Surrounded by parks and gardens.",
    "transit": "Public transport is easily accessible.",
    "property_type": "Cottage",
    "room_type": "Entire home/apt",
    "bedrooms": 1,
    "beds": 1,
    "bathrooms": {
      "$numberDecimal": "1.0"
    },
    "price": {
      "$numberDecimal": "270.00"
    },
    "images": {
      "picture_url": "https://a0.muscache.com/im/pictures/5b408b9e-45da-4808-be65-4edc1f29c453.jpg?aki_policy=large"
    },
    "host": {
      "host_name": "Alice",
      "host_location": "Rio de Janeiro, Brazil"
    }
  },
  {
    "_id": "10010002",
    "listing_url": "https://www.airbnb.com/rooms/10010002",
    "name": "Modern Loft in Downtown",
    "summary": "Stylish loft in the heart of the city, ideal for young professionals.",
    "space": "One bedroom loft with modern amenities.",
    "description": "Enjoy the vibrant city life while staying in a contemporary space.",
    "neighborhood_overview": "Close to nightlife, restaurants, and public transport.",
    "transit": "Excellent public transport links.",
    "property_type": "Loft",
    "room_type": "Entire home/apt",
    "bedrooms": 1,
    "beds": 1,
    "bathrooms": {
      "$numberDecimal": "1.0"
    },
    "price": {
      "$numberDecimal": "400.00"
    },
    "images": {
      "picture_url": "https://a0.muscache.com/im/pictures/5b408b9e-45da-4808-be65-4edc1f29c453.jpg?aki_policy=large"
    },
    "host": {
      "host_name": "Pedro",
      "host_location": "Rio de Janeiro, Brazil"
    }
  },
  {
    "_id": "10010003",
    "listing_url": "https://www.airbnb.com/rooms/10010003",
    "name": "Serene Studio with Garden View",
    "summary": "A peaceful studio apartment overlooking a beautiful garden.",
    "space": "Cozy studio, perfect for solo travelers or couples.",
    "description": "Relax in a serene environment with all the essentials.",
    "neighborhood_overview": "Quiet neighborhood with easy access to parks.",
    "transit": "Public transport nearby.",
    "property_type": "Studio",
    "room_type": "Entire home/apt",
    "bedrooms": 1,
    "beds": 1,
    "bathrooms": {
      "$numberDecimal": "1.0"
    },
    "price": {
      "$numberDecimal": "290.00"
    },
    "images": {
      "picture_url": "https://a0.muscache.com/im/pictures/5b408b9e-45da-4808-be65-4edc1f29c453.jpg?aki_policy=large"
    },
    "host": {
      "host_name": "Luana",
      "host_location": "Rio de Janeiro, Brazil"
    }
  },
  {
    "_id": "10010004",
    "listing_url": "https://www.airbnb.com/rooms/10010004",
    "name": "Luxury Apartment with Pool",
    "summary": "High-end apartment featuring a pool and gym access.",
    "space": "Two bedrooms with luxury amenities.",
    "description": "Perfect for those looking for comfort and style.",
    "neighborhood_overview": "Located in a prime area with great views.",
    "transit": "Close to major transport routes.",
    "property_type": "Apartment",
    "room_type": "Entire home/apt",
    "bedrooms": 2,
    "beds": 2,
    "bathrooms": {
      "$numberDecimal": "2.0"
    },
    "price": {
      "$numberDecimal": "600.00"
    },
    "images": {
      "picture_url": "https://a0.muscache.com/im/pictures/5b408b9e-45da-4808-be65-4edc1f29c453.jpg?aki_policy=large"
    },
    "host": {
      "host_name": "Ricardo",
      "host_location": "Rio de Janeiro, Brazil"
    }
  },
  {
    "_id": "10010005",
    "listing_url": "https://www.airbnb.com/rooms/10010005",
    "name": "Cozy Cabin in the Woods",
    "summary": "A rustic cabin surrounded by nature, perfect for a quiet retreat.",
    "space": "One bedroom with a rustic charm.",
    "description": "Unplug and enjoy the beauty of nature.",
    "neighborhood_overview": "Located in a tranquil area with hiking trails.",
    "transit": "Access to local transport.",
    "property_type": "Cabin",
    "room_type": "Entire home/apt",
    "bedrooms": 1,
    "beds": 1,
    "bathrooms": {
      "$numberDecimal": "1.0"
    },
    "price": {
      "$numberDecimal": "230.00"
    },
    "images": {
      "picture_url": "https://a0.muscache.com/im/pictures/5b408b9e-45da-4808-be65-4edc1f29c453.jpg?aki_policy=large"
    },
    "host": {
      "host_name": "Fernanda",
      "host_location": "Rio de Janeiro, Brazil"
    }
  },
  {
    "_id": "10010006",
    "listing_url": "https://www.airbnb.com/rooms/10010006",
    "name": "Stylish Condo with City Views",
    "summary": "Modern condo with stunning views of the city skyline.",
    "space": "One bedroom with a stylish design.",
    "description": "Experience luxury living in the heart of the city.",
    "neighborhood_overview": "Close to shopping, dining, and nightlife.",
    "transit": "Convenient public transport access.",
    "property_type": "Condo",
    "room_type": "Entire home/apt",
    "bedrooms": 1,
    "beds": 1,
    "bathrooms": {
      "$numberDecimal": "1.0"
    },
    "price": {
      "$numberDecimal": "450.00"
    },
    "images": {
      "picture_url": "https://a0.muscache.com/im/pictures/5b408b9e-45da-4808-be65-4edc1f29c453.jpg?aki_policy=large"
    },
    "host": {
      "host_name": "Bruno",
      "host_location": "Rio de Janeiro, Brazil"
    }
  },
  {
    "_id": "10010007",
    "listing_url": "https://www.airbnb.com/rooms/10010007",
    "name": "Beachfront Bungalow",
    "summary": "Charming bungalow located right on the beach.",
    "space": "One bedroom with a patio and ocean views.",
    "description": "Enjoy the sun and sea from your doorstep.",
    "neighborhood_overview": "Surrounded by vibrant local culture.",
    "transit": "Public transport available.",
    "property_type": "Bungalow",
    "room_type": "Entire home/apt",
    "bedrooms": 1,
    "beds": 1,
    "bathrooms": {
      "$numberDecimal": "1.0"
    },
    "price": {
      "$numberDecimal": "320.00"
    },
    "images": {
      "picture_url": "https://a0.muscache.com/im/pictures/5b408b9e-45da-4808-be65-4edc1f29c453.jpg?aki_policy=large"
    },
    "host": {
      "host_name": "Marta",
      "host_location": "Rio de Janeiro, Brazil"
    }
  },
  {
    "_id": "10010008",
    "listing_url": "https://www.airbnb.com/rooms/10010008",
    "name": "Urban Oasis with Pool",
    "summary": "Modern apartment featuring a pool, great for relaxing after a day in the city.",
    "space": "One bedroom with all necessary amenities.",
    "description": "Perfect for those seeking comfort and leisure.",
    "neighborhood_overview": "Located in a vibrant neighborhood.",
    "transit": "Excellent transport links.",
    "property_type": "Apartment",
    "room_type": "Entire home/apt",
    "bedrooms": 1,
    "beds": 1,
    "bathrooms": {
      "$numberDecimal": "1.0"
    },
    "price": {
      "$numberDecimal": "375.00"
    },
    "images": {
      "picture_url": "https://a0.muscache.com/im/pictures/5b408b9e-45da-4808-be65-4edc1f29c453.jpg?aki_policy=large"
    },
    "host": {
      "host_name": "Thiago",
      "host_location": "Rio de Janeiro, Brazil"
    }
  }
];

const HomePage = () => {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [listings, setListings] = useState(dummyData); // Set dummy data as initial state
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
          listings.map((listing) => {
            const listingId = listing.reviews && listing.reviews[0]?.listing_id;
            return (
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
