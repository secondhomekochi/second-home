export const formatDistance = (distanceInKM) => {
    const distanceInMeter = parseInt(Number(distanceInKM) * 1000);
    return distanceInMeter < 1000 ? `${distanceInMeter} M` : `${Number(distanceInKM).toFixed(2)} Km`;
}