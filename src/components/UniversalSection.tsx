import React, { useState } from 'react';
import { MediaControls } from './survey/MediaControls';
import { MapPinIcon } from 'lucide-react';
interface UniversalSectionProps {
  onChange: (data: any) => void;
}
export function UniversalSection({
  onChange
}: UniversalSectionProps) {
  const [universalData, setUniversalData] = useState({
    roadAddress: '',
    photos: []
  });
  const handleChange = (field: string, value: any) => {
    const newData = {
      ...universalData,
      [field]: value
    };
    setUniversalData(newData);
    onChange(newData);
  };
  const handleLocationPicked = (location: {
    address: string;
    latitude: number;
    longitude: number;
  }) => {
    const newData = {
      ...universalData,
      roadAddress: location.address
    };
    setUniversalData(newData);
    onChange(newData);
  };
  const handlePhotosChange = (photos: string[]) => {
    handleChange('photos', photos);
  };
  return <div className="space-y-6">
      {/* Media Controls for Photos */}
      <MediaControls photos={universalData.photos as string[]} onPhotosChange={handlePhotosChange} />
      {/* Road Address with Location Button */}
      <div>
        <label className="block text-sm font-medium mb-1 text-[#0F172A] dark:text-[#F1F5F9]">
          Road Address
        </label>
        <div className="relative">
          <input type="text" value={universalData.roadAddress} onChange={e => handleChange('roadAddress', e.target.value)} placeholder="Enter road address" className="w-full p-2 bg-[#F5F7FA] dark:bg-[#2A2C30] rounded-[4px] border border-gray-300 dark:border-gray-600 outline-none transition-colors pr-12" />
          <button onClick={() => handleLocationPicked({
          address: 'Current location',
          latitude: 0,
          longitude: 0
        })} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#1F3C56] text-white rounded-lg">
            <MapPinIcon size={16} />
          </button>
        </div>
      </div>
    </div>;
}