import React, { useState } from 'react';
import { AddPointLayout } from './AddPointLayout';
import { UniversalSection } from './UniversalSection';
import { FieldRow } from './FieldRow';
export function AddRoadwayGeometryForm({
  onBack,
  onSave,
  onCancel
}) {
  const [roadwayData, setRoadwayData] = useState({
    segment_length_m: '',
    lane_width_m: '',
    shoulder_width_m: '',
    centreline_radius_m: '',
    'grade_%': ''
  });
  const handleChange = (field, value) => {
    setRoadwayData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleSave = () => {
    onSave(roadwayData);
  };
  return <AddPointLayout pointType="Roadway Geometry" onBack={onBack} onSave={handleSave} onCancel={onCancel} universalSection={<UniversalSection onChange={() => {}} />}>
      <div className="space-y-4">
        <FieldRow label="Segment Length" type="number" unit="m" value={roadwayData.segment_length_m} onChange={value => handleChange('segment_length_m', value)} />
        <FieldRow label="Lane Width" type="number" unit="m" value={roadwayData.lane_width_m} onChange={value => handleChange('lane_width_m', value)} />
        <FieldRow label="Shoulder Width" type="number" unit="m" value={roadwayData.shoulder_width_m} onChange={value => handleChange('shoulder_width_m', value)} />
        <FieldRow label="Centerline Radius" type="number" unit="m" value={roadwayData.centreline_radius_m} onChange={value => handleChange('centreline_radius_m', value)} />
        <FieldRow label="Grade" type="number" unit="%" value={roadwayData['grade_%']} onChange={value => handleChange('grade_%', value)} />
      </div>
    </AddPointLayout>;
}