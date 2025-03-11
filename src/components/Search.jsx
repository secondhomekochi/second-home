import React, { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, MapPin, Clock, X, ChevronRight, Filter, Check, Home, Users, CreditCard, Bold, ArrowDown } from 'lucide-react';
import '../styles/Search.css';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches] = useState([
    'Aluva Railway Station', 
    'Kalamassery'
  ]);
  
  // Filter states
  const [priceRange, setPriceRange] = useState([5000, 30000]);
  const [bhkOptions, setBhkOptions] = useState([]);
  const [maxDistance, setMaxDistance] = useState(10);
  const [tenantTypes, setTenantTypes] = useState([]);
  const [furnishingTypes, setFurnishingTypes] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  
  // Mock location data categorized
  const locationData = {
    areas: [
      { id: 1, name: 'Kalamassery', distance: '3.2 Km' },
      { id: 2, name: 'Edapally Junction', distance: '5.8 Km' },
      { id: 3, name: 'Palarivattam', distance: '4.0 Km' }, 
      { id: 4, name: 'Vytilla', distance: '7.3 Km' }
    ],
    stations: [
      { id: 5, name: 'Aluva Railway Station', distance: '4.0 Km' },
      { id: 6, name: 'Ernakulam Junction', distance: '9.1 Km' }
    ],
    landmarks: [
      { id: 7, name: 'Lulu Mall', distance: '5.2 Km' },
      { id: 8, name: 'Marine Drive', distance: '8.4 Km' },
      { id: 9, name: 'Chittethukara near palarivattom', distance: '4.0 Km' }
    ]
  };
  
  // Available filter options
  const bhkFilterOptions = [
    { value: '1', label: '1 BHK' },
    { value: '2', label: '2 BHK' },
    { value: '3', label: '3 BHK' },
    { value: '4', label: '4+ BHK' }
  ];
  
  const tenantFilterOptions = [
    { value: 'family', label: 'Family' },
    { value: 'bachelors', label: 'Bachelors' },
    { value: 'couples', label: 'Couples' }
  ];
  
  const furnishingFilterOptions = [
    { value: 'fully', label: 'Fully Furnished' },
    { value: 'semi', label: 'Semi Furnished' },
    { value: 'unfurnished', label: 'Unfurnished' }
  ];
  
  const propertyTypeOptions = [
    { value: 'apartment', label: 'Apartment' },
    { value: 'independent', label: 'Independent House' },
    { value: 'pg', label: 'PG/Hostel' },
    { value: 'villa', label: 'Villa' }
  ];
  
  // Simulate API call for location suggestions
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestions([]);
      return;
    }
    
    // Filter locations based on search term (simulating API response)
    const results = {};
    
    Object.keys(locationData).forEach(category => {
      const matches = locationData[category]
        .filter(location => 
          location.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          parseFloat(location.distance) <= maxDistance
        );
      
      if (matches.length > 0) {
        results[category] = matches;
      }
    });
    
    setSuggestions(results);
  }, [searchTerm, maxDistance]);
  
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
  
  const selectLocation = (locationName) => {
    setSearchTerm(locationName);
    setIsExpanded(false);
    setShowFilters(false);
  };
  
  const toggleFilter = (filterType, value) => {
    switch(filterType) {
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
    const value = parseInt(e.target.value);
    setPriceRange([value, priceRange[1]]);
  };
  
  const handleMaxPriceChange = (e) => {
    const value = parseInt(e.target.value);
    setPriceRange([priceRange[0], value]);
  };
  
  const handleDistanceChange = (e) => {
    setMaxDistance(parseInt(e.target.value));
  };
  
  const resetFilters = () => {
    setPriceRange([5000, 30000]);
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
  const getTotalSuggestionCount = () => {
    return Object.values(suggestions).reduce((total, category) => total + category.length, 0);
  };
  
  // Format category names for display
  const formatCategoryName = (category) => {
    switch(category) {
      case 'areas': return 'Areas';
      case 'stations': return 'Stations';
      case 'landmarks': return 'Landmarks';
      default: return category.charAt(0).toUpperCase() + category.slice(1);
    }
  };
  
  // Format price for display
  const formatPrice = (price) => {
    if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)}L`;
    } else if (price >= 1000) {
      return `₹${(price / 1000).toFixed(0)}K`;
    }
    return `₹${price}`;
  };

  return (
    <div className="search-container" ref={searchRef}>
      {/* Filters Panel */}
      {isExpanded && showFilters && (
        <div className="filters-panel">
          <div className="filters-header">
            <h2 className="filters-title">Filters</h2>
            <button 
              onClick={resetFilters}
              className="reset-button"
            >
              Reset All
            </button>
          </div>
          
          <div className="filters-body">
            {/* Price Range */}
            <div className="filter-section">
              <h3 className="filter-heading">Price Range</h3>
              {/* <div className="price-display">
                <span className="price-value">{formatPrice(priceRange[0])}</span>
                <span className="price-value">{formatPrice(priceRange[1])}</span>
              </div> */}
              <div className="price-inputs">
                <div className="price-input-section">
                <label>Min</label>
                <input type="text" className='price-input min-price' placeholder='3000' />
                </div>
                <div className="price-input-section">
                <label>Max</label>
                <input type="text" className='price-input max-price'placeholder='100000' />
                </div>
              </div>
              {/* <div className="range-inputs">
                <input 
                  type="range" 
                  min="5000" 
                  max="30000" 
                  step="500"
                  value={priceRange[0]}
                  onChange={handleMinPriceChange}
                  className="range-slider"
                />
                <input 
                  type="range" 
                  min="5000" 
                  max="30000" 
                  step="500"
                  value={priceRange[1]}
                  onChange={handleMaxPriceChange}
                  className="range-slider"
                />
              </div> */}
            </div>
            
            {/* BHK Options */}
            <div className="filter-section">
              <h3 className="filter-heading">BHK</h3>
              <div className="filter-options">
                {bhkFilterOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => toggleFilter('bhk', option.value)}
                    className={`filter-chip ${
                      bhkOptions.includes(option.value) ? 'filter-chip-active' : ''
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
              <input type="text" className='distance-input' placeholder='10'/>
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
                    className={`filter-chip ${
                      tenantTypes.includes(option.value) ? 'filter-chip-active' : ''
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
                    className={`filter-chip ${
                      furnishingTypes.includes(option.value) ? 'filter-chip-active' : ''
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
                    className={`filter-chip ${
                      propertyTypes.includes(option.value) ? 'filter-chip-active' : ''
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="filters-footer">
            <button
              onClick={() => {
                setShowFilters(false);
              }}
              className="apply-button"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
      
      {/* Expanded Search Results Panel */}
      {isExpanded && !showFilters && (
        <div className="search-results-panel">
          {/* Search Header */}
          <div className="search-header">
            <h2 className="search-title">Search Properties</h2>
            <button 
              onClick={() => setShowFilters(true)}
              className="filter-button"
            >
              <Filter size={16} className="filter-icon" />
              <span className="filter-text">Filters</span>
              {countActiveFilters() > 0 && (
                <span className="filter-count">
                  {countActiveFilters()}
                </span>
              )}
            </button>
          </div>
          
          {/* Suggestions */}
          <div className="suggestions-container">
            {/* Applied Filters Summary */}
            {countActiveFilters() > 0 && (
              <div className="applied-filters">
                <h3 className="applied-filters-title">Applied Filters:</h3>
                <div className="applied-filters-list">
                  {priceRange[0] > 5000 || priceRange[1] < 30000 ? (
                    <div className="applied-filter">
                      {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                    </div>
                  ) : null}
                  
                  {bhkOptions.length > 0 && (
                    <div className="applied-filter">
                      {bhkOptions.length === 1 ? bhkOptions[0] + ' BHK' : `${bhkOptions.length} BHK options`}
                    </div>
                  )}
                  
                  {maxDistance < 10 && (
                    <div className="applied-filter">
                      Max {maxDistance} km
                    </div>
                  )}
                  
                  {tenantTypes.length > 0 && (
                    <div className="applied-filter">
                      {tenantTypes.length === 1 
                        ? tenantFilterOptions.find(o => o.value === tenantTypes[0])?.label 
                        : `${tenantTypes.length} tenant types`}
                    </div>
                  )}
                  
                  {furnishingTypes.length > 0 && (
                    <div className="applied-filter">
                      {furnishingTypes.length === 1 
                        ? furnishingFilterOptions.find(o => o.value === furnishingTypes[0])?.label 
                        : `${furnishingTypes.length} furnishing types`}
                    </div>
                  )}
                  
                  {propertyTypes.length > 0 && (
                    <div className="applied-filter">
                      {propertyTypes.length === 1 
                        ? propertyTypeOptions.find(o => o.value === propertyTypes[0])?.label 
                        : `${propertyTypes.length} property types`}
                    </div>
                  )}
                </div>
              </div>
            )}
            
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
                      <Clock size={16} className="search-icon" />
                      <span className="search-text">{term}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Search Results */}
            {searchTerm.trim() !== '' && Object.keys(suggestions).length > 0 && (
              <div>
                {Object.keys(suggestions).map((category) => (
                  <div key={category} className="search-section">
                    <h3 className="section-title">
                      {formatCategoryName(category)}
                    </h3>
                    <div className="search-items">
                      {suggestions[category].map((location) => (
                        <div 
                          key={location.id}
                          className="location-item"
                          onClick={() => selectLocation(location.name)}
                        >
                          <div className="location-info">
                            <MapPin size={16} className="location-icon" />
                            <span className="location-name">{location.name}</span>
                          </div>
                          <div className="location-distance">
                            <span className="distance-text">{location.distance}</span>
                            <ChevronRight size={16} className="chevron-icon" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* No Results */}
            {searchTerm.trim() !== '' && getTotalSuggestionCount() === 0 && (
              <div className="no-results">
                <p className="no-results-title">No locations found for "{searchTerm}"</p>
                <p className="no-results-message">Try searching for a different location or adjusting your filters</p>
              </div>
            )}
            
            {/* Popular Search Suggestions (when no term) */}
            {searchTerm.trim() === '' && (
              <div className="search-section">
                <h3 className="section-title">Popular Locations</h3>
                <div className="search-items">
                  {locationData.areas.slice(0, 2).concat(locationData.landmarks.slice(0, 1)).map((location) => (
                    <div 
                      key={location.id}
                      className="location-item"
                      onClick={() => selectLocation(location.name)}
                    >
                      <div className="location-info">
                        <MapPin size={16} className="location-icon" />
                        <span className="location-name">{location.name}</span>
                      </div>
                      <div className="location-distance">
                        <span className="distance-text">{location.distance}</span>
                        <ChevronRight size={16} className="chevron-icon" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Property Quick Filters */}
            {searchTerm.trim() === '' && (
              <div className="quick-filters-section">
                <h3 className="section-title">Quick Filters</h3>
                <div className="quick-filters">
                  <div className="quick-filter">
                    <Home size={20} className="quick-filter-icon" />
                    <span className="quick-filter-label">Under 10K</span>
                  </div>
                  <div className="quick-filter">
                    <Users size={20} className="quick-filter-icon" />
                    <span className="quick-filter-label">Bachelors</span>
                  </div>
                  <div className="quick-filter">
                    <CreditCard size={20} className="quick-filter-icon" />
                    <span className="quick-filter-label">No Deposit</span>
                  </div>
                  <div className="quick-filter">
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
        className={`search-bar ${isExpanded ? '' : 'search-bar-collapsed'}`}
        onClick={isExpanded ? undefined : handleExpand}
      >
        <div className={`search-input-container`}>
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-wrapper">
              <SearchIcon size={20} className="search-input-icon" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for locations..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={handleFocus}
              />
              {searchTerm && (
                  <X size={24} className='clear-icon' onClick={(e) => {
                    e.stopPropagation();
                    setSearchTerm('');
                  }}/>
              )}
            </div>
            {/* {isExpanded && (
              <button
                type="submit"
                className="search-button"
              >
                Search
              </button>
            )} */}
          </form>
        </div>
      </div>
      
      {/* Collapse Handle */}
      {isExpanded && (
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
      )}
    </div>
  );
};

export default Search;