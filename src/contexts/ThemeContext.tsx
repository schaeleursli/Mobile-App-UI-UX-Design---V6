import React, { useEffect, useState, createContext, useContext } from 'react';
type Theme = 'light' | 'dark';
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colors: {
    background: string;
    card: string;
    textPrimary: string;
    textSecondary: string;
    primary: string;
    alertWarning: string;
    alertError: string;
    border: string;
    inputBg: string;
    glass: {
      background: string;
      border: string;
      shadow: string;
    };
  };
}
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
export function ThemeProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme;
      return savedTheme || 'light';
    }
    return 'light';
  });
  // Define colors based on theme
  const colors = theme === 'light' ? {
    background: '#F9FAFB',
    card: '#FFFFFF',
    textPrimary: '#1F2937',
    textSecondary: '#6B7280',
    primary: '#00A7E1',
    alertWarning: '#F39C12',
    alertError: '#E83E8C',
    border: '#E5E7EB',
    inputBg: '#F3F4F6',
    glass: {
      background: 'rgba(255, 255, 255, 0.25)',
      border: 'rgba(255, 255, 255, 0.15)',
      shadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
    }
  } : {
    background: '#0F1116',
    card: '#1C1E27',
    textPrimary: '#F4F4F4',
    textSecondary: '#9CA3AF',
    primary: '#00A7E1',
    alertWarning: '#F39C12',
    alertError: '#E83E8C',
    border: '#2A2C34',
    inputBg: '#1C1E27',
    glass: {
      background: 'rgba(0, 0, 0, 0.25)',
      border: 'rgba(255, 255, 255, 0.05)',
      shadow: '0 4px 30px rgba(0, 0, 0, 0.2)'
    }
  };
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
    // Apply background color to body
    document.body.style.backgroundColor = colors.background;
    document.body.style.color = colors.textPrimary;
  }, [theme, colors.background, colors.textPrimary]);
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  return <ThemeContext.Provider value={{
    theme,
    toggleTheme,
    colors
  }}>
      {children}
    </ThemeContext.Provider>;
}
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};