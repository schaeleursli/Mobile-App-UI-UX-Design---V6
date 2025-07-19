import React, { useState } from 'react';
import { AddPointLayout } from './AddPointLayout';
import { UniversalSection } from './UniversalSection';
import { FieldRow } from './FieldRow';
export function AddBridgeForm({
  onBack,
  onSave,
  onCancel
}) {
  const [bridgeData, setBridgeData] = useState({
    structure_name: '',
    bridge_id_owner: '',
    structure_type: '',
    total_span_m: '',
    clear_deck_width_m: '',
    vertical_clearance_m: '',
    posted_load_limit_t: '',
    bearing_type: '',
    bearing_condition: '',
    skew_angle_deg: '',
    permit_required: false
  });
  const handleChange = (field, value) => {
    setBridgeData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleSave = () => {
    onSave(bridgeData);
  };
  const structureTypeOptions = [{
    value: 'RC / PSC Beam Girder',
    label: 'RC / PSC Beam Girder'
  }, {
    value: 'Concrete Box-Girder',
    label: 'Concrete Box-Girder'
  }, {
    value: 'Steel Plate Girder',
    label: 'Steel Plate Girder'
  }, {
    value: 'Truss (Steel or Timber)',
    label: 'Truss (Steel or Timber)'
  }, {
    value: 'Concrete Slab',
    label: 'Concrete Slab'
  }, {
    value: 'Arch (Concrete or Steel)',
    label: 'Arch (Concrete or Steel)'
  }, {
    value: 'Cable-Stayed',
    label: 'Cable-Stayed'
  }, {
    value: 'Rigid Frame',
    label: 'Rigid Frame'
  }, {
    value: 'Culvert / Box Cell',
    label: 'Culvert / Box Cell'
  }];
  const bearingTypeOptions = [{
    value: 'Elastomeric Pad',
    label: 'Elastomeric Pad'
  }, {
    value: 'Pot Bearing',
    label: 'Pot Bearing'
  }, {
    value: 'Spherical Bearing',
    label: 'Spherical Bearing'
  }, {
    value: 'Rocker / Roller',
    label: 'Rocker / Roller'
  }, {
    value: 'Pinned / Hinge',
    label: 'Pinned / Hinge'
  }, {
    value: 'Sliding Plate (PTFE)',
    label: 'Sliding Plate (PTFE)'
  }, {
    value: 'Lead-Rubber / Seismic Isolation',
    label: 'Lead-Rubber / Seismic Isolation'
  }];
  const bearingConditionOptions = [{
    value: 'Good',
    label: 'Good'
  }, {
    value: 'Fair',
    label: 'Fair'
  }, {
    value: 'Poor',
    label: 'Poor'
  }];
  return <AddPointLayout pointType="Bridge" onBack={onBack} onSave={handleSave} onCancel={onCancel} universalSection={<UniversalSection onChange={() => {}} />}>
      <div className="space-y-4">
        <FieldRow label="Structure Name" value={bridgeData.structure_name} onChange={value => handleChange('structure_name', value)} />
        <FieldRow label="Bridge ID / Owner" value={bridgeData.bridge_id_owner} onChange={value => handleChange('bridge_id_owner', value)} />
        <FieldRow label="Structure Type" type="select" value={bridgeData.structure_type} onChange={value => handleChange('structure_type', value)} options={structureTypeOptions} />
        <FieldRow label="Total Span" type="number" unit="m" value={bridgeData.total_span_m} onChange={value => handleChange('total_span_m', value)} />
        <FieldRow label="Clear Deck Width" type="number" unit="m" value={bridgeData.clear_deck_width_m} onChange={value => handleChange('clear_deck_width_m', value)} />
        <FieldRow label="Vertical Clearance" type="number" unit="m" value={bridgeData.vertical_clearance_m} onChange={value => handleChange('vertical_clearance_m', value)} />
        <FieldRow label="Posted Load Limit" type="number" unit="t" value={bridgeData.posted_load_limit_t} onChange={value => handleChange('posted_load_limit_t', value)} />
        <FieldRow label="Bearing Type" type="select" value={bridgeData.bearing_type} onChange={value => handleChange('bearing_type', value)} options={bearingTypeOptions} />
        <FieldRow label="Bearing Condition" type="select" value={bridgeData.bearing_condition} onChange={value => handleChange('bearing_condition', value)} options={bearingConditionOptions} />
        <FieldRow label="Skew Angle" type="number" unit="deg" value={bridgeData.skew_angle_deg} onChange={value => handleChange('skew_angle_deg', value)} />
        <FieldRow label="Permit Required" type="toggle" value={bridgeData.permit_required} onChange={value => handleChange('permit_required', value)} />
      </div>
    </AddPointLayout>;
}