import React, { useState } from 'react';
import { AddPointLayout } from './AddPointLayout';
import { UniversalSection } from './UniversalSection';
import { FieldRow } from './FieldRow';
export function AddTunnelForm({
  onBack,
  onSave,
  onCancel
}) {
  const [tunnelData, setTunnelData] = useState({
    tunnel_name_id: '',
    length_m: '',
    int_clear_height_m: '',
    int_clear_width_m: '',
    ventilation_type: '',
    hazmat_restrictions: ''
  });
  const handleChange = (field, value) => {
    setTunnelData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleSave = () => {
    onSave(tunnelData);
  };
  const ventilationOptions = [{
    value: 'Natural',
    label: 'Natural'
  }, {
    value: 'Forced',
    label: 'Forced'
  }];
  return <AddPointLayout pointType="Tunnel / Underpass" onBack={onBack} onSave={handleSave} onCancel={onCancel} universalSection={<UniversalSection onChange={() => {}} />}>
      <div className="space-y-4">
        <FieldRow label="Tunnel Name/ID" value={tunnelData.tunnel_name_id} onChange={value => handleChange('tunnel_name_id', value)} />
        <FieldRow label="Length" type="number" unit="m" value={tunnelData.length_m} onChange={value => handleChange('length_m', value)} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FieldRow label="Interior Clear Height" type="number" unit="m" value={tunnelData.int_clear_height_m} onChange={value => handleChange('int_clear_height_m', value)} />
          <FieldRow label="Interior Clear Width" type="number" unit="m" value={tunnelData.int_clear_width_m} onChange={value => handleChange('int_clear_width_m', value)} />
        </div>
        <FieldRow label="Ventilation Type" type="select" value={tunnelData.ventilation_type} onChange={value => handleChange('ventilation_type', value)} options={ventilationOptions} />
        <FieldRow label="Hazmat Restrictions" type="textarea" value={tunnelData.hazmat_restrictions} onChange={value => handleChange('hazmat_restrictions', value)} placeholder="Enter hazardous material restrictions" />
      </div>
    </AddPointLayout>;
}