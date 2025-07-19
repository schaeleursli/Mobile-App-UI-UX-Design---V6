import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}
export function Card({
  children,
  className = '',
  title
}: CardProps) {
  const {
    colors
  } = useTheme();
  return <div className={`rounded-lg shadow-sm p-4 ${className}`} style={{
    backgroundColor: colors.card,
    borderColor: colors.border
  }}>
      {title && <h3 className="text-lg font-semibold mb-3" style={{
      color: colors.textPrimary
    }}>
          {title}
        </h3>}
      {children}
    </div>;
}