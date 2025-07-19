import React, { useState } from 'react';
interface FieldRowProps {
  label: string;
  type?: 'text' | 'number' | 'select' | 'file' | 'textarea' | 'tel' | 'toggle';
  unit?: string;
  placeholder?: string;
  value?: string | number | boolean;
  onChange?: (value: any) => void;
  options?: {
    value: string;
    label: string;
  }[];
  error?: string;
  valid?: boolean;
}
export function FieldRow({
  label,
  type = 'text',
  unit,
  placeholder,
  value,
  onChange,
  options = [],
  error,
  valid
}: FieldRowProps) {
  const [focused, setFocused] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (onChange) {
      if (type === 'number') {
        onChange(e.target.value ? Number(e.target.value) : '');
      } else {
        onChange(e.target.value);
      }
    }
  };
  const handleToggleChange = () => {
    if (onChange) {
      onChange(!value);
    }
  };
  const getBorderClass = () => {
    if (error) return 'border-red-500';
    if (valid) return 'border-green-500';
    if (focused) return 'border-[#1F3C56] dark:border-[#1F3C56]';
    return 'border-gray-300 dark:border-gray-600';
  };
  return <div className="mb-4">
      <label className="block text-sm font-medium mb-1 text-[#0F172A] dark:text-[#F1F5F9]">
        {label}
      </label>
      {type === 'toggle' ? <div className="flex items-center">
          <button type="button" onClick={handleToggleChange} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${value ? 'bg-[#00C48C]' : 'bg-gray-300 dark:bg-gray-600'}`}>
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${value ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
            {value ? 'Yes' : 'No'}
          </span>
        </div> : type === 'select' ? <div className="relative">
          <select value={value as string} onChange={handleChange} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} className={`w-full p-2 bg-[#F5F7FA] dark:bg-[#2A2C30] rounded-[4px] ${getBorderClass()} outline-none transition-colors`}>
            <option value="">Select an option</option>
            {options.map(option => <option key={option.value} value={option.value}>
                {option.label}
              </option>)}
          </select>
        </div> : type === 'textarea' ? <textarea value={value as string} onChange={handleChange as any} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} placeholder={placeholder} className={`w-full p-2 bg-[#F5F7FA] dark:bg-[#2A2C30] rounded-[4px] ${getBorderClass()} outline-none transition-colors min-h-[80px]`} /> : <div className="relative">
          <input type={type} value={value as string | number} onChange={handleChange} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} placeholder={placeholder} className={`w-full p-2 bg-[#F5F7FA] dark:bg-[#2A2C30] rounded-[4px] ${getBorderClass()} outline-none transition-colors ${unit ? 'pr-16' : ''}`} />
          {unit && <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-[4px] text-xs font-medium text-gray-600 dark:text-gray-300">
              {unit}
            </div>}
        </div>}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>;
}