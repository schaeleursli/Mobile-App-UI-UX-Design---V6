import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { CheckIcon, CloudOffIcon, CloudIcon, RefreshCwIcon } from 'lucide-react';
type SyncStatus = 'synced' | 'syncing' | 'offline' | 'error';
interface SyncStatusIndicatorProps {
  status: SyncStatus;
  lastSynced?: string;
}
export function SyncStatusIndicator({
  status,
  lastSynced
}: SyncStatusIndicatorProps) {
  const {
    colors
  } = useTheme();
  const getStatusInfo = () => {
    switch (status) {
      case 'synced':
        return {
          icon: <CheckIcon size={16} className="text-green-500" />,
          text: 'Synced',
          color: '#10B981'
        };
      case 'syncing':
        return {
          icon: <RefreshCwIcon size={16} className="text-blue-500 animate-spin" />,
          text: 'Syncing...',
          color: colors.primary
        };
      case 'offline':
        return {
          icon: <CloudOffIcon size={16} className="text-gray-500" />,
          text: 'Offline',
          color: colors.textSecondary
        };
      case 'error':
        return {
          icon: <CloudOffIcon size={16} className="text-red-500" />,
          text: 'Sync Failed',
          color: colors.alertError
        };
      default:
        return {
          icon: <CloudIcon size={16} className="text-gray-500" />,
          text: 'Unknown',
          color: colors.textSecondary
        };
    }
  };
  const {
    icon,
    text,
    color
  } = getStatusInfo();
  return <div className="flex items-center space-x-1">
      <div>{icon}</div>
      <span className="text-xs font-medium" style={{
      color
    }}>
        {text}
      </span>
      {lastSynced && <span className="text-xs" style={{
      color: colors.textSecondary
    }}>
          ({lastSynced})
        </span>}
    </div>;
}