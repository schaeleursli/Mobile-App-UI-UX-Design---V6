import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'small' | 'medium' | 'large';
  elevation?: 'none' | 'low' | 'medium' | 'high';
}
export function GlassCard({
  children,
  className = '',
  padding = 'medium',
  elevation = 'medium'
}: GlassCardProps) {
  const {
    theme
  } = useTheme();
  const getPadding = () => {
    switch (padding) {
      case 'none':
        return 'p-0';
      case 'small':
        return 'p-3';
      case 'large':
        return 'p-6';
      case 'medium':
      default:
        return 'p-4';
    }
  };
  const getElevation = () => {
    switch (elevation) {
      case 'none':
        return '';
      case 'low':
        return 'shadow-sm';
      case 'high':
        return 'shadow-xl';
      case 'medium':
      default:
        return 'shadow-md';
    }
  };
  // Glassmorphism styles based on theme
  const glassStyles = {
    backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.25)',
    backdropFilter: 'blur(20px)',
    border: `1px solid ${theme === 'light' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)'}`
  };
  return <div className={`rounded-xl ${getPadding()} ${getElevation()} ${className}`} style={{
    ...glassStyles,
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
  }}>
      {children}
    </div>;
}