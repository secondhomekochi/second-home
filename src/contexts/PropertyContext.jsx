// src/contexts/PropertyContext.js
import { createContext, useState, useContext, useEffect } from 'react';
import { fetchProperties } from '../services/PropertyService';

const PropertyContext = createContext();

export const usePropertyContext = () => useContext(PropertyContext);

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [propertiesBackup, setPropertiesBackup] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        setLoading(true);
        const result = await fetchProperties();
        setProperties(result);
        setPropertiesBackup(result);
      } catch (err) {
        setError('Failed to load properties');
        console.error('Error loading properties:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, []);

  const updateProperties = (newProperties) => {
    setProperties(newProperties);
  };

  const resetProperties = () => {
    setProperties(propertiesBackup);
  }

  const selectProperty = (propertyId) => {
    const property = properties.find(property => property._id === propertyId);
    setSelectedProperty(property);
  };

  return (
    <PropertyContext.Provider value={{ 
      properties, 
      loading, 
      error, 
      updateProperties,
      selectProperty, 
      selectedProperty,
      resetProperties,
      propertiesBackup
    }}>
      {children}
    </PropertyContext.Provider>
  );
};