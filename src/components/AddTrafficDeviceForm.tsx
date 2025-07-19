import React, { useState, Component } from 'react';
import { AddPointLayout } from './AddPointLayout';
import { UniversalSection } from './UniversalSection';
import { FieldRow } from './FieldRow';
export function AddTrafficDeviceForm({
  onBack,
  onSave,
  onCancel
}) {
  const [deviceData, setDeviceData] = useState({
    device_type: '',
    lowest_component_ht_m: '',
    removal_method_est_time_min: '',
    authority_contact: ''
  });
  const handleChange = (field, value) => {
    setDeviceData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleSave = () => {
    onSave(deviceData);
  };
  const deviceTypeOptions = [{
    value: 'Mast Arm',
    label: 'Mast Arm'
  }, {
    value: 'Span Wire',
    label: 'Span Wire'
  }, {
    value: 'Gantry',
    label: 'Gantry'
  }, {
    value: 'Sign',
    label: 'Sign'
  }];
  return <AddPointLayout pointType="Traffic Control Device" onBack={onBack} onSave={handleSave} onCancel={onCancel} universalSection={<UniversalSection onChange={() => {}} />}>
      <div className="space-y-4">
        <FieldRow label="Device Type" type="select" value={deviceData.device_type} onChange={value => handleChange('device_type', value)} options={deviceTypeOptions} />
        <FieldRow label="Lowest Component Height" type="number" unit="m" value={deviceData.lowest_component_ht_m} onChange={value => handleChange('lowest_component_ht_m', value)} />
        <FieldRow label="Removal Method Est. Time" type="number" unit="min" value={deviceData.removal_method_est_time_min} onChange={value => handleChange('removal_method_est_time_min', value)} />
        <FieldRow label="Authority Contact" type="tel" value={deviceData.authority_contact} onChange={value => handleChange('authority_contact', value)} placeholder="+1 (555) 123-4567" />
      </div>
    </AddPointLayout>;
}