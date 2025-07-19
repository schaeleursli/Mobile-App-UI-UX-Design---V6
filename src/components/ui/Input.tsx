import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  unit?: string;
  className?: string;
  min?: number;
  max?: number;
  step?: number;
}
export function Input({
  type = 'text',
  placeholder,
  value,
  onChange,
  id,
  name,
  disabled = false,
  required = false,
  unit,
  className = '',
  min,
  max,
  step
}: InputProps) {
  const {
    colors
  } = useTheme();
  const baseStyles = {
    backgroundColor: colors.inputBg,
    color: colors.textPrimary,
    borderColor: colors.border
  };
  return <div className="relative">
      <input type={type} id={id} name={name} value={value} onChange={onChange} placeholder={placeholder} disabled={disabled} required={required} min={min} max={max} step={step} className={`w-full p-4 rounded-lg border appearance-none ${unit ? 'pr-16' : ''} ${className}`} style={baseStyles} />
      {unit && <div className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 rounded text-sm font-medium" style={{
      backgroundColor: colors.border,
      color: colors.textSecondary
    }}>
          {unit}
        </div>}
    </div>;
}