/**
 * Utility functions for handling property likes
 */

const togglePropertyLike = (propertyId) => {
    if (!propertyId) {
        console.error('Invalid property ID provided');
        return false;
    }

    // Get current liked properties from localStorage
    const likedProperties = getLikedProperties();

    // Check if property is already liked
    const isCurrentlyLiked = likedProperties.includes(propertyId);

    if (isCurrentlyLiked) {
        // Remove property from liked list
        const updatedLikes = likedProperties.filter(id => id !== propertyId);
        localStorage.setItem('likedProperties', JSON.stringify(updatedLikes));
        return false;
    } else {
        // Add property to liked list
        likedProperties.push(propertyId);
        localStorage.setItem('likedProperties', JSON.stringify(likedProperties));
        return true;
    }
}

/**
 * Check if a property is liked
 * @param {string} propertyId - The ID of the property to check
 * @returns {boolean} - True if the property is liked, false otherwise
 */
const isPropertyLiked = (propertyId) => {
    if (!propertyId) return false;

    const likedProperties = getLikedProperties();
    return likedProperties.includes(propertyId);
}

/**
 * Get all liked properties
 * @returns {Array} - Array of property IDs that are liked
 */
const getLikedProperties = () => {
    try {
        const likedString = localStorage.getItem('likedProperties');
        return likedString ? JSON.parse(likedString) : [];
    } catch (error) {
        console.error('Error accessing liked properties:', error);
        return [];
    }
}

/**
 * Clear all liked properties
 */
const clearLikedProperties = () => {
    localStorage.removeItem('likedProperties');
}

export {isPropertyLiked, togglePropertyLike, getLikedProperties};