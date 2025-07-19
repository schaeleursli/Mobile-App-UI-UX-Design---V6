import React, { useState } from 'react';
import { Header } from '../Header';
import { MapPinIcon } from 'lucide-react';
import { MediaControls } from './MediaControls';
export function RailroadForm({
  onClose,
  onSave
}) {
  const [formData, setFormData] = useState({
    approach: '',
    crossingNumber: '',
    carrier: '',
    roadAddress: '',
    heightRestriction: '',
    roadWidth: '',
    crossingWidth: '',
    slope: '',
    contactNumber: '',
    notes: '',
    photos: []
  });
  const handleSave = () => {
    // Here you would typically validate and process the form data
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
      <Header title="Add Railroad" onBack={onClose} onSave={handleSave} />
      <div className="p-4 space-y-4 overflow-y-auto pb-20">
        <MediaControls photos={formData.photos} onPhotosChange={handlePhotosChange} onNoteChange={handleNoteChange} />
        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="text-gray-600 dark:text-gray-300 mb-2">
              Approach
            </label>
            <select className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700" value={formData.approach} onChange={e => setFormData(prev => ({
            ...prev,
            approach: e.target.value
          }))}>
              <option value="">Select approach</option>
              <option value="north">North</option>
              <option value="south">South</option>
              <option value="east">East</option>
              <option value="west">West</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input placeholder="Crossing #" value={formData.crossingNumber} onChange={e => setFormData(prev => ({
            ...prev,
            crossingNumber: e.target.value
          }))} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700" />
            <input placeholder="Carrier" value={formData.carrier} onChange={e => setFormData(prev => ({
            ...prev,
            carrier: e.target.value
          }))} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700" />
          </div>
          <div className="relative">
            <input placeholder="Road address" value={formData.roadAddress} onChange={e => setFormData(prev => ({
            ...prev,
            roadAddress: e.target.value
          }))} className="w-full p-4 pr-12 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700" />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-lg">
              <MapPinIcon size={20} />
            </button>
          </div>
          {/* Measurement Fields */}
          <div className="relative">
            <input placeholder="Height Restriction" type="number" value={formData.heightRestriction} onChange={e => setFormData(prev => ({
            ...prev,
            heightRestriction: e.target.value
          }))} className="w-full p-4 pr-20 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700" />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              Meter
            </span>
          </div>
          <div className="relative">
            <input placeholder="Road width" type="number" value={formData.roadWidth} onChange={e => setFormData(prev => ({
            ...prev,
            roadWidth: e.target.value
          }))} className="w-full p-4 pr-20 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700" />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              Meter
            </span>
          </div>
          <div className="relative">
            <input placeholder="Crossing width" type="number" value={formData.crossingWidth} onChange={e => setFormData(prev => ({
            ...prev,
            crossingWidth: e.target.value
          }))} className="w-full p-4 pr-20 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700" />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              Meter
            </span>
          </div>
          <div className="relative">
            <input placeholder="Slope" type="number" value={formData.slope} onChange={e => setFormData(prev => ({
            ...prev,
            slope: e.target.value
          }))} className="w-full p-4 pr-20 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700" />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              Degree
            </span>
          </div>
          <input placeholder="Contact #" value={formData.contactNumber} onChange={e => setFormData(prev => ({
          ...prev,
          contactNumber: e.target.value
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