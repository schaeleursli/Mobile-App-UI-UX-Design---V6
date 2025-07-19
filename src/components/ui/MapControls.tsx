import React from 'react';
import { PlayIcon, PauseIcon, MapIcon, SatelliteIcon, LayersIcon, LocateIcon } from 'lucide-react';
import { GlassButton } from './GlassButton';
import { GlassPanel } from './GlassPanel';
interface MapControlsProps {
  isTracking?: boolean;
  isPaused?: boolean;
  onStartTracking?: () => void;
  onPauseTracking?: () => void;
  onStopTracking?: () => void;
  onLocateMe?: () => void;
  mapStyle?: 'standard' | 'satellite' | 'survey';
  onMapStyleChange?: (style: 'standard' | 'satellite' | 'survey') => void;
  vertical?: boolean;
  className?: string;
}
export function MapControls({
  isTracking = false,
  isPaused = false,
  onStartTracking,
  onPauseTracking,
  onStopTracking,
  onLocateMe,
  mapStyle = 'standard',
  onMapStyleChange,
  vertical = false,
  className = ''
}: MapControlsProps) {
  return <GlassPanel className={`p-2 ${className}`}>
      <div className={`flex ${vertical ? 'flex-col space-y-3' : 'space-x-3'}`}>
        {/* Map Style Controls */}
        {onMapStyleChange && <div className={`flex ${vertical ? 'flex-col space-y-2' : 'space-x-2'}`}>
            <GlassButton variant={mapStyle === 'standard' ? 'primary' : 'secondary'} size="icon" onClick={() => onMapStyleChange('standard')} icon={<MapIcon size={20} />} />
            <GlassButton variant={mapStyle === 'satellite' ? 'primary' : 'secondary'} size="icon" onClick={() => onMapStyleChange('satellite')} icon={<SatelliteIcon size={20} />} />
            <GlassButton variant={mapStyle === 'survey' ? 'primary' : 'secondary'} size="icon" onClick={() => onMapStyleChange('survey')} icon={<LayersIcon size={20} />} />
          </div>}
        {/* Tracking Controls */}
        <div className={`flex ${vertical ? 'flex-col space-y-2' : 'space-x-2'}`}>
          {onLocateMe && <GlassButton variant="secondary" size="icon" onClick={onLocateMe} icon={<LocateIcon size={20} />} />}
          {!isTracking && onStartTracking && <GlassButton variant="success" size="icon" onClick={onStartTracking} icon={<PlayIcon size={20} />} />}
          {isTracking && !isPaused && onPauseTracking && <GlassButton variant="warning" size="icon" onClick={onPauseTracking} icon={<PauseIcon size={20} />} />}
          {isTracking && isPaused && onStartTracking && <GlassButton variant="success" size="icon" onClick={onStartTracking} icon={<PlayIcon size={20} />} />}
          {isTracking && onStopTracking && <GlassButton variant="danger" size="icon" onClick={onStopTracking} icon={<div size={20} />} />}
        </div>
      </div>
    </GlassPanel>;
}