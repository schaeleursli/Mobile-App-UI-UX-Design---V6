import React, { useState } from 'react';
import { AddPointLayout } from './AddPointLayout';
import { UniversalSection } from './UniversalSection';
import { FieldRow } from './FieldRow';
export function AddVegetationForm({
  onBack,
  onSave,
  onCancel
}) {
  const [vegetationData, setVegetationData] = useState({
    species: '',
    lowest_branch_ht_m: '',
    trim_required_height_m: '',
    environmental_permit_req: false
  });
  const handleChange = (field, value) => {
    setVegetationData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleSave = () => {
    onSave(vegetationData);
  };
  return <AddPointLayout pointType="Overhanging Vegetation" onBack={onBack} onSave={handleSave} onCancel={onCancel} universalSection={<UniversalSection onChange={() => {}} />}>
      <div className="space-y-4">
        <FieldRow label="Species" value={vegetationData.species} onChange={value => handleChange('species', value)} />
        <FieldRow label="Lowest Branch Height" type="number" unit="m" value={vegetationData.lowest_branch_ht_m} onChange={value => handleChange('lowest_branch_ht_m', value)} />
        <FieldRow label="Trim Required Height" type="number" unit="m" value={vegetationData.trim_required_height_m} onChange={value => handleChange('trim_required_height_m', value)} />
        <FieldRow label="Environmental Permit Required" type="toggle" value={vegetationData.environmental_permit_req} onChange={value => handleChange('environmental_permit_req', value)} />
      </div>
    </AddPointLayout>;
}