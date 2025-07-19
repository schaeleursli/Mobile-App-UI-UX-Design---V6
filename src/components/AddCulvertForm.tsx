import React, { useState } from 'react';
import { AddPointLayout } from './AddPointLayout';
import { UniversalSection } from './UniversalSection';
import { FieldRow } from './FieldRow';
export function AddCulvertForm({
  onBack,
  onSave,
  onCancel
}) {
  const [culvertData, setCulvertData] = useState({
    culvert_type: '',
    span_diameter_m: '',
    cover_depth_m: '',
    material: '',
    hydraulic_capacity_check: false
  });
  const handleChange = (field, value) => {
    setCulvertData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleSave = () => {
    onSave(culvertData);
  };
  const culvertTypeOptions = [{
    value: 'Box',
    label: 'Box Culvert'
  }, {
    value: 'Pipe',
    label: 'Pipe Culvert'
  }, {
    value: 'Arch',
    label: 'Arch Culvert'
  }];
  const materialOptions = [{
    value: 'RC',
    label: 'Reinforced Concrete'
  }, {
    value: 'CMP',
    label: 'Corrugated Metal Pipe'
  }, {
    value: 'HDPE',
    label: 'High-Density Polyethylene'
  }];
  return <AddPointLayout pointType="Culvert / Drainage" onBack={onBack} onSave={handleSave} onCancel={onCancel} universalSection={<UniversalSection onChange={() => {}} />}>
      <div className="space-y-4">
        <FieldRow label="Culvert Type" type="select" value={culvertData.culvert_type} onChange={value => handleChange('culvert_type', value)} options={culvertTypeOptions} />
        <FieldRow label="Span/Diameter" type="number" unit="m" value={culvertData.span_diameter_m} onChange={value => handleChange('span_diameter_m', value)} />
        <FieldRow label="Cover Depth" type="number" unit="m" value={culvertData.cover_depth_m} onChange={value => handleChange('cover_depth_m', value)} />
        <FieldRow label="Material" type="select" value={culvertData.material} onChange={value => handleChange('material', value)} options={materialOptions} />
        <FieldRow label="Hydraulic Capacity Check Required" type="toggle" value={culvertData.hydraulic_capacity_check} onChange={value => handleChange('hydraulic_capacity_check', value)} />
      </div>
    </AddPointLayout>;
}