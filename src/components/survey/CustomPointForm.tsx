import React, { useEffect, useState } from 'react';
import { Header } from '../Header';
import { MapPinIcon } from 'lucide-react';
import { MediaControls } from './MediaControls';
import { ConfirmationDialog } from '../ConfirmationDialog';
export function CustomPointForm({
  onSave,
  onCancel
}) {
  const [formData, setFormData] = useState({
    roadAddress: '',
    description: '',
    heightNotes: '',
    widthNotes: '',
    lengthNotes: '',
    areaNotes: '',
    groundNotes: '',
    restrictionNotes: '',
    notes: '',
    photos: []
  });
  const [initialFormData, setInitialFormData] = useState(JSON.stringify(formData));
  const [hasChanges, setHasChanges] = useState(false);
  const [showUnsavedChangesDialog, setShowUnsavedChangesDialog] = useState(false);
  useEffect(() => {
    // Check if form data has changed from initial state
    const currentFormData = JSON.stringify(formData);
    setHasChanges(currentFormData !== initialFormData);
  }, [formData, initialFormData]);
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
  const handleCancel = () => {
    if (hasChanges) {
      setShowUnsavedChangesDialog(true);
    } else {
      onCancel();
    }
  };
  const handlePhotosChange = photos => {
    handleChange('photos', photos);
  };
  const handleNoteChange = note => {
    handleChange('notes', note);
  };
  return <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      <Header title="Add Custom" onBack={handleCancel} onSave={handleSave} />
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
          <input placeholder="Description of Obstruction" value={formData.description} onChange={e => handleChange('description', e.target.value)} className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700" />
          {[{
          field: 'heightNotes',
          label: 'Height Notes'
        }, {
          field: 'widthNotes',
          label: 'Width Notes'
        }, {
          field: 'lengthNotes',
          label: 'Length Notes'
        }, {
          field: 'areaNotes',
          label: 'Area Notes'
        }, {
          field: 'groundNotes',
          label: 'Ground Notes'
        }, {
          field: 'restrictionNotes',
          label: 'Restriction Notes'
        }].map(({
          field,
          label
        }) => <textarea key={field} placeholder={label} value={formData[field]} onChange={e => handleChange(field, e.target.value)} className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 h-20" />)}
          <textarea placeholder="Point Notes" value={formData.notes} onChange={e => handleChange('notes', e.target.value)} className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 h-32" />
        </div>
        {/* Action Buttons */}
        <div className="space-y-2 mt-8">
          <button onClick={handleSave} className="w-full p-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            Save
          </button>
          <button onClick={handleCancel} className="w-full p-4 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors">
            Cancel
          </button>
        </div>
      </div>
      {/* Unsaved Changes Dialog */}
      {showUnsavedChangesDialog && <ConfirmationDialog title="Unsaved Changes" message="You have unsaved changes. Do you want to save them before leaving?" confirmText="Save" cancelText="Discard" type="warning" onConfirm={() => {
      handleSave();
      setShowUnsavedChangesDialog(false);
    }} onCancel={() => {
      setShowUnsavedChangesDialog(false);
      onCancel();
    }} />}
    </div>;
}