import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
interface TextAreaProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  id?: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  rows?: number;
  className?: string;
}
export function TextArea({
  placeholder,
  value,
  onChange,
  id,
  name,
  disabled = false,
  required = false,
  rows = 4,
  className = ''
}: TextAreaProps) {
  const {
    colors
  } = useTheme();
  const baseStyles = {
    backgroundColor: colors.inputBg,
    color: colors.textPrimary,
    borderColor: colors.border
  };
  return <textarea id={id} name={name} value={value} onChange={onChange} placeholder={placeholder} disabled={disabled} required={required} rows={rows} className={`w-full p-4 rounded-lg border min-h-[100px] ${className}`} style={baseStyles} />;
}