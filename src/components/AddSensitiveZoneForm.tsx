import React, { useState } from 'react';
import { AddPointLayout } from './AddPointLayout';
import { UniversalSection } from './UniversalSection';
import { FieldRow } from './FieldRow';
export function AddSensitiveZoneForm({
  onBack,
  onSave,
  onCancel
}) {
  const [zoneData, setZoneData] = useState({
    zone_type: '',
    speed_limit_day_kph: '',
    speed_limit_night_kph: '',
    curfew_hours: '',
    public_notification_required: false
  });
  const handleChange = (field, value) => {
    setZoneData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleSave = () => {
    onSave(zoneData);
  };
  const zoneTypeOptions = [{
    value: 'School',
    label: 'School Zone'
  }, {
    value: 'Hospital',
    label: 'Hospital Zone'
  }, {
    value: 'Market',
    label: 'Market/Commercial Zone'
  }, {
    value: 'Wildlife',
    label: 'Wildlife Crossing Zone'
  }];
  return <AddPointLayout pointType="Sensitive Zone" onBack={onBack} onSave={handleSave} onCancel={onCancel} universalSection={<UniversalSection onChange={() => {}} />}>
      <div className="space-y-4">
        <FieldRow label="Zone Type" type="select" value={zoneData.zone_type} onChange={value => handleChange('zone_type', value)} options={zoneTypeOptions} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FieldRow label="Day Speed Limit" type="number" unit="kph" value={zoneData.speed_limit_day_kph} onChange={value => handleChange('speed_limit_day_kph', value)} />
          <FieldRow label="Night Speed Limit" type="number" unit="kph" value={zoneData.speed_limit_night_kph} onChange={value => handleChange('speed_limit_night_kph', value)} />
        </div>
        <FieldRow label="Curfew Hours" value={zoneData.curfew_hours} onChange={value => handleChange('curfew_hours', value)} placeholder="22:00-06:00" />
        <FieldRow label="Public Notification Required" type="toggle" value={zoneData.public_notification_required} onChange={value => handleChange('public_notification_required', value)} />
      </div>
    </AddPointLayout>;
}