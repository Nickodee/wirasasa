/**
 * Get current user location
 * @returns {Promise<{latitude: number, longitude: number}>}
 */
export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    // In a real app, you would use react-native-geolocation-service
    // For now, returning a mock location (Nairobi, Kenya)
    resolve({
      latitude: -1.286389,
      longitude: 36.817223,
    });
  });
};

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param {number} lat1 - Latitude of point 1
 * @param {number} lon1 - Longitude of point 1
 * @param {number} lat2 - Latitude of point 2
 * @param {number} lon2 - Longitude of point 2
 * @returns {number} - Distance in kilometers
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return distance;
};

/**
 * Convert degrees to radians
 * @param {number} deg - Degrees
 * @returns {number} - Radians
 */
const toRad = (deg) => {
  return deg * (Math.PI / 180);
};

/**
 * Check if distance is within radius
 * @param {number} distance - Distance in kilometers
 * @param {number} radius - Radius in kilometers
 * @returns {boolean} - True if within radius
 */
export const isWithinRadius = (distance, radius) => {
  return distance <= radius;
};
