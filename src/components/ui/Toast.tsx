import React, { useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { XIcon, CheckCircleIcon, AlertTriangleIcon, XCircleIcon, InfoIcon } from 'lucide-react';
interface ToastProps {
  message: string;
  type?: 'success' | 'warning' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}
export function Toast({
  message,
  type = 'info',
  onClose,
  duration = 3000
}: ToastProps) {
  const {
    colors
  } = useTheme();
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);
  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return {
          backgroundColor: '#10B981',
          icon: <CheckCircleIcon size={20} className="text-white" />
        };
      case 'warning':
        return {
          backgroundColor: colors.alertWarning,
          icon: <AlertTriangleIcon size={20} className="text-white" />
        };
      case 'error':
        return {
          backgroundColor: colors.alertError,
          icon: <XCircleIcon size={20} className="text-white" />
        };
      case 'info':
      default:
        return {
          backgroundColor: colors.primary,
          icon: <InfoIcon size={20} className="text-white" />
        };
    }
  };
  const {
    backgroundColor,
    icon
  } = getToastStyles();
  return <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md rounded-lg shadow-lg z-50 flex items-center p-4 animate-fade-in" style={{
    backgroundColor
  }}>
      <div className="mr-3">{icon}</div>
      <div className="flex-1 text-white">{message}</div>
      <button onClick={onClose} className="ml-3 text-white hover:opacity-80">
        <XIcon size={20} />
      </button>
    </div>;
}