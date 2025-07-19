import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}
export function Switch({
  checked = false,
  onChange,
  disabled = false
}: SwitchProps) {
  const {
    colors
  } = useTheme();
  return <button type="button" onClick={() => !disabled && onChange?.(!checked)} className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`} style={{
    backgroundColor: checked ? colors.primary : colors.border
  }} disabled={disabled} aria-checked={checked} role="switch">
      <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-9' : 'translate-x-1'}`} style={{
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    }} />
    </button>;
}