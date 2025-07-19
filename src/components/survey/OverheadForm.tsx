import React, { useState } from 'react';
import { Header } from '../Header';
import { MapPinIcon } from 'lucide-react';
import { Switch } from '../Switch';
import { MediaControls } from './MediaControls';
export function OverheadForm({
  onSave,
  onCancel
}) {
  const [formData, setFormData] = useState({
    roadAddress: '',
    obstructionType: '',
    heightAboveGround: '',
    dismountable: false,
    notes: '',
    photos: []
  });
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleSave = () => {
    onSave(formData);
    onCancel();
  };
  const handlePhotosChange = photos => {
    handleChange('photos', photos);
  };
  const handleNoteChange = note => {
    handleChange('notes', note);
  };
  return <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      <Header title="Add Overhead" onBack={onCancel} onSave={handleSave} />
      <div className="p-4 space-y-4 overflow-y-auto pb-20">
        <MediaControls photos={formData.photos} onPhotosChange={handlePhotosChange} onNoteChange={handleNoteChange} />
        {/* Form Fields */}
        <div className="space-y-4">
          <div className="relative">
            <input placeholder="Road address" value={formData.roadAddress} onChange={e => handleChange('roadAddress', e.target.value)} className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700" />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-lg">
              <MapPinIcon size={20} />
            </button>
          </div>
          <div>
            <label className="text-gray-600 dark:text-gray-300 block mb-2">
              Type of Obstruction
            </label>
            <select value={formData.obstructionType} onChange={e => handleChange('obstructionType', e.target.value)} className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <option value="">Select type</option>
              <option value="sign">Sign</option>
              <option value="banner">Banner</option>
              <option value="decoration">Decoration</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="relative">
            <input placeholder="Height Above Ground" type="number" value={formData.heightAboveGround} onChange={e => handleChange('heightAboveGround', e.target.value)} className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700" />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              Meter
            </span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <span className="text-lg">Dismountable</span>
            <Switch checked={formData.dismountable} onChange={() => handleChange('dismountable', !formData.dismountable)} />
          </div>
          <textarea placeholder="Point Notes" value={formData.notes} onChange={e => handleChange('notes', e.target.value)} className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 h-32" />
        </div>
        {/* Action Buttons */}
        <div className="space-y-2 mt-8">
          <button onClick={() => onSave(formData)} className="w-full p-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            Save
          </button>
          <button onClick={onCancel} className="w-full p-4 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>;
}