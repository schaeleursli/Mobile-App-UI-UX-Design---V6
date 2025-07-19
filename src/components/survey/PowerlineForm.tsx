import React, { useEffect, useState } from 'react';
import { Header } from '../Header';
import { MapPinIcon } from 'lucide-react';
import { MediaControls } from './MediaControls';
import { ConfirmationDialog } from '../ConfirmationDialog';
export function PowerlineForm({
  onClose,
  onSave
}) {
  const [formData, setFormData] = useState({
    roadAddress: '',
    utility_owner: '',
    line_type: '',
    voltage_kV: '',
    lowest_sag_clearance_m: '',
    required_action: '',
    outage_contact_person_tel: '',
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
  const handleSave = () => {
    onSave?.(formData);
    onClose();
  };
  const handleClose = () => {
    if (hasChanges) {
      setShowUnsavedChangesDialog(true);
    } else {
      onClose();
    }
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
      <Header title="Add Powerline" onBack={handleClose} onSave={handleSave} />
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
          <input placeholder="Utility Owner" value={formData.utility_owner} onChange={e => setFormData(prev => ({
          ...prev,
          utility_owner: e.target.value
        }))} className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700" />
          <div>
            <label className="text-gray-600 dark:text-gray-300 block mb-2">
              Line Type
            </label>
            <select value={formData.line_type} onChange={e => setFormData(prev => ({
            ...prev,
            line_type: e.target.value
          }))} className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <option value="">Select type</option>
              <option value="Power">Power</option>
              <option value="Telecom">Telecom</option>
              <option value="Fiber">Fiber</option>
              <option value="Street-light">Street Light</option>
              <option value="Pipe-bridge">Pipe Bridge</option>
            </select>
          </div>
          <div className="relative">
            <input placeholder="Voltage" type="number" value={formData.voltage_kV} onChange={e => setFormData(prev => ({
            ...prev,
            voltage_kV: e.target.value
          }))} className="w-full p-4 pr-12 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700" />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              kV
            </span>
          </div>
          <div className="relative">
            <input placeholder="Lowest Sag Clearance" type="number" value={formData.lowest_sag_clearance_m} onChange={e => setFormData(prev => ({
            ...prev,
            lowest_sag_clearance_m: e.target.value
          }))} className="w-full p-4 pr-20 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700" />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              m
            </span>
          </div>
          <div>
            <label className="text-gray-600 dark:text-gray-300 block mb-2">
              Required Action
            </label>
            <select value={formData.required_action} onChange={e => setFormData(prev => ({
            ...prev,
            required_action: e.target.value
          }))} className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <option value="">Select action</option>
              <option value="None">None</option>
              <option value="Lift">Lift</option>
              <option value="Shutdown">Shutdown</option>
              <option value="Escort Boom">Escort Boom</option>
            </select>
          </div>
          <div>
            <label className="text-gray-600 dark:text-gray-300 block mb-2">
              Outage Contact Person
            </label>
            <input type="tel" placeholder="+1 (555) 123-4567" value={formData.outage_contact_person_tel} onChange={e => setFormData(prev => ({
            ...prev,
            outage_contact_person_tel: e.target.value
          }))} className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700" />
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
          <button onClick={handleClose} className="w-full p-4 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors">
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
      onClose();
    }} />}
    </div>;
}