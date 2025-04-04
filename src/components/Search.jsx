import React, { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, MapPin, Clock, X, ChevronRight, Filter, Check, Home, Users, CreditCard, Bold, ArrowDown } from 'lucide-react';
import '../styles/Search.css';
import { filterAndSortProperties } from '../services/PropertyService'

const Search = ({ updateProperties, properties }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [locationSearchResult, setLocationSearchResult] = useState([]);
  const [recentSearches] = useState([
    'Aluva Railway Station',
    'Kalamassery'
  ]);

  // Filter states
  const [priceRange, setPriceRange] = useState([]);
  const [bhkOptions, setBhkOptions] = useState([]);
  const [maxDistance, setMaxDistance] = useState(10);
  const [tenantTypes, setTenantTypes] = useState([]);
  const [furnishingTypes, setFurnishingTypes] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);

  const searchRef = useRef(null);
  const inputRef = useRef(null);

  // Available filter options
  const bhkFilterOptions = [
    { label: '1 BHK', value: '1 BHK' },
    { label: '2 BHK', value: '2 BHK' },
    { label: '3 BHK', value: '3 BHK' },
    { label: '4 BHK', value: '4 BHK' },
    { label: '5+ BHK', value: '5+ BHK' }
  ];

  const tenantFilterOptions = [
    { label: 'Boys', value: 'Boys' },
    { label: 'Girls', value: 'Girls' },
    { label: 'Mixed', value: 'Mixed' },
    { label: 'Couples', value: 'Couples' },
    { label: 'Unmarried Couples', value: 'Unmarried Couples' },
    { label: 'Families', value: 'Families' }
  ];

  const furnishingFilterOptions = [
    { value: 'Fully Furnished', label: 'Fully Furnished' },
    { value: 'Semi Furnished', label: 'Semi Furnished' },
    { value: 'Unfurnished', label: 'Unfurnished' }
  ];

  const propertyTypeOptions = [
    { label: 'House', value: 'House' },
    { label: 'Apartment', value: 'Apartment' },
    { label: 'Villa', value: 'Villa' },
    { label: 'Studio', value: 'Studio' },
    { label: 'PG', value: 'PG' }
  ];


  // Handle clicks outside to collapse search
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsExpanded(false);
        setShowFilters(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFocus = () => {
    setShowFilters(false)
    setIsExpanded(true);
  };

  const handleExpand = () => {
    setIsExpanded(true);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
    console.log('With filters:', {
      priceRange,
      bhkOptions,
      maxDistance,
      tenantTypes,
      furnishingTypes,
      propertyTypes
    });
    setIsExpanded(false);
    setShowFilters(false);
  };

  ////-------------HERE WE CAN ADD CALLING API WITH GEO POINT OF PLACE USER SELECT
  const selectLocation = (place) => {
    setSearchTerm(place.structured_formatting.main_text);
    setIsExpanded(false);
    setShowFilters(false);
    console.log(place);


    //Make API Call with searched location lat and lng
    const lat = place.geometry.location.lat;
    const lng = place.geometry.location.lng;

    updateProperties(filterAndSortProperties(properties, lat, lng));

  };
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    fetchLocations(e.target.value);
  }

  const fetchLocations = async (searchQuery) => {
    try {
      // API parameters
      const userLat = 10.0158;
      const userLng = 76.3418;

      const API_KEY = 'iBSJjP4BJbEGDV2IMtxjf7EVNKAJGQkL9CyNwtlT';

      const url = `https://api.olamaps.io/places/v1/autocomplete?input=${encodeURIComponent(searchQuery)}&location=${userLat}%2C${userLng}&radius=10000&strictbounds=true&api_key=${API_KEY}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`API call failed: ${response.status}`);
      }

      const data = await response.json();
      setLocationSearchResult(data);
      return data;

    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const toggleFilter = (filterType, value) => {
    switch (filterType) {
      case 'bhk':
        setBhkOptions(prev =>
          prev.includes(value)
            ? prev.filter(item => item !== value)
            : [...prev, value]
        );
        break;
      case 'tenant':
        setTenantTypes(prev =>
          prev.includes(value)
            ? prev.filter(item => item !== value)
            : [...prev, value]
        );
        break;
      case 'furnishing':
        setFurnishingTypes(prev =>
          prev.includes(value)
            ? prev.filter(item => item !== value)
            : [...prev, value]
        );
        break;
      case 'propertyType':
        setPropertyTypes(prev =>
          prev.includes(value)
            ? prev.filter(item => item !== value)
            : [...prev, value]
        );
        break;
      default:
        break;
    }
  };

  const handleMinPriceChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setPriceRange([value, priceRange[1]]);
  };

  const handleMaxPriceChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setPriceRange([priceRange[0], value]);
  };

  const handleDistanceChange = (e) => {
    setMaxDistance(parseInt(e.target.value));
  };

  const applyFiltersHandler = () => {
    console.log('here');

    const filteredProperties = properties.filter(prop => {
      // Check if rent is within the price range
      console.log(priceRange);

      const priceInRange = prop.pricing.rent >= (priceRange[0] || 0) && (priceRange[1] <= 0 || prop.pricing.rent <= priceRange[1]);

      // Check if bhkType matches any selected bhk option (if any are selected)
      const bhkMatches = bhkOptions.length === 0 || bhkOptions.includes(prop.bhkType);

      // Check if property allows all selected tenant types
      const tenantMatches = tenantTypes.length === 0 ||
        tenantTypes.some(type => prop.tenantPreferences.allowedTenantTypes.includes(type));

      // Check if there's an intersection between selected furnishing types and property's furnishing types
      const furnishingMatches = furnishingTypes.length === 0 ||
        furnishingTypes.some(type => prop.furnishingType.includes(type));

      // Check if there's an intersection between selected property types and property's types
      const propertyTypeMatches = propertyTypes.length === 0 ||
        propertyTypes.some(type => prop.propertyType.includes(type));

      // Check if distance is within max distance (assuming property has location data)
      const distanceMatches = prop.distance ? prop.distance <= maxDistance : true;

      // Return true only if all conditions are met
      console.log(priceInRange, bhkMatches, tenantMatches, furnishingMatches, propertyTypeMatches, distanceMatches)
      return priceInRange && bhkMatches && tenantMatches &&
        furnishingMatches && propertyTypeMatches && distanceMatches;
    });

    console.log(filteredProperties);
    return filteredProperties;
  }

  const resetFilters = () => {
    console.log(properties.filter(prop => prop.rent <= 3000));
    updateProperties(properties.filter(prop => prop.rent <= 3000))

    setPriceRange([minPrice, maxPrice]);
    setBhkOptions([]);
    setMaxDistance(10);
    setTenantTypes([]);
    setFurnishingTypes([]);
    setPropertyTypes([]);
  };

  const countActiveFilters = () => {
    let count = 0;
    if (priceRange[0] > 5000 || priceRange[1] < 30000) count++;
    if (bhkOptions.length > 0) count++;
    if (maxDistance < 10) count++;
    if (tenantTypes.length > 0) count++;
    if (furnishingTypes.length > 0) count++;
    if (propertyTypes.length > 0) count++;
    return count;
  };

  // Helper to count total suggestions
  // const getTotalSuggestionCount = () => {
  //   return Object.values(suggestions).reduce((total, category) => total + category.length, 0);
  // };

  // // Format category names for display
  // const formatCategoryName = (category) => {
  //   switch (category) {
  //     case 'areas': return 'Areas';
  //     case 'stations': return 'Stations';
  //     case 'landmarks': return 'Landmarks';
  //     default: return category.charAt(0).toUpperCase() + category.slice(1);
  //   }
  // };

  // // Format price for display
  // const formatPrice = (price) => {
  //   if (price >= 100000) {
  //     return `₹${(price / 100000).toFixed(1)}L`;
  //   } else if (price >= 1000) {
  //     return `₹${(price / 1000).toFixed(0)}K`;
  //   }
  //   return `₹${price}`;
  // };

  // const filterPanelRef = useFilterPanelEnterKey(setShowFilters, false)

  const handleQuickFilterClick = (filter, option) => {
    toggleFilter(filter, option);
  }

  const appliedFiltersRef = useRef(null);
  const handleScrollToAppliedFilters = () => {
    console.log('outside');
    if (appliedFiltersRef.current) {
      // Scroll the target div to the top
      appliedFiltersRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  };

  const handleQuickPriceFilter = (price) => {
    priceRange.includes(price) ? setPriceRange([priceRange[0], maxPrice]) : setPriceRange([priceRange[0], price]);
  }

  return (
    <div className="search-container" ref={searchRef}>
      {/* Filters Panel */}
      {showFilters && (
        <div className="filters-panel">
          <div className="filters-header">
            <h2 className="filters-title">Filters</h2>
            <div>
              <button
                onClick={resetFilters}
                className="reset-button"
              >
                Reset All
              </button>
              <button
                onClick={() => {
                  applyFiltersHandler();
                  setShowFilters(false);
                  setIsExpanded(false)
                }}
                className="apply-button"
              >
                Apply Filters
              </button>
            </div>
          </div>

          <div className="filters-body">
            {/* Price Range */}
            <div className="quick-filters-section filter-section">
              <h3 className="section-title">Quick Filters</h3>
              <div className="quick-filters">
                <div className="quick-filter" onClick={() => { handleQuickPriceFilter(10000) }}>
                  <Home size={20} className="quick-filter-icon" />
                  <span className="quick-filter-label">Under 10K</span>
                </div>
                <div className="quick-filter" onClick={() => { handleQuickFilterClick('tenant', 'bachelors') }}>
                  <Users size={20} className="quick-filter-icon" />
                  <span className="quick-filter-label">Bachelors</span>
                </div>
                {/* <div className="quick-filter">
                    <CreditCard size={20} className="quick-filter-icon" />
                    <span className="quick-filter-label">No Deposit</span>
                  </div> */}
                <div className="quick-filter" onClick={() => { handleQuickFilterClick('furnishing', 'fully') }}>
                  <Check size={20} className="quick-filter-icon" />
                  <span className="quick-filter-label">Furnished</span>
                </div>
              </div>
            </div>
            <div className="filter-section">
              <h3 className="filter-heading">Price Range</h3>
              <div className="price-inputs">
                <div className="price-input-section">
                  <label>Min</label>
                  <input type="text" placeholder='Min' value={priceRange[0]} className='price-input min-price' onChange={handleMinPriceChange} />
                </div>
                <div className="price-input-section">
                  <label>Max</label>
                  <input type="text" placeholder='Max' value={priceRange[1]} className='price-input max-price' onChange={handleMaxPriceChange} />
                </div>
              </div>
            </div>

            {/* BHK Options */}
            <div className="filter-section">
              <h3 className="filter-heading">BHK</h3>
              <div className="filter-options">
                {bhkFilterOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => toggleFilter('bhk', option.value)}
                    className={`filter-chip ${bhkOptions.includes(option.value) ? 'filter-chip-active' : ''
                      }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Maximum Distance */}
            <div className="filter-section">
              <h3 className="filter-heading">Maximum Distance (Km)</h3>
              <input type="text" onChange={handleDistanceChange} className='distance-input' value={maxDistance} />
              {/* <input 
                type="range" 
                min="1" 
                max="20" 
                value={maxDistance}
                onChange={handleDistanceChange}
                className="range-slider full-width"
              /> */}
            </div>

            {/* Tenant Type */}
            <div className="filter-section">
              <h3 className="filter-heading">Tenant Type</h3>
              <div className="filter-options">
                {tenantFilterOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => toggleFilter('tenant', option.value)}
                    className={`filter-chip ${tenantTypes.includes(option.value) ? 'filter-chip-active' : ''
                      }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Furnishing Status */}
            <div className="filter-section">
              <h3 className="filter-heading">Furnishing</h3>
              <div className="filter-options">
                {furnishingFilterOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => toggleFilter('furnishing', option.value)}
                    className={`filter-chip ${furnishingTypes.includes(option.value) ? 'filter-chip-active' : ''
                      }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Property Type */}
            <div className="filter-section">
              <h3 className="filter-heading">Property Type</h3>
              <div className="filter-options">
                {propertyTypeOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => toggleFilter('propertyType', option.value)}
                    className={`filter-chip ${propertyTypes.includes(option.value) ? 'filter-chip-active' : ''
                      }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Expanded Search Results Panel */}
      {isExpanded && (
        <div className="search-results-panel">
          {/* Search Header */}
          <div className="search-header">
            <h2 className="search-title">Search Properties</h2>
            <button
              onClick={() => { setIsExpanded(false) }}
              className="close-search-button"
            >
              <X size={18} className="close-icon" />
              <span className="close-search-text">Close</span>
            </button>
          </div>

          {/* Suggestions */}
          <div className="suggestions-container">

            {/* Recent Searches Section */}
            {searchTerm.trim() === '' && recentSearches.length > 0 && (
              <div className="search-section">
                <div className="section-header">
                  <h3 className="section-title">Recent</h3>
                </div>
                <div className="search-items">
                  {recentSearches.map((term, index) => (
                    <div
                      key={index}
                      className="search-item"
                      onClick={() => selectLocation(term)}
                    >
                      <Clock size={16} className="clock-icon" />
                      <span className="search-text">{term}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Search Results */}
            {searchTerm.trim() !== '' && (
              <div>
                <div className="search-section">
                  <h3 className="section-title">
                    Search Results
                  </h3>
                  <div className="search-items">
                    {locationSearchResult.predictions && locationSearchResult.predictions.map((place) => (
                      <div
                        key={place.place_id}
                        className="location-item"
                        onClick={() => selectLocation(place)}
                      >
                        <div className="location-item-header">
                          <div className="location-info">
                            <MapPin size={16} className="location-icon" />
                            <span className="location-name">{place.structured_formatting.main_text}</span>
                          </div>
                          <ChevronRight size={16} className="chevron-icon" />
                        </div>
                        <div className="location-item-desc">
                          {place.structured_formatting.secondary_text}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* No Results */}
            {searchTerm.trim() !== '' && !locationSearchResult.predictions && (
              <div className="no-results">
                <p className="no-results-title">No locations found for "{searchTerm}"</p>
                <p className="no-results-message">Try searching for a different location or adjusting your filters</p>
              </div>
            )}

            {/* Popular Search Suggestions (when no term) */}
            {/* {searchTerm.trim() === '' && (
              <div className="search-section">
                <h3 className="section-title">Popular Locations</h3>
                <div className="search-items">
                  {locationData.areas.slice(0, 2).concat(locationData.landmarks.slice(0, 1)).map((location) => (
                    <div
                      key={location.id}
                      className="location-item"
                      onClick={() => selectLocation(location.name)}
                    >
                      <div className="location-item-header">
                        <div className="location-info">
                          <MapPin size={16} className="location-icon" />
                          <span className="location-name">{location.name}</span>
                        </div>
                        <ChevronRight size={16} className="chevron-icon" />
                        </div>
                    </div>
                  ))}
                </div>
              </div>
            )} */}

            {/* Property Quick Filters */}
            {searchTerm.trim() === '' && (
              <div className="quick-filters-section">
                <h3 className="section-title">Quick Filters</h3>
                <div className="quick-filters">
                  <div className="quick-filter" onClick={() => { handleQuickPriceFilter(10000) }}>
                    <Home size={20} className="quick-filter-icon" />
                    <span className="quick-filter-label">Under 10K</span>
                  </div>
                  <div className="quick-filter" onClick={() => { handleQuickFilterClick('tenant', 'bachelors') }}>
                    <Users size={20} className="quick-filter-icon" />
                    <span className="quick-filter-label">Bachelors</span>
                  </div>
                  <div className="quick-filter" onClick={() => { handleQuickFilterClick('furnishing', 'fully') }}>
                    <Check size={20} className="quick-filter-icon" />
                    <span className="quick-filter-label">Furnished</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Search Bar */}
      <div
        className='search-bar'
      >
        {/* <div className={`search-input-container`}> */}
        <form onSubmit={handleSearch} className="search-form search-input-wrapper" onClick={isExpanded ? undefined : handleExpand}>
          <SearchIcon size={24} className="search-icon" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for locations..."
            className="search-input"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={handleFocus}
          />
          <X size={24} className={`clear-icon ${!searchTerm ? 'hidden' : ''}`} onClick={(e) => {
            e.stopPropagation();
            setSearchTerm('');
          }} />
        </form>
        {/* </div> */}
        <button
          onClick={() => {
            setIsExpanded(false)
            setShowFilters(!showFilters)
          }}
          className="filter-button"
        >
          <Filter size={16} className="filter-icon" />
          <span className="filter-text">Filters <span className='active-filters-count'>{countActiveFilters() == 0 ? '' : countActiveFilters()}</span></span>
        </button>
      </div>

      {/* Collapse Handle */}
      {/* {isExpanded && (
        <div className="collapse-handle">
          <button
            onClick={() => {
              setIsExpanded(false);
              setShowFilters(false);
            }}
            className="collapse-button"
          >
            <ArrowDown size={18} className="collapse-icon" />
          </button>
        </div>
      )} */}
    </div>
  );
};

export default Search;