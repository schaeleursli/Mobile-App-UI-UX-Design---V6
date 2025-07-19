import React, { useState } from 'react';
import { AddPointLayout } from './AddPointLayout';
import { UniversalSection } from './UniversalSection';
import { FieldRow } from './FieldRow';
export function AddRailCrossingForm({
  onBack,
  onSave,
  onCancel
}) {
  const [railData, setRailData] = useState({
    rail_owner: '',
    crossing_ID: '',
    angle_deg: '',
    flangeway_depth_mm: '',
    warning_device: '',
    train_frequency_per_day: '',
    contact_tel: ''
  });
  const handleChange = (field, value) => {
    setRailData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleSave = () => {
    onSave(railData);
  };
  const warningDeviceOptions = [{
    value: 'Boom',
    label: 'Boom Gates'
  }, {
    value: 'Lights',
    label: 'Flashing Lights'
  }, {
    value: 'Passive',
    label: 'Passive (Signs Only)'
  }];
  return <AddPointLayout pointType="Rail Crossing" onBack={onBack} onSave={handleSave} onCancel={onCancel} universalSection={<UniversalSection onChange={() => {}} />}>
      <div className="space-y-4">
        <FieldRow label="Rail Owner" value={railData.rail_owner} onChange={value => handleChange('rail_owner', value)} />
        <FieldRow label="Crossing ID" value={railData.crossing_ID} onChange={value => handleChange('crossing_ID', value)} />
        <FieldRow label="Crossing Angle" type="number" unit="deg" value={railData.angle_deg} onChange={value => handleChange('angle_deg', value)} />
        <FieldRow label="Flangeway Depth" type="number" unit="mm" value={railData.flangeway_depth_mm} onChange={value => handleChange('flangeway_depth_mm', value)} />
        <FieldRow label="Warning Device" type="select" value={railData.warning_device} onChange={value => handleChange('warning_device', value)} options={warningDeviceOptions} />
        <FieldRow label="Train Frequency" type="number" unit="/day" value={railData.train_frequency_per_day} onChange={value => handleChange('train_frequency_per_day', value)} />
        <FieldRow label="Contact Telephone" type="tel" value={railData.contact_tel} onChange={value => handleChange('contact_tel', value)} placeholder="+1 (555) 123-4567" />
      </div>
    </AddPointLayout>;
}