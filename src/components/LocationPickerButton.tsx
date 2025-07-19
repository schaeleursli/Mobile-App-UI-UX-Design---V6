import React from 'react';
import { MapPinIcon } from 'lucide-react';
interface LocationPickerButtonProps {
  onLocationPicked: (location: {
    address: string;
    latitude: number;
    longitude: number;
  }) => void;
}
export function LocationPickerButton({
  onLocationPicked
}: LocationPickerButtonProps) {
  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        // In a real app, you would use reverse geocoding to get the address
        // For this demo, we'll just use placeholder text
        onLocationPicked({
          address: 'Current location',
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      }, error => {
        console.error('Error getting location:', error);
        alert('Unable to get your location. Please enter address manually.');
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };
  return <button onClick={handleGetCurrentLocation} className="flex items-center justify-center p-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
      <MapPinIcon size={16} />
    </button>;
}