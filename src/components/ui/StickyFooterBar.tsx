import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
interface StickyFooterBarProps {
  children: React.ReactNode;
}
export function StickyFooterBar({
  children
}: StickyFooterBarProps) {
  const {
    colors
  } = useTheme();
  return <div className="fixed bottom-0 left-0 right-0 p-4 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-10" style={{
    backgroundColor: colors.card,
    borderTop: `1px solid ${colors.border}`
  }}>
      <div className="flex items-center justify-end space-x-3">{children}</div>
    </div>;
}