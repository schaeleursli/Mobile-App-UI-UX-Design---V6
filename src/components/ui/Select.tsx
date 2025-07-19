import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { ChevronDownIcon } from 'lucide-react';
interface Option {
  value: string;
  label: string;
}
interface SelectProps {
  options: Option[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  id?: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}
export function Select({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  id,
  name,
  disabled = false,
  required = false,
  className = ''
}: SelectProps) {
  const {
    colors
  } = useTheme();
  const baseStyles = {
    backgroundColor: colors.inputBg,
    color: colors.textPrimary,
    borderColor: colors.border
  };
  return <div className="relative">
      <select id={id} name={name} value={value} onChange={onChange} disabled={disabled} required={required} className={`w-full p-4 pr-10 rounded-lg border appearance-none ${className}`} style={baseStyles}>
        <option value="">{placeholder}</option>
        {options.map(option => <option key={option.value} value={option.value}>
            {option.label}
          </option>)}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <ChevronDownIcon size={20} style={{
        color: colors.textSecondary
      }} />
      </div>
    </div>;
}