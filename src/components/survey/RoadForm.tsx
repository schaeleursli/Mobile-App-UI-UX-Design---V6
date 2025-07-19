import React, { useState } from 'react';
import { Header } from '../Header';
import { MapPinIcon } from 'lucide-react';
import { MediaControls } from './MediaControls';
export function RoadForm({
  onClose,
  onSave
}) {
  const [formData, setFormData] = useState({
    roadAddress: '',
    surfaceType: '',
    numberOfLines: '',
    roadWidth: '',
    notes: '',
    photos: []
  });
  const handleSave = () => {
    onSave?.(formData);
    onClose();
  };
  const handlePhotosChange = photos => {
    setFormData(prev => ({
      ...prev,
      photos
    }));
  };
  const handleNoteChange = note => {
    setFormData(prev => ({
      ...prev,
      notes: note
    }));
  };
  return <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      <Header title="Add Road" onBack={onClose} onSave={handleSave} />
      <div className="p-4 space-y-4 overflow-y-auto pb-20">
        <MediaControls photos={formData.photos} onPhotosChange={handlePhotosChange} onNoteChange={handleNoteChange} />
        {/* Form Fields */}
        <div className="space-y-4">
          <div className="relative">
            <input placeholder="Road address" value={formData.roadAddress} onChange={e => setFormData(prev => ({
            ...prev,
            roadAddress: e.target.value
          }))} className="w-full p-4 pr-12 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700" />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-lg">
              <MapPinIcon size={20} />
            </button>
          </div>
          <div>
            <label className="text-gray-600 dark:text-gray-300 block mb-2">
              Type of Surface
            </label>
            <select value={formData.surfaceType} onChange={e => setFormData(prev => ({
            ...prev,
            surfaceType: e.target.value
          }))} className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <option value="">Select type</option>
              <option value="asphalt">Asphalt</option>
              <option value="concrete">Concrete</option>
              <option value="gravel">Gravel</option>
              <option value="dirt">Dirt</option>
            </select>
          </div>
          <input placeholder="Number of lines" type="number" value={formData.numberOfLines} onChange={e => setFormData(prev => ({
          ...prev,
          numberOfLines: e.target.value
        }))} className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700" />
          <div className="relative">
            <input placeholder="Road width" type="number" value={formData.roadWidth} onChange={e => setFormData(prev => ({
            ...prev,
            roadWidth: e.target.value
          }))} className="w-full p-4 pr-20 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700" />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              Meter
            </span>
          </div>
          <textarea placeholder="Point Notes" value={formData.notes} onChange={e => setFormData(prev => ({
          ...prev,
          notes: e.target.value
        }))} className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 h-32" />
        </div>
        {/* Action Buttons */}
        <div className="space-y-2 mt-8">
          <button onClick={handleSave} className="w-full p-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            Save
          </button>
          <button onClick={onClose} className="w-full p-4 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>;
}