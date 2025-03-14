import { useEffect, useRef } from 'react';

/**
 * Hook to handle Enter key press events within the filter panel only
 * @param {Function} callback - Function to be called when Enter key is pressed
 */
const useFilterPanelEnterKey = (callback) => {
  const filterPanelRef = useRef(null);

  useEffect(() => {
    const filterPanelElement = filterPanelRef.current;
    
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        callback();
      }
    };

    // Only add the event listener to the filter panel element
    if (filterPanelElement) {
      filterPanelElement.addEventListener('keydown', handleKeyDown);
    }

    // Clean up
    return () => {
      if (filterPanelElement) {
        filterPanelElement.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [callback, filterPanelRef.current]);

  return filterPanelRef;
};

export default useFilterPanelEnterKey;