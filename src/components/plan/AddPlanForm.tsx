import React, { useEffect, useState } from 'react';
import { Header } from '../Header';
import { MapPinIcon } from 'lucide-react';
import ReactDOM from 'react-dom';
import { ConfirmationDialog } from '../ConfirmationDialog';
export function AddPlanForm({
  onClose,
  onSave
}) {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    startPoint: '',
    endPoint: '',
    client: '',
    surveyInstructions: '',
    cargo: {
      type: '',
      weight: '',
      dimensions: '',
      notes: ''
    },
    trailer: {
      type: '',
      length: '',
      notes: ''
    }
  });
  const [initialFormData, setInitialFormData] = useState(JSON.stringify(formData));
  const [showUnsavedChangesDialog, setShowUnsavedChangesDialog] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
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
  const modalContent = <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="flex flex-col h-full bg-white dark:bg-gray-900 overflow-hidden">
        <Header title="Add Planned Survey" onBack={handleClose} onSave={handleSave} />
        <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
          {/* Basic Info */}
          <div className="space-y-4">
            <input placeholder="Survey Name" value={formData.name} onChange={e => setFormData(prev => ({
            ...prev,
            name: e.target.value
          }))} className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700" />
            <input type="date" value={formData.date} onChange={e => setFormData(prev => ({
            ...prev,
            date: e.target.value
          }))} className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 appearance-none" />
          </div>
          {/* Location Info */}
          <div className="space-y-4">
            <div className="relative">
              <input placeholder="Start Point" value={formData.startPoint} onChange={e => setFormData(prev => ({
              ...prev,
              startPoint: e.target.value
            }))} className="w-full p-4 pr-12 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700" />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-lg">
                <MapPinIcon size={20} />
              </button>
            </div>
            <div className="relative">
              <input placeholder="End Point" value={formData.endPoint} onChange={e => setFormData(prev => ({
              ...prev,
              endPoint: e.target.value
            }))} className="w-full p-4 pr-12 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700" />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-lg">
                <MapPinIcon size={20} />
              </button>
            </div>
          </div>
          {/* Client & Instructions */}
          <div className="space-y-4">
            <input placeholder="Client Name" value={formData.client} onChange={e => setFormData(prev => ({
            ...prev,
            client: e.target.value
          }))} className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700" />
            <textarea placeholder="Survey Instructions" value={formData.surveyInstructions} onChange={e => setFormData(prev => ({
            ...prev,
            surveyInstructions: e.target.value
          }))} className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 h-32" />
          </div>
          {/* Cargo Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Cargo Details
            </h3>
            <input placeholder="Cargo Type" value={formData.cargo.type} onChange={e => setFormData(prev => ({
            ...prev,
            cargo: {
              ...prev.cargo,
              type: e.target.value
            }
          }))} className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700" />
            <div className="grid grid-cols-2 gap-4">
              <input placeholder="Weight (tons)" type="number" value={formData.cargo.weight} onChange={e => setFormData(prev => ({
              ...prev,
              cargo: {
                ...prev.cargo,
                weight: e.target.value
              }
            }))} className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700" />
              <input placeholder="Dimensions" value={formData.cargo.dimensions} onChange={e => setFormData(prev => ({
              ...prev,
              cargo: {
                ...prev.cargo,
                dimensions: e.target.value
              }
            }))} className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700" />
            </div>
            <textarea placeholder="Cargo Notes" value={formData.cargo.notes} onChange={e => setFormData(prev => ({
            ...prev,
            cargo: {
              ...prev.cargo,
              notes: e.target.value
            }
          }))} className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 h-24" />
          </div>
          {/* Trailer Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Trailer Details
            </h3>
            <input placeholder="Trailer Type" value={formData.trailer.type} onChange={e => setFormData(prev => ({
            ...prev,
            trailer: {
              ...prev.trailer,
              type: e.target.value
            }
          }))} className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700" />
            <input placeholder="Trailer Length" value={formData.trailer.length} onChange={e => setFormData(prev => ({
            ...prev,
            trailer: {
              ...prev.trailer,
              length: e.target.value
            }
          }))} className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700" />
            <textarea placeholder="Trailer Notes" value={formData.trailer.notes} onChange={e => setFormData(prev => ({
            ...prev,
            trailer: {
              ...prev.trailer,
              notes: e.target.value
            }
          }))} className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 h-24" />
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
  // Use portal to mount modal outside of normal DOM hierarchy
  return ReactDOM.createPortal(modalContent, document.body);
}