import React from 'react';
import { GlassPanel } from './GlassPanel';
import { GlassButton } from './GlassButton';
import { CheckIcon, XIcon } from 'lucide-react';
interface StickyFooterActionsProps {
  onSave: () => void;
  onCancel: () => void;
  saveText?: string;
  cancelText?: string;
  saveIcon?: React.ReactNode;
  cancelIcon?: React.ReactNode;
  className?: string;
}
export function StickyFooterActions({
  onSave,
  onCancel,
  saveText = 'Save',
  cancelText = 'Cancel',
  saveIcon = <CheckIcon size={18} />,
  cancelIcon = <XIcon size={18} />,
  className = ''
}: StickyFooterActionsProps) {
  return <GlassPanel position="bottom" className={`p-4 flex justify-end space-x-3 z-50 ${className}`}>
      <GlassButton variant="secondary" onClick={onCancel} icon={cancelIcon}>
        {cancelText}
      </GlassButton>
      <GlassButton variant="primary" onClick={onSave} icon={saveIcon}>
        {saveText}
      </GlassButton>
    </GlassPanel>;
}