import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  icon?: React.ReactNode;
}
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  onClick,
  type = 'button',
  disabled = false,
  icon
}: ButtonProps) {
  const {
    colors
  } = useTheme();
  // Size classes
  const sizeClasses = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6 text-base',
    lg: 'py-4 px-8 text-lg'
  };
  // Style based on variant
  const getButtonStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: colors.primary,
          color: '#FFFFFF',
          border: 'none'
        };
      case 'secondary':
        return {
          backgroundColor: '#F3F4F6',
          color: colors.textPrimary,
          border: `1px solid ${colors.border}`
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: colors.primary,
          border: `1px solid ${colors.primary}`
        };
      case 'danger':
        return {
          backgroundColor: colors.alertError,
          color: '#FFFFFF',
          border: 'none'
        };
      default:
        return {
          backgroundColor: colors.primary,
          color: '#FFFFFF',
          border: 'none'
        };
    }
  };
  return <button type={type} onClick={onClick} disabled={disabled} className={`rounded-lg font-medium flex items-center justify-center transition-colors ${sizeClasses[size]} ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90 active:opacity-100'}`} style={getButtonStyles()}>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>;
}