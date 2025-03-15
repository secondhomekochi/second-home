import React, { useState, useRef } from 'react';
import {useParams, Link} from 'react-router-dom'
import { Heart, Share, MapPin, Wifi, Home, Refrigerator, Cpu, Car, Video, X, ChevronLeft, ChevronRight, Coffee, Tv, ChevronUp, Sun, Lock, Utensils, GalleryHorizontal } from 'lucide-react';
import '../styles/PropertyDetails.css';

const PropertyDetails = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const topRef = useRef(null);

  // Mock images for gallery
  const propertyImages = [
    { id: 1, src: "https://placehold.co/600x400", alt: "Living Room" },
    { id: 2, src: "https://placehold.co/600x400", alt: "Dining Area" },
    { id: 3, src: "https://placehold.co/600x400", alt: "Kitchen" },
    { id: 4, src: "https://placehold.co/600x400", alt: "Bedroom 1" },
    { id: 5, src: "https://placehold.co/600x400", alt: "Bedroom 2" },
    { id: 6, src: "https://placehold.co/600x400", alt: "Bathroom" }
  ];

  // Full list of amenities using only supported icons
  const allAmenities = [
    { icon: <Wifi size={20} />, name: "Wifi" },
    { icon: <Cpu size={20} />, name: "Kitchen" },
    { icon: <Refrigerator size={20} />, name: "Refrigerator" },
    { icon: <Cpu size={20} />, name: "Washing Machine" },
    { icon: <Car size={20} />, name: "Car & Bike Parking" },
    { icon: <Video size={20} />, name: "Security cameras on property" },
    { icon: <Tv size={20} />, name: "TV" },
    { icon: <Coffee size={20} />, name: "Coffee maker" },
    { icon: <Sun size={20} />, name: "Air conditioning" },
    { icon: <Cpu size={20} />, name: "Hot water" },
    { icon: <Lock size={20} />, name: "24/7 security" },
    { icon: <Utensils size={20} />, name: "Dining table" }
  ];

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
        <h1>Thengod, Vayanashala</h1>
        <div className="meta-info">
          <span className='property-type'>Apartment</span>
          <span>·</span>
          <span>Semi Furnished</span>
          <div className="actions">
            <button><Share size={18} /> <span className='action-button-text'>Share</span></button>
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
            <img src='https://placehold.co/200x400' alt={propertyImages[1].alt} onClick={() => { setShowGallery(true); setCurrentImageIndex(1); }} />
            <img src={propertyImages[2].src} alt={propertyImages[2].alt} onClick={() => { setShowGallery(true); setCurrentImageIndex(2); }} />
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
            <span className='meta-info-item'>4 persons</span>
            <span>·</span>
            <span className='meta-info-item'>2 bedroom</span>
          </div>
          <div className="price-info">
            <span className='span-price'>₹15,000</span>
            <span className='span-deposit'>(Deposit 2months)</span>
          </div>
        </div>
      </div>

      {/* Furnishing Details */}
      <div className="furnishing-details">
        <h3>Furnishing Details</h3>
        <div className="amenities-grid">
          <div><Home size={20} /> 3 Beds</div>
          <div><Cpu size={20} /> Kitchen</div>
          <div><Refrigerator size={20} /> Refrigerator</div>
          <div><Cpu size={20} /> Washing Machine</div>
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
          {(showAllAmenities ? allAmenities : allAmenities.slice(0, 6)).map((amenity, index) => (
            <div key={index}>
              {amenity.icon} {amenity.name}
            </div>
          ))}
        </div>
        <button className='show-amenities-btn' onClick={() => setShowAllAmenities(!showAllAmenities)}>
          {showAllAmenities ? "Show less" : "Show all 37 amenities"}
        </button>
      </div>

      {/* Description */}
      <div className="description">
        <h3>Description</h3>
        <p>
          Come and stay in this superb duplex T2, in the heart of the historic center of Bordeaux.
          Spacious and bright, in a real Bordeaux building in exposed stone, you will enjoy all the
          charms of the city thanks to its ideal location. Close to many shops, bars and restaurants,
          you can access the apartment by tram A and C and bus routes 27 and 44.
        </p>
      </div>

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
              <X size={24} />
            </button>
          </div>
          <div className="modal-body">
            <button onClick={prevImage}><ChevronLeft size={24} /></button>
            <img src={propertyImages[currentImageIndex].src} alt={propertyImages[currentImageIndex].alt} />
            <button onClick={nextImage}><ChevronRight size={24} /></button>
          </div>
          <div className="modal-thumbnails">
            {propertyImages.map((image, index) => (
              <div
                key={image.id}
                className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <img src={image.src} alt={image.alt} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;