import React, { useState } from 'react';
import { AddPointLayout } from './AddPointLayout';
import { UniversalSection } from './UniversalSection';
import { FieldRow } from './FieldRow';
export function AddShoulderForm({
  onBack,
  onSave,
  onCancel
}) {
  const [shoulderData, setShoulderData] = useState({
    bay_type: '',
    usable_length_m: '',
    usable_width_m: '',
    bearing_capacity_kPa: '',
    night_lighting: false
  });
  const handleChange = (field, value) => {
    setShoulderData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleSave = () => {
    onSave(shoulderData);
  };
  const bayTypeOptions = [{
    value: 'Rest Area',
    label: 'Rest Area'
  }, {
    value: 'Gravel Shoulder',
    label: 'Gravel Shoulder'
  }, {
    value: 'Emergency Bay',
    label: 'Emergency Bay'
  }];
  return <AddPointLayout pointType="Shoulder / Lay-by" onBack={onBack} onSave={handleSave} onCancel={onCancel} universalSection={<UniversalSection onChange={() => {}} />}>
      <div className="space-y-4">
        <FieldRow label="Bay Type" type="select" value={shoulderData.bay_type} onChange={value => handleChange('bay_type', value)} options={bayTypeOptions} />
        <FieldRow label="Usable Length" type="number" unit="m" value={shoulderData.usable_length_m} onChange={value => handleChange('usable_length_m', value)} />
        <FieldRow label="Usable Width" type="number" unit="m" value={shoulderData.usable_width_m} onChange={value => handleChange('usable_width_m', value)} />
        <FieldRow label="Bearing Capacity" type="number" unit="kPa" value={shoulderData.bearing_capacity_kPa} onChange={value => handleChange('bearing_capacity_kPa', value)} />
        <FieldRow label="Night Lighting Available" type="toggle" value={shoulderData.night_lighting} onChange={value => handleChange('night_lighting', value)} />
      </div>
    </AddPointLayout>;
}