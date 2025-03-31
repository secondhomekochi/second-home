import React from 'react';
import { Link } from 'react-router-dom'
import { Heart, Bed, Sofa } from 'lucide-react';
import '../styles/PropertyCard.css';
import { formatDistance } from '../utils/distanceFormatUtil'
import { imageUrlGenerator } from '../utils/imageUtils'

const PropertyCard = ({ property, selectProperty }) => {
  try {
    return (
      <div className="property-card">
        {/* Property Image with Distance Badge */}
        <div className="image-container">
          <img
            src={imageUrlGenerator(property.media.photos[0].asset._ref)}
            alt="Palarivattam Hostel"
            className="property-image"
          />
          {property.distance && (
            <div className="distance-badge">
              {formatDistance(property.distance)}
            </div>
          )}
        </div>
  
        {/* Property Details */}
        <div className="property-details">
          {/* Property Type and Favorite Button */}
          <div className="property-header">
            <h2 className="property-name">{property.title}
              <span className='property-type'>
                {property.propertyType}
              </span>
            </h2>
            <Heart size={24} className='heart-icon' />
          </div>
  
          {/* Property Availability */}
          <p className="property-availability">Available for {property.tenantPreferences.allowedTenantTypes.join(', ')}</p>
  
          {/* Property Features - BHK and Furnishing */}
          <div className="property-features">
            <div className="feature-item">
              <Bed size={18} />
              <span>{property.bhkType}</span>
            </div>
            <div className="feature-item">
              <Sofa size={18} />
              <span>{property.furnishingType}</span>
            </div>
          </div>
  
          {/* Price and View Details */}
          <div className="property-footer">
            <div className="price-container">
              <span className="price-amount">{property.pricing.rent}</span>
              <span className="price-period-long">/month</span>
              <span className="price-period-short">/mo</span>
            </div>
            <Link to={'/property/1'} onClick={()=>{selectProperty(property._id)}} >
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
  } catch (error) {
    console.warn(error)
  }
};

export default PropertyCard;