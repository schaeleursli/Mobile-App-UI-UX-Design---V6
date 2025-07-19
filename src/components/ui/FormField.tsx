import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
interface FormFieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  children: React.ReactNode;
}
export function FormField({
  label,
  htmlFor,
  error,
  children
}: FormFieldProps) {
  const {
    colors
  } = useTheme();
  return <div className="mb-4">
      <label htmlFor={htmlFor} className="block text-base font-medium mb-2" style={{
      color: colors.textPrimary
    }}>
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-sm" style={{
      color: colors.alertError
    }}>
          {error}
        </p>}
    </div>;
}