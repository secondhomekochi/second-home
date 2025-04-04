// src/services/propertyService.js
import haversine from 'haversine';
import {getLikedProperties} from '../utils/propertyLikeUtil'

const API_URL = 'https://m72dalv4.apicdn.sanity.io/v2024-08-13/data/query/production';

export const fetchProperties = async () => {
  try {
    const url = `${API_URL}?query=*%5B_type+%3D%3D+%22property%22+%26%26+%21%28_id+in+path%28%27drafts.**%27%29%29%5D&returnQuery=false`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`);
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
};

// You can add more API functions here as needed
export const fetchPropertyByDistance = async ({ lat, lng }) => {
  try {
    const radius = 10000;

    const query = `*[_type == "property" &&!(_id in path('drafts.**')) && geo::distance(location, geo::latLng(${lat}, ${lng})) < ${radius}]{...,"distance":geo::distance(location, geo::latLng(${lat}, ${lng}))} | order(distance asc)`;

    // `*[_type == "property" && !((_id in path('drafts.**'))) && geo::distance(location, geo::latLng(${lat}, ${lng})) < ${radius}]`;

    const url = `${API_URL}?query=${encodeURIComponent(query)}&returnQuery=false`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`);
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error(`Error fetching property with id ${id}:`, error);
    throw error;
  }
};

/**
 * Filters and sorts properties based on distance from a given point.
 * @param {Array} properties - List of properties.
 * @param {number} lat - Latitude of the reference point.
 * @param {number} lng - Longitude of the reference point.
 * @param {number} radius - Maximum distance in kilometers.
 * @returns {Array} - Filtered and sorted list of properties.
 */
export const filterAndSortProperties = (properties, lat, lng) => {
  const radius = 10

  return properties
    .map(property => {
      const distance = haversine(
        { latitude: lat, longitude: lng }, // Reference point
        { latitude: property.location.coordinates.lat, longitude: property.location.coordinates.lng }// Property location
      );
      return { ...property, distance }; // Add distance to the property object
    })
    .sort((a, b) => a.distance - b.distance); // Sort by distance
}

export const fetchLikedProperties= async () => {
  try {

    const propertyIds = getLikedProperties();
    // Validate input
    if (!Array.isArray(propertyIds) || propertyIds.length === 0) {
      return false;
    }

    // Create a GROQ query to filter by the specified IDs
    // Using the "in" operator to match any document with an _id in the provided array
    const query = encodeURIComponent(`*[_type == "property" && _id in [${propertyIds.map(id => `"${id}"`).join(',')}] && !((_id in path('drafts.**')))]`);

    const url = `${API_URL}?query=${query}&returnQuery=false`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`);
    }

    const data = await response.json();
    console.log(data.result)
    return data.result;
  } catch (error) {
    console.error('Error fetching properties by IDs:', error);
    throw error;
  }
};