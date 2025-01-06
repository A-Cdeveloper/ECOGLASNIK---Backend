export const getDisplayName = (name: string) => {
  if (!name) return "";
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
};

// Function to generate bounds based on a central position and distance (in km)
export const generateBounds = (
  position: { lat: number; lng: number },
  distanceKm: number
) => {
  // Approximate 1 degree of latitude = 111km
  const degreeToKm = 111;

  // Calculate the latitude and longitude offset in degrees
  const latOffset = distanceKm / degreeToKm;
  const lngOffset =
    distanceKm / (degreeToKm * Math.cos((position.lat * Math.PI) / 180));

  // Generate the bounding box
  const northEast = {
    lat: position.lat + latOffset,
    lng: position.lng + lngOffset,
  };

  const southWest = {
    lat: position.lat - latOffset,
    lng: position.lng - lngOffset,
  };

  return {
    northEast,
    southWest,
  };
};

// // Example usage
// const defaultPosition: DefaultPosition = {
//   lat: 42.961498,
//   lng: 22.124319,
// };

// const distanceKm = 10; // 10 km distance for the bounding box

// // Generate the bounding box
// const defaultBound: DefaultBound = generateBounds(defaultPosition, distanceKm);

// console.log(defaultBound);
