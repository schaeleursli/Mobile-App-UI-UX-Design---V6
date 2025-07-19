import React, { useState } from 'react';
import { AddPointLayout } from './AddPointLayout';
import { UniversalSection } from './UniversalSection';
import { FieldRow } from './FieldRow';
export function AddGradientForm({
  onBack,
  onSave,
  onCancel
}) {
  const [gradientData, setGradientData] = useState({
    'sustained_grade_%': '',
    'max_grade_%': '',
    length_m: '',
    escape_ramp_present: false
  });
  const handleChange = (field, value) => {
    setGradientData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleSave = () => {
    onSave(gradientData);
  };
  return <AddPointLayout pointType="Gradient Hot-Spot" onBack={onBack} onSave={handleSave} onCancel={onCancel} universalSection={<UniversalSection onChange={() => {}} />}>
      <div className="space-y-4">
        <FieldRow label="Sustained Grade" type="number" unit="%" value={gradientData['sustained_grade_%']} onChange={value => handleChange('sustained_grade_%', value)} />
        <FieldRow label="Maximum Grade" type="number" unit="%" value={gradientData['max_grade_%']} onChange={value => handleChange('max_grade_%', value)} />
        <FieldRow label="Length" type="number" unit="m" value={gradientData.length_m} onChange={value => handleChange('length_m', value)} />
        <FieldRow label="Escape Ramp Present" type="toggle" value={gradientData.escape_ramp_present} onChange={value => handleChange('escape_ramp_present', value)} />
      </div>
    </AddPointLayout>;
}