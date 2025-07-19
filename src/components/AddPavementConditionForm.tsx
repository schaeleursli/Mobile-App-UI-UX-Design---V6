import React, { useState } from 'react';
import { AddPointLayout } from './AddPointLayout';
import { UniversalSection } from './UniversalSection';
import { FieldRow } from './FieldRow';
export function AddPavementConditionForm({
  onBack,
  onSave,
  onCancel
}) {
  const [pavementData, setPavementData] = useState({
    distress_type: '',
    severity: '',
    extent_m: '',
    repair_action: ''
  });
  const handleChange = (field, value) => {
    setPavementData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleSave = () => {
    onSave(pavementData);
  };
  const distressTypeOptions = [{
    value: 'Rutting',
    label: 'Rutting'
  }, {
    value: 'Pothole',
    label: 'Pothole'
  }, {
    value: 'Pumping',
    label: 'Pumping'
  }, {
    value: 'Alligator',
    label: 'Alligator Cracking'
  }];
  const severityOptions = [{
    value: 'Low',
    label: 'Low'
  }, {
    value: 'Medium',
    label: 'Medium'
  }, {
    value: 'High',
    label: 'High'
  }];
  return <AddPointLayout pointType="Pavement Condition" onBack={onBack} onSave={handleSave} onCancel={onCancel} universalSection={<UniversalSection onChange={() => {}} />}>
      <div className="space-y-4">
        <FieldRow label="Distress Type" type="select" value={pavementData.distress_type} onChange={value => handleChange('distress_type', value)} options={distressTypeOptions} />
        <FieldRow label="Severity" type="select" value={pavementData.severity} onChange={value => handleChange('severity', value)} options={severityOptions} />
        <FieldRow label="Extent" type="number" unit="m" value={pavementData.extent_m} onChange={value => handleChange('extent_m', value)} />
        <FieldRow label="Repair Action" value={pavementData.repair_action} onChange={value => handleChange('repair_action', value)} placeholder="Required repair action" />
      </div>
    </AddPointLayout>;
}