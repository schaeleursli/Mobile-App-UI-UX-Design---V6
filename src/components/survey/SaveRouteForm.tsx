import React, { useState } from 'react';
import { Header } from '../Header';
import { Switch } from '../Switch';
export function SaveRouteForm({
  distance = '0.04',
  onSave,
  onCancel
}) {
  const [formData, setFormData] = useState({
    routeName: '',
    importGoogleEarth: false,
    notes: ''
  });
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleSave = () => {
    onSave(formData);
  };
  return <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      <Header title="Save Route" onBack={onCancel} onSave={handleSave} />
      <div className="p-4 space-y-4 overflow-y-auto pb-20">
        <input placeholder="Route Name" value={formData.routeName} onChange={e => handleChange('routeName', e.target.value)} className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700" />
        <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <span className="text-lg">Import Google earth images</span>
          <Switch checked={formData.importGoogleEarth} onChange={() => handleChange('importGoogleEarth', !formData.importGoogleEarth)} />
        </div>
        <div className="relative">
          <input value={distance} readOnly className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700" />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
            Km
          </span>
        </div>
        <textarea placeholder="Route Notes" value={formData.notes} onChange={e => handleChange('notes', e.target.value)} className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 h-32" />
        <div className="space-y-2 mt-8">
          <button onClick={handleSave} className="w-full p-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            Save
          </button>
          <button onClick={onCancel} className="w-full p-4 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>;
}