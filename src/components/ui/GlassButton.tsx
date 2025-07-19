import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
interface GlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
}
export function GlassButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  icon,
  fullWidth = false,
  type = 'button'
}: GlassButtonProps) {
  const {
    theme,
    colors
  } = useTheme();
  // Size classes
  const sizeClasses = {
    sm: 'py-2 px-3 text-sm',
    md: 'py-3 px-4 text-base',
    lg: 'py-4 px-6 text-lg',
    icon: 'p-3'
  };
  // Glassmorphism base styles
  const glassBase = {
    backdropFilter: 'blur(20px)',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    border: `1px solid ${theme === 'light' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)'}`
  };
  // Variant specific styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: `${colors.primary}${theme === 'light' ? 'cc' : 'cc'}`,
          color: '#FFFFFF'
        };
      case 'secondary':
        return {
          backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(30, 30, 35, 0.5)',
          color: theme === 'light' ? colors.textPrimary : colors.textPrimary
        };
      case 'danger':
        return {
          backgroundColor: `${colors.alertError}${theme === 'light' ? 'cc' : 'cc'}`,
          color: '#FFFFFF'
        };
      case 'success':
        return {
          backgroundColor: '#10B981cc',
          color: '#FFFFFF'
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: theme === 'light' ? colors.textPrimary : colors.textPrimary,
          boxShadow: 'none',
          border: 'none'
        };
      default:
        return {
          backgroundColor: `${colors.primary}${theme === 'light' ? 'cc' : 'cc'}`,
          color: '#FFFFFF'
        };
    }
  };
  return <button type={type} onClick={onClick} disabled={disabled} className={`
        rounded-xl font-medium flex items-center justify-center transition-all
        ${sizeClasses[size]} 
        ${fullWidth ? 'w-full' : ''} 
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90 active:scale-[0.98]'}
        ${className}
      `} style={{
    ...glassBase,
    ...getVariantStyles()
  }}>
      {icon && <span className={`${children ? 'mr-2' : ''}`}>{icon}</span>}
      {children}
    </button>;
}