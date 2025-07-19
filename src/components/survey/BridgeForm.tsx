import React, { useState } from 'react';
import { Header } from '../Header';
import { CameraIcon, MapPinIcon } from 'lucide-react';
import { MediaControls } from './MediaControls';
export function BridgeForm({
  onClose,
  onSave
}) {
  const [formData, setFormData] = useState({
    roadAddress: '',
    structure_name: '',
    bridge_id_owner: '',
    structure_type: '',
    total_span_m: '',
    clear_deck_width_m: '',
    vertical_clearance_m: '',
    posted_load_limit_t: '',
    bearing_type: '',
    bearing_condition: '',
    skew_angle_deg: '',
    permit_required: false,
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
  return <div className="flex flex-col h-full min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header title="Add Bridge" onBack={onClose} onSave={handleSave} />
      <div className="flex-1 overflow-y-auto p-4 pb-24 space-y-4">
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
          <input placeholder="Structure Name" value={formData.structure_name} onChange={e => setFormData(prev => ({
          ...prev,
          structure_name: e.target.value
        }))} className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700" />
          <input placeholder="Bridge ID / Owner" value={formData.bridge_id_owner} onChange={e => setFormData(prev => ({
          ...prev,
          bridge_id_owner: e.target.value
        }))} className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700" />
          <div>
            <label className="text-gray-600 dark:text-gray-300 block mb-2">
              Structure Type
            </label>
            <select value={formData.structure_type} onChange={e => setFormData(prev => ({
            ...prev,
            structure_type: e.target.value
          }))} className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <option value="">Select structure type</option>
              <option value="RC / PSC Beam Girder">RC / PSC Beam Girder</option>
              <option value="Concrete Box-Girder">Concrete Box-Girder</option>
              <option value="Steel Plate Girder">Steel Plate Girder</option>
              <option value="Truss (Steel or Timber)">
                Truss (Steel or Timber)
              </option>
              <option value="Concrete Slab">Concrete Slab</option>
              <option value="Arch (Concrete or Steel)">
                Arch (Concrete or Steel)
              </option>
              <option value="Cable-Stayed">Cable-Stayed</option>
              <option value="Rigid Frame">Rigid Frame</option>
              <option value="Culvert / Box Cell">Culvert / Box Cell</option>
            </select>
          </div>
          <div className="relative">
            <input placeholder="Total Span" type="number" value={formData.total_span_m} onChange={e => setFormData(prev => ({
            ...prev,
            total_span_m: e.target.value
          }))} className="w-full p-4 pr-20 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700" />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              m
            </span>
          </div>
          <div className="relative">
            <input placeholder="Clear Deck Width" type="number" value={formData.clear_deck_width_m} onChange={e => setFormData(prev => ({
            ...prev,
            clear_deck_width_m: e.target.value
          }))} className="w-full p-4 pr-20 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700" />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              m
            </span>
          </div>
          <div className="relative">
            <input placeholder="Vertical Clearance" type="number" value={formData.vertical_clearance_m} onChange={e => setFormData(prev => ({
            ...prev,
            vertical_clearance_m: e.target.value
          }))} className="w-full p-4 pr-20 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700" />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              m
            </span>
          </div>
          <div className="relative">
            <input placeholder="Posted Load Limit" type="number" value={formData.posted_load_limit_t} onChange={e => setFormData(prev => ({
            ...prev,
            posted_load_limit_t: e.target.value
          }))} className="w-full p-4 pr-20 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700" />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              t
            </span>
          </div>
          <div>
            <label className="text-gray-600 dark:text-gray-300 block mb-2">
              Bearing Type
            </label>
            <select value={formData.bearing_type} onChange={e => setFormData(prev => ({
            ...prev,
            bearing_type: e.target.value
          }))} className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <option value="">Select bearing type</option>
              <option value="Elastomeric Pad">Elastomeric Pad</option>
              <option value="Pot Bearing">Pot Bearing</option>
              <option value="Spherical Bearing">Spherical Bearing</option>
              <option value="Rocker / Roller">Rocker / Roller</option>
              <option value="Pinned / Hinge">Pinned / Hinge</option>
              <option value="Sliding Plate (PTFE)">Sliding Plate (PTFE)</option>
              <option value="Lead-Rubber / Seismic Isolation">
                Lead-Rubber / Seismic Isolation
              </option>
            </select>
          </div>
          <div>
            <label className="text-gray-600 dark:text-gray-300 block mb-2">
              Bearing Condition
            </label>
            <select value={formData.bearing_condition} onChange={e => setFormData(prev => ({
            ...prev,
            bearing_condition: e.target.value
          }))} className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <option value="">Select condition</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
            </select>
          </div>
          <div className="relative">
            <input placeholder="Skew Angle" type="number" value={formData.skew_angle_deg} onChange={e => setFormData(prev => ({
            ...prev,
            skew_angle_deg: e.target.value
          }))} className="w-full p-4 pr-20 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700" />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              deg
            </span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <span className="text-lg">Permit Required</span>
            <button type="button" onClick={() => setFormData(prev => ({
            ...prev,
            permit_required: !prev.permit_required
          }))} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.permit_required ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.permit_required ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
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