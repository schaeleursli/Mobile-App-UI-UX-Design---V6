import React, { useState } from 'react';
import { Header } from '../Header';
import { MapPinIcon } from 'lucide-react';
import { MediaControls } from './MediaControls';
export function IntersectionForm({
  onClose,
  onSave
}) {
  const [formData, setFormData] = useState({
    intersectionType: '',
    primaryRoad: '',
    secondaryRoad: '',
    notes: '',
    photos: []
  });
  const [selectedType, setSelectedType] = useState(null);
  const intersectionTypes = [{
    id: 'cross',
    label: 'Cross'
  }, {
    id: 'T',
    label: 'T-Junction'
  }, {
    id: 'roundabout',
    label: 'Roundabout'
  }, {
    id: 'Y',
    label: 'Y-Junction'
  }];
  const handleSave = () => {
    onSave?.({
      ...formData,
      intersectionType: selectedType
    });
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
      <Header title="Add Intersection" onBack={onClose} onSave={handleSave} />
      <div className="p-4 space-y-4 overflow-y-auto pb-20">
        <MediaControls photos={formData.photos} onPhotosChange={handlePhotosChange} onNoteChange={handleNoteChange} />
        {/* Intersection Type Selection */}
        <div className="space-y-2">
          <label className="text-gray-600 dark:text-gray-300 text-lg">
            Type of Intersection
          </label>
          <div className="grid grid-cols-4 gap-4">
            {intersectionTypes.map(type => <button key={type.id} onClick={() => setSelectedType(type.id)} className={`p-4 rounded-lg border-2 ${selectedType === type.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-900' : 'border-gray-200 dark:border-gray-700'}`}>
                <div className="aspect-square w-full flex items-center justify-center">
                  {/* You would typically use actual intersection icons here */}
                  <span className="text-2xl">{type.label[0]}</span>
                </div>
              </button>)}
          </div>
        </div>
        {/* Form Fields */}
        <div className="space-y-4">
          <div className="relative">
            <input placeholder="Primary Road address" value={formData.primaryRoad} onChange={e => setFormData(prev => ({
            ...prev,
            primaryRoad: e.target.value
          }))} className="w-full p-4 pr-12 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700" />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-lg">
              <MapPinIcon size={20} />
            </button>
          </div>
          <input placeholder="Secondary road" value={formData.secondaryRoad} onChange={e => setFormData(prev => ({
          ...prev,
          secondaryRoad: e.target.value
        }))} className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700" />
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