import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'floating';
  opacity?: 'low' | 'medium' | 'high';
}
export function GlassPanel({
  children,
  className = '',
  position = 'floating',
  opacity = 'medium'
}: GlassPanelProps) {
  const {
    theme
  } = useTheme();
  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'fixed top-0 left-0 right-0 z-40';
      case 'bottom':
        return 'fixed bottom-0 left-0 right-0 z-40';
      case 'left':
        return 'fixed top-0 bottom-0 left-0 z-40';
      case 'right':
        return 'fixed top-0 bottom-0 right-0 z-40';
      case 'center':
        return 'fixed inset-0 flex items-center justify-center z-40';
      case 'floating':
      default:
        return 'z-10';
    }
  };
  const getOpacity = () => {
    switch (opacity) {
      case 'low':
        return theme === 'light' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)';
      case 'high':
        return theme === 'light' ? 'rgba(255, 255, 255, 0.75)' : 'rgba(0, 0, 0, 0.75)';
      case 'medium':
      default:
        return theme === 'light' ? 'rgba(255, 255, 255, 0.35)' : 'rgba(0, 0, 0, 0.35)';
    }
  };
  // Glassmorphism styles
  const glassStyles = {
    backdropFilter: 'blur(20px)',
    backgroundColor: getOpacity(),
    border: `1px solid ${theme === 'light' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)'}`,
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
  };
  return <div className={`rounded-xl p-4 ${getPositionClasses()} ${className}`} style={glassStyles}>
      {children}
    </div>;
}