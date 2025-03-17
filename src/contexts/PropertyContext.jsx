// src/contexts/PropertyContext.js
import { createContext, useState, useContext, useEffect } from 'react';
import { fetchProperties } from '../services/PropertyService';

const PropertyContext = createContext();

export const usePropertyContext = () => useContext(PropertyContext);

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        setLoading(true);
        const result = await fetchProperties();
        setProperties(result);
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

  return (
    <PropertyContext.Provider value={{ 
      properties, 
      loading, 
      error, 
      updateProperties 
    }}>
      {children}
    </PropertyContext.Provider>
  );
};