import React, { useState } from 'react';
import { AddPointLayout } from './AddPointLayout';
import { UniversalSection } from './UniversalSection';
import { FieldRow } from './FieldRow';
export function AddPowerlineForm({
  onBack,
  onSave,
  onCancel
}) {
  const [powerlineData, setPowerlineData] = useState({
    utility_owner: '',
    line_type: '',
    voltage_kV: '',
    lowest_sag_clearance_m: '',
    required_action: '',
    outage_contact_person_tel: ''
  });
  const handleChange = (field, value) => {
    setPowerlineData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleSave = () => {
    onSave(powerlineData);
  };
  const lineTypeOptions = [{
    value: 'Power',
    label: 'Power'
  }, {
    value: 'Telecom',
    label: 'Telecom'
  }, {
    value: 'Fiber',
    label: 'Fiber'
  }, {
    value: 'Street-light',
    label: 'Street Light'
  }, {
    value: 'Pipe-bridge',
    label: 'Pipe Bridge'
  }];
  const requiredActionOptions = [{
    value: 'None',
    label: 'None'
  }, {
    value: 'Lift',
    label: 'Lift'
  }, {
    value: 'Shutdown',
    label: 'Shutdown'
  }, {
    value: 'Escort Boom',
    label: 'Escort Boom'
  }];
  return <AddPointLayout pointType="Power Line" onBack={onBack} onSave={handleSave} onCancel={onCancel} universalSection={<UniversalSection onChange={() => {}} />}>
      <div className="space-y-4">
        <FieldRow label="Utility Owner" value={powerlineData.utility_owner} onChange={value => handleChange('utility_owner', value)} />
        <FieldRow label="Line Type" type="select" value={powerlineData.line_type} onChange={value => handleChange('line_type', value)} options={lineTypeOptions} />
        <FieldRow label="Voltage" type="number" unit="kV" value={powerlineData.voltage_kV} onChange={value => handleChange('voltage_kV', value)} />
        <FieldRow label="Lowest Sag Clearance" type="number" unit="m" value={powerlineData.lowest_sag_clearance_m} onChange={value => handleChange('lowest_sag_clearance_m', value)} />
        <FieldRow label="Required Action" type="select" value={powerlineData.required_action} onChange={value => handleChange('required_action', value)} options={requiredActionOptions} />
        <FieldRow label="Outage Contact Person" type="tel" value={powerlineData.outage_contact_person_tel} onChange={value => handleChange('outage_contact_person_tel', value)} placeholder="+1 (555) 123-4567" />
      </div>
    </AddPointLayout>;
}