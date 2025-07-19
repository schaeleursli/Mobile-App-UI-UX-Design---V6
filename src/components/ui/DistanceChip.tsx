import React from 'react';
import { GlassChip } from './GlassChip';
import { MapPinIcon } from 'lucide-react';
interface DistanceChipProps {
  distance: string;
  unit?: 'km' | 'mi';
  className?: string;
}
export function DistanceChip({
  distance,
  unit = 'km',
  className = ''
}: DistanceChipProps) {
  return <GlassChip className={`font-medium shadow-lg ${className}`} icon={<MapPinIcon size={16} />}>
      {distance} {unit}
    </GlassChip>;
}