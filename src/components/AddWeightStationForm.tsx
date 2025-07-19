import React, { useState } from 'react';
import { AddPointLayout } from './AddPointLayout';
import { UniversalSection } from './UniversalSection';
import { FieldRow } from './FieldRow';
export function AddWeightStationForm({
  onBack,
  onSave,
  onCancel
}) {
  const [stationData, setStationData] = useState({
    station_name: '',
    km_marker: '',
    operating_hours: '',
    static_scale_length_m: '',
    weigh_in_motion: false
  });
  const handleChange = (field, value) => {
    setStationData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleSave = () => {
    onSave(stationData);
  };
  return <AddPointLayout pointType="Weight Station" onBack={onBack} onSave={handleSave} onCancel={onCancel} universalSection={<UniversalSection onChange={() => {}} />}>
      <div className="space-y-4">
        <FieldRow label="Station Name" value={stationData.station_name} onChange={value => handleChange('station_name', value)} />
        <FieldRow label="Kilometer Marker" value={stationData.km_marker} onChange={value => handleChange('km_marker', value)} />
        <FieldRow label="Operating Hours" value={stationData.operating_hours} onChange={value => handleChange('operating_hours', value)} placeholder="e.g. 06:00-22:00" />
        <FieldRow label="Static Scale Length" type="number" unit="m" value={stationData.static_scale_length_m} onChange={value => handleChange('static_scale_length_m', value)} />
        <FieldRow label="Weigh-in-Motion Available" type="toggle" value={stationData.weigh_in_motion} onChange={value => handleChange('weigh_in_motion', value)} />
      </div>
    </AddPointLayout>;
}