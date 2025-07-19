import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from './Button';
interface DialogProps {
  title: string;
  message: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  type?: 'info' | 'warning' | 'danger';
}
export function Dialog({
  title,
  message,
  isOpen,
  onClose,
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'info'
}: DialogProps) {
  const {
    colors
  } = useTheme();
  if (!isOpen) return null;
  const getButtonVariant = () => {
    switch (type) {
      case 'danger':
        return 'danger';
      case 'warning':
        return 'primary';
      case 'info':
      default:
        return 'primary';
    }
  };
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-md rounded-lg shadow-xl p-6" style={{
      backgroundColor: colors.card
    }}>
        <h3 className="text-xl font-bold mb-2" style={{
        color: colors.textPrimary
      }}>
          {title}
        </h3>
        <p className="mb-6" style={{
        color: colors.textSecondary
      }}>
          {message}
        </p>
        <div className="flex space-x-3">
          <Button variant="secondary" onClick={onClose} fullWidth>
            {cancelText}
          </Button>
          <Button variant={getButtonVariant()} onClick={onConfirm} fullWidth>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>;
}