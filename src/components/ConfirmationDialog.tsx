import React from 'react';
import { XIcon } from 'lucide-react';
interface ConfirmationDialogProps {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
  onConfirm: () => void;
  onCancel: () => void;
}
export function ConfirmationDialog({
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'info',
  onConfirm,
  onCancel
}: ConfirmationDialogProps) {
  // Determine button colors based on type
  const getButtonStyles = () => {
    switch (type) {
      case 'danger':
        return {
          confirm: 'bg-red-600 hover:bg-red-700 text-white',
          icon: 'text-red-500'
        };
      case 'warning':
        return {
          confirm: 'bg-amber-600 hover:bg-amber-700 text-white',
          icon: 'text-amber-500'
        };
      default:
        return {
          confirm: 'bg-blue-600 hover:bg-blue-700 text-white',
          icon: 'text-blue-500'
        };
    }
  };
  const styles = getButtonStyles();
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop - semi-transparent overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm" onClick={onCancel} />
      {/* Dialog content */}
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            {type === 'danger' && <svg className={`w-6 h-6 mr-2 ${styles.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>}
            {title}
          </h3>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <XIcon size={20} />
          </button>
        </div>
        {/* Body */}
        <div className="p-6">
          <p className="text-gray-700 dark:text-gray-300">{message}</p>
        </div>
        {/* Footer */}
        <div className="flex justify-end gap-3 p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
          <button onClick={onCancel} className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors">
            {cancelText}
          </button>
          <button onClick={onConfirm} className={`px-4 py-2 rounded-lg transition-colors ${styles.confirm}`}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>;
}