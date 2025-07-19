import React, { useState } from 'react';
import { TrainIcon, GitMergeIcon, ZapIcon, ArrowUpIcon, HelpCircleIcon, PlusIcon, UnderlineIcon, AlertTriangleIcon, BoxIcon, BarChartIcon, ThermometerIcon, CloudRainIcon, SignalIcon, WeightIcon, ActivityIcon, ShieldIcon, XIcon } from 'lucide-react';
import { GlassButton } from './ui/GlassButton';
import { GlassPanel } from './ui/GlassPanel';
import { useTheme } from '../contexts/ThemeContext';
const pointTypeGroups = [{
  name: 'Road Elements',
  types: [{
    id: 'road',
    icon: BoxIcon,
    label: 'Road'
  }, {
    id: 'roadway_geometry',
    icon: ActivityIcon,
    label: 'Roadway Geometry'
  }, {
    id: 'intersection',
    icon: GitMergeIcon,
    label: 'Intersection'
  }, {
    id: 'pavement',
    icon: BarChartIcon,
    label: 'Pavement'
  }, {
    id: 'shoulder',
    icon: BoxIcon,
    label: 'Shoulder'
  }]
}, {
  name: 'Structures',
  types: [{
    id: 'bridge',
    icon: BoxIcon,
    label: 'Bridge'
  }, {
    id: 'tunnel',
    icon: UnderlineIcon,
    label: 'Tunnel'
  }, {
    id: 'culvert',
    icon: BoxIcon,
    label: 'Culvert'
  }]
}, {
  name: 'Obstacles',
  types: [{
    id: 'powerline',
    icon: ZapIcon,
    label: 'Power Line'
  }, {
    id: 'overhead',
    icon: ArrowUpIcon,
    label: 'Overhead'
  }, {
    id: 'railroad',
    icon: TrainIcon,
    label: 'Railroad'
  }, {
    id: 'rail_crossing',
    icon: AlertTriangleIcon,
    label: 'Rail Crossing'
  }, {
    id: 'traffic_device',
    icon: SignalIcon,
    label: 'Traffic Device'
  }, {
    id: 'weight_station',
    icon: WeightIcon,
    label: 'Weight Station'
  }, {
    id: 'vegetation',
    icon: BoxIcon,
    label: 'Vegetation'
  }]
}, {
  name: 'Environmental',
  types: [{
    id: 'gradient',
    icon: ThermometerIcon,
    label: 'Gradient'
  }, {
    id: 'flood_zone',
    icon: CloudRainIcon,
    label: 'Flood Zone'
  }, {
    id: 'sensitive_zone',
    icon: ShieldIcon,
    label: 'Sensitive Zone'
  }]
}, {
  name: 'Other',
  types: [{
    id: 'custom',
    icon: HelpCircleIcon,
    label: 'Custom'
  }]
}];
interface PointTypeFabMenuProps {
  onSelect: (type: string) => void;
  handedness?: 'left' | 'right';
}
export function PointTypeFabMenu({
  onSelect,
  handedness = 'right'
}: PointTypeFabMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const {
    colors
  } = useTheme();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setActiveGroup(null);
    }
  };
  const handleSelect = (type: string) => {
    onSelect(type);
    setIsOpen(false);
    setActiveGroup(null);
  };
  const toggleGroup = (groupName: string) => {
    if (activeGroup === groupName) {
      setActiveGroup(null);
    } else {
      setActiveGroup(groupName);
    }
  };
  return <div className={`fixed ${handedness === 'right' ? 'right-4' : 'left-4'} bottom-24 z-50`}>
      {/* Main FAB button */}
      <GlassButton onClick={toggleMenu} variant={isOpen ? 'danger' : 'primary'} size="icon" className="rounded-full p-4 shadow-lg" icon={isOpen ? <XIcon size={24} /> : <PlusIcon size={24} />} />
      {/* Menu items */}
      {isOpen && <GlassPanel className={`absolute ${handedness === 'right' ? 'right-0' : 'left-0'} bottom-16 mb-2 max-h-[70vh] overflow-y-auto w-64 slide-up`}>
          {pointTypeGroups.map(group => <div key={group.name} className="mb-3">
              <button onClick={() => toggleGroup(group.name)} className="flex items-center justify-between w-full p-3 text-left rounded-lg transition-colors" style={{
          backgroundColor: activeGroup === group.name ? `${colors.primary}22` // Very light tint of primary color
          : 'transparent',
          color: colors.textPrimary
        }}>
                <span className="font-medium">{group.name}</span>
                <span>{activeGroup === group.name ? '−' : '+'}</span>
              </button>
              {activeGroup === group.name && <div className="mt-1 space-y-1 pl-2">
                  {group.types.map(type => <button key={type.id} onClick={() => handleSelect(type.id)} className="flex items-center w-full p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors" style={{
            color: colors.textSecondary
          }}>
                      <type.icon size={18} className="mr-2" />
                      <span>{type.label}</span>
                    </button>)}
                </div>}
            </div>)}
        </GlassPanel>}
    </div>;
}