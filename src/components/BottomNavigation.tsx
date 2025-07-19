import React from 'react';
import { HomeIcon, MapIcon, ClipboardIcon, BarChart2Icon, ShareIcon } from 'lucide-react';
import { GlassPanel } from './ui/GlassPanel';
import { useTheme } from '../contexts/ThemeContext';
export function BottomNavigation({
  currentScreen,
  onNavigate
}) {
  const {
    colors
  } = useTheme();
  const navItems = [{
    id: 'dashboard',
    icon: HomeIcon,
    label: 'Home'
  }, {
    id: 'plan',
    icon: ClipboardIcon,
    label: 'Plan'
  }, {
    id: 'survey',
    icon: MapIcon,
    label: 'Survey'
  }, {
    id: 'report',
    icon: BarChart2Icon,
    label: 'Report'
  }, {
    id: 'share',
    icon: ShareIcon,
    label: 'Share'
  }];
  return <GlassPanel position="bottom" className="z-50">
      <div className="grid grid-cols-5 items-center">
        {navItems.map(item => <button key={item.id} onClick={() => onNavigate(item.id)} className="flex flex-col items-center p-2 transition-colors" style={{
        color: currentScreen === item.id ? colors.primary : colors.textSecondary
      }}>
            <item.icon size={24} />
            <span className="text-xs mt-1">{item.label}</span>
          </button>)}
      </div>
    </GlassPanel>;
}