import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
interface GlassChipProps {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  onClick?: () => void;
}
export function GlassChip({
  children,
  className = '',
  icon,
  variant = 'default',
  onClick
}: GlassChipProps) {
  const {
    theme,
    colors
  } = useTheme();
  // Base glassmorphism styles
  const glassStyles = {
    backdropFilter: 'blur(20px)',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    border: `1px solid ${theme === 'light' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)'}`
  };
  // Variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: `${colors.primary}${theme === 'light' ? 'cc' : 'cc'}`,
          color: '#FFFFFF'
        };
      case 'success':
        return {
          backgroundColor: '#10B981cc',
          color: '#FFFFFF'
        };
      case 'warning':
        return {
          backgroundColor: `${colors.alertWarning}${theme === 'light' ? 'cc' : 'cc'}`,
          color: '#FFFFFF'
        };
      case 'error':
        return {
          backgroundColor: `${colors.alertError}${theme === 'light' ? 'cc' : 'cc'}`,
          color: '#FFFFFF'
        };
      case 'default':
      default:
        return {
          backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(30, 30, 35, 0.5)',
          color: theme === 'light' ? colors.textPrimary : colors.textPrimary
        };
    }
  };
  return <div className={`
        inline-flex items-center px-4 py-2 rounded-full text-sm font-medium
        ${onClick ? 'cursor-pointer hover:opacity-90 active:scale-[0.98]' : ''}
        ${className}
      `} style={{
    ...glassStyles,
    ...getVariantStyles()
  }} onClick={onClick}>
      {icon && <span className="mr-1.5">{icon}</span>}
      {children}
    </div>;
}