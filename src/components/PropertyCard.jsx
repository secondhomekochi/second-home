import React from 'react';
import { Link } from 'react-router-dom'
import { Heart, Bed, Sofa } from 'lucide-react';
import '../styles/PropertyCard.css';

const PropertyCard = ({ property }) => {
  return (
    <div className="property-card">
      {/* Property Image with Distance Badge */}
      <div className="image-container">
        <img
          src={property.image}
          alt="Palarivattam Hostel"
          className="property-image"
        />
        <div className="distance-badge">
          4.0 Km
        </div>
      </div>

      {/* Property Details */}
      <div className="property-details">
        {/* Property Type and Favorite Button */}
        <div className="property-header">
          <h2 className="property-name">{property.name} <span className='property-type'>({property.type})</span></h2>
          {/* <p className="property-type">Hostel</p> */}
          <button className="favorite-button">
            <Heart size={28} className='heart-icon' />
          </button>
        </div>

        {/* Property Name */}
        {/* <h2 className="property-name">Palarivattam</h2> */}

        {/* Property Availability */}
        <p className="property-availability">Available for {property.availability}</p>

        {/* Property Features - BHK and Furnishing */}
        <div className="property-features">
          <div className="feature-item">
            <Bed size={18} />
            <span>{property.bhk}</span>
          </div>
          <div className="feature-item">
            <Sofa size={18} />
            <span>{property.furnishing}</span>
          </div>
        </div>

        {/* Price and View Details */}
        <div className="property-footer">
          <div className="price-container">
            <span className="price-amount">{property.price}</span>
            <span className="price-period">/month</span>
          </div>
          <Link to={'/property/1'} >
            <button className="view-details-button">
              View Details
              <svg
                className="arrow-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;