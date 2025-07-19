import React, { useState } from 'react';
import { AddPointLayout } from './AddPointLayout';
import { UniversalSection } from './UniversalSection';
import { FieldRow } from './FieldRow';
export function AddIntersectionForm({
  onBack,
  onSave,
  onCancel
}) {
  const [intersectionData, setIntersectionData] = useState({
    intersection_type: '',
    largest_internal_radius_m: '',
    is_signalised: false,
    removable_items: ''
  });
  const handleChange = (field, value) => {
    setIntersectionData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleSave = () => {
    onSave(intersectionData);
  };
  const intersectionTypeOptions = [{
    value: 'T',
    label: 'T-Junction'
  }, {
    value: 'X',
    label: 'X-Junction'
  }, {
    value: 'Y',
    label: 'Y-Junction'
  }, {
    value: 'Roundabout',
    label: 'Roundabout'
  }, {
    value: 'Trumpet',
    label: 'Trumpet Interchange'
  }];
  return <AddPointLayout pointType="Intersection / Roundabout" onBack={onBack} onSave={handleSave} onCancel={onCancel} universalSection={<UniversalSection onChange={() => {}} />}>
      <div className="space-y-4">
        <FieldRow label="Intersection Type" type="select" value={intersectionData.intersection_type} onChange={value => handleChange('intersection_type', value)} options={intersectionTypeOptions} />
        <FieldRow label="Largest Internal Radius" type="number" unit="m" value={intersectionData.largest_internal_radius_m} onChange={value => handleChange('largest_internal_radius_m', value)} />
        <FieldRow label="Is Signalized" type="toggle" value={intersectionData.is_signalised} onChange={value => handleChange('is_signalised', value)} />
        <FieldRow label="Removable Items" type="textarea" value={intersectionData.removable_items} onChange={value => handleChange('removable_items', value)} placeholder="List any items that can be removed if needed" />
      </div>
    </AddPointLayout>;
}