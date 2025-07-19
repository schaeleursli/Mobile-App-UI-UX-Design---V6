import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { MapIcon, SatelliteIcon, LayersIcon } from 'lucide-react';
interface MapStyleSwitcherProps {
  currentStyle: 'standard' | 'satellite' | 'survey';
  onStyleChange: (style: 'standard' | 'satellite' | 'survey') => void;
}
export function MapStyleSwitcher({
  currentStyle,
  onStyleChange
}: MapStyleSwitcherProps) {
  const {
    colors
  } = useTheme();
  const mapStyles = [{
    id: 'standard',
    icon: MapIcon,
    label: 'Map'
  }, {
    id: 'satellite',
    icon: SatelliteIcon,
    label: 'Satellite'
  }, {
    id: 'survey',
    icon: LayersIcon,
    label: 'Survey'
  }] as const;
  return <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden z-10" style={{
    backgroundColor: colors.card
  }}>
      <div className="flex flex-col">
        {mapStyles.map(style => <button key={style.id} onClick={() => onStyleChange(style.id)} className={`p-3 flex items-center justify-center ${currentStyle === style.id ? 'bg-opacity-10' : ''}`} style={{
        backgroundColor: currentStyle === style.id ? colors.primary : 'transparent',
        color: currentStyle === style.id ? colors.primary : colors.textSecondary
      }}>
            <style.icon size={20} />
          </button>)}
      </div>
    </div>;
}