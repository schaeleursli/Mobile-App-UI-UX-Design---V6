import React, { useState } from 'react';
import { AddPointLayout } from './AddPointLayout';
import { UniversalSection } from './UniversalSection';
import { FieldRow } from './FieldRow';
export function AddFloodZoneForm({
  onBack,
  onSave,
  onCancel
}) {
  const [floodData, setFloodData] = useState({
    hazard_type: '',
    historical_high_water_m: '',
    detour_route_available: '',
    early_warning_system: false
  });
  const handleChange = (field, value) => {
    setFloodData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleSave = () => {
    onSave(floodData);
  };
  const hazardTypeOptions = [{
    value: 'Floodplain',
    label: 'Floodplain'
  }, {
    value: 'Debris Flow',
    label: 'Debris Flow'
  }, {
    value: 'Rockfall',
    label: 'Rockfall'
  }];
  return <AddPointLayout pointType="Flood / Landslide Zone" onBack={onBack} onSave={handleSave} onCancel={onCancel} universalSection={<UniversalSection onChange={() => {}} />}>
      <div className="space-y-4">
        <FieldRow label="Hazard Type" type="select" value={floodData.hazard_type} onChange={value => handleChange('hazard_type', value)} options={hazardTypeOptions} />
        <FieldRow label="Historical High Water" type="number" unit="m" value={floodData.historical_high_water_m} onChange={value => handleChange('historical_high_water_m', value)} />
        <FieldRow label="Detour Route Available" type="textarea" value={floodData.detour_route_available} onChange={value => handleChange('detour_route_available', value)} placeholder="Describe available detour routes" />
        <FieldRow label="Early Warning System" type="toggle" value={floodData.early_warning_system} onChange={value => handleChange('early_warning_system', value)} />
      </div>
    </AddPointLayout>;
}