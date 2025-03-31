import React, { useState, useRef } from 'react';
import {useParams, Link} from 'react-router-dom'
import { imageUrlGenerator } from '../utils/imageUtils'
import {capitalizeText} from '../utils/text'
import '../styles/PropertyDetails.css';
import {
  Waves, Dumbbell, Scissors, Utensils, Stethoscope, BatteryFull,
  ParkingCircle, ToyBrick, Flame, BatteryCharging, ArrowUpDown,
  PartyPopper, Shield, Droplets, Trash2, CloudRain, Video, Droplet,
  Car, Bike, Bed, Box, Table, Refrigerator, RefreshCw, Snowflake,
  Sofa, Armchair, Filter, Tv, Microwave, Share, Heart, GalleryHorizontal, Home, ChevronUp, MapPin, BedDouble
} from "lucide-react";

import { useLocation } from 'react-router-dom';



const PropertyDetails = ({ property }) => {
  console.log(property);
  
  const [isFavorite, setIsFavorite] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const topRef = useRef(null);

  // Mock images for gallery
  const propertyImages = property.media.photos;

  // Full list of amenities using only supported icons
  const icons = [
    { icon: <Waves size={20} />, name: "swimming-pool" },
    { icon: <Dumbbell size={20} />, name: "gym" },
    { icon: <Scissors size={20} />, name: "saloon" },
    { icon: <Utensils size={20} />, name: "restaurant" },
    { icon: <Stethoscope size={20} />, name: "doctor-clinic" },
    { icon: <BatteryFull size={20} />, name: "power-backup" },
    { icon: <ParkingCircle size={20} />, name: "parking" },
    { icon: <ToyBrick size={20} />, name: "childrens-park" },
    // { icon: <Tennis size={20} />, name: "badminton-court" },
    { icon: <Flame size={20} />, name: "gas-connection" },
    { icon: <BatteryCharging size={20} />, name: "ev-charging" },
    { icon: <ArrowUpDown size={20} />, name: "lift" },
    { icon: <PartyPopper size={20} />, name: "party-hall" },
    { icon: <Shield size={20} />, name: "security" },
    { icon: <Droplets size={20} />, name: "pure-water-supply" },
    { icon: <Trash2 size={20} />, name: "waste-management" },
    { icon: <CloudRain size={20} />, name: "rainwater-harvesting" },
    { icon: <Video size={20} />, name: "cctv" },
    { icon: <Droplet size={20} />, name: "well-water" },
    { icon: <Droplets size={20} />, name: "bowel-water" },
    // { icon: <Water size={20} />, name: "corporation-water" },
    { icon: <Car size={20} />, name: "car-parking" },
    { icon: <Bike size={20} />, name: "bike-parking" },
    { icon: <Bed size={20} />, name: "cot" },
    { icon: <BedDouble size={20} />, name: "bed" },
    { icon: <Box size={20} />, name: "wardrobe" },
    { icon: <Table size={20} />, name: "tables" },
    // { icon: <Chair size={20} />, name: "chairs" },
    { icon: <Refrigerator size={20} />, name: "fridge" },
    { icon: <RefreshCw size={20} />, name: "washing-machine" },
    { icon: <Flame size={20} />, name: "gas-stove" },
    { icon: <Snowflake size={20} />, name: "ac" },
    { icon: <Sofa size={20} />, name: "sofa" },
    { icon: <Armchair size={20} />, name: "sitting-bench" },
    { icon: <Filter size={20} />, name: "water-purifier" },
    { icon: <Tv size={20} />, name: "tv" },
    { icon: <Microwave size={20} />, name: "oven" }
  ]

  // Function to navigate to next image in gallery
  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === propertyImages.length - 1 ? 0 : prev + 1
    );
  };

  // Function to navigate to previous image in gallery
  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? propertyImages.length - 1 : prev - 1
    );
  };

  // Function to scroll to top
  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="property-listing" ref={topRef}>
      {/* Title */}
      <div className="title-section">
        <h1>{property.title}</h1>
        <div className="meta-info">
          <span className='property-type'>{property.propertyType}</span>
          <span>·</span>
          <span>{property.furnishingType}</span>
          <div className="actions">
            {/* <button><Share size={18} /> <span className='action-button-text'>Share</span></button> */}
            <button><Heart size={18} /> <span className='action-button-text'>Save</span></button>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="image-gallery-section">
        <div className="image-gallery">
          <iframe
            src="https://www.youtube.com/embed/HBFbEmSkrz0"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            className="main-image" >
          </iframe>
          {/* <div className="main-image" onClick={() => { setShowGallery(true); setCurrentImageIndex(0); }}>
          <img src={propertyImages[0].src} alt={propertyImages[0].alt} />
        </div> */}
          <div className="secondary-images">
            <img src={imageUrlGenerator(propertyImages[0].asset._ref)} alt={propertyImages[0].alt} onClick={() => { setShowGallery(true); setCurrentImageIndex(1); }} />
            <img src={imageUrlGenerator(propertyImages[1].asset._ref)} alt={propertyImages[1].alt} onClick={() => { setShowGallery(true); setCurrentImageIndex(2); }} />
          </div>
        </div>
        <button className="show-all-button" onClick={() => { setShowGallery(true); setCurrentImageIndex(0); }}>
          <GalleryHorizontal size={18} />
          Show all
        </button>
      </div>

      {/* Property Details */}
      <div className="property-desc-details">
        <div className="heading">
          <h2>2BHK Apartment</h2>
          <div className="actions">
            <button><Share size={18} /></button>
            <button>Book Visit</button>
          </div>
        </div>
        <div className="meta-info">
          <div className="meta-info-items">
            <span className='meta-info-item'>{property.tenantPreferences.occupancyLimits.maxOccupants} persons</span>
            <span>·</span>
            <span className='meta-info-item'>2 bedroom</span>
          </div>
          <div className="price-info">
            <span className='span-price'>₹{property.pricing.rent}</span>
            <span className='span-deposit'>(Deposit {property.pricing.depositMonths}months / {property.pricing.deposit})</span>
          </div>
        </div>
      </div>

      {/* Furnishing Details */}
      <div className="furnishing-details">
        <h3>Furnishing Details</h3>
        <div className="furnishing-grid">
          {icons.filter(icon => property.furnitures.includes(icon.name)).map((icon, index) => (<div key={index} className='furnishing-item'>
              {icon.icon} {capitalizeText(icon.name)}
            </div>))}
        </div>
      </div>

      {/* Nearby Locations */}
      <div className="nearby-locations">
        <h3>Near by locations</h3>
        <div className="location-list">
          <div><MapPin size={16} /> 5km from Wonderla</div>
          <div><MapPin size={16} /> 3km from INFOPARK phase 1</div>
        </div>
      </div>

      {/* What this stay offers */}
      <div className="amenities-section">
        <h3>What this stay offers</h3>
        <div className="amenities-grid">
        {icons.filter(icon => {
          const amenities = showAllAmenities ? property.amenities : property.amenities.slice(0, 6);
          return amenities.includes(icon.name)
          }).map((icon, index) => (<div key={index} className='amenities-item'>
              {icon.icon} {capitalizeText(icon.name)}
            </div>))}
        </div>
        {property.amenities.length > 6 && <button className='show-amenities-btn' onClick={() => setShowAllAmenities(!showAllAmenities)}>
          {showAllAmenities ? "Show less" : "Show all amenities "}
        </button>}
      </div>

      {/* Description */}
      {property.description && <div className="description">
        <h3>Description</h3>
        <p>
          Come and stay in this superb duplex T2, in the heart of the historic center of Bordeaux.
          Spacious and bright, in a real Bordeaux building in exposed stone, you will enjoy all the
          charms of the city thanks to its ideal location. Close to many shops, bars and restaurants,
          you can access the apartment by tram A and C and bus routes 27 and 44.
        </p>
      </div>}

      {/* Move to top button */}
      <div className="move-to-top">
        <button onClick={scrollToTop}>
          <ChevronUp size={16} /> Move to top
        </button>
      </div>

      {/* Image Gallery Modal */}
      {showGallery && (
        <div className={`gallery-modal ${showGallery ? 'open' : ''}`}>
          <div className="modal-header">
            <span>{currentImageIndex + 1}/{propertyImages.length}</span>
            <button onClick={() => setShowGallery(false)}>
              <X size={24} color='white'/>
            </button>
          </div>
          <div className="modal-body">
            <button onClick={prevImage}><ChevronLeft size={24} /></button>
            <img src={imageUrlGenerator(propertyImages[currentImageIndex].asset._ref)} alt={propertyImages[currentImageIndex].alt} />
            <button onClick={nextImage}><ChevronRight size={24} /></button>
          </div>
          <div className="modal-thumbnails">
            {propertyImages.map((image, index) => (
              <div
                key={image._key}
                className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <img src={imageUrlGenerator(image.asset._ref)}  alt={image.alt} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;