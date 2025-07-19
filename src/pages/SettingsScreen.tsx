import React, { useState } from 'react';
import { Header } from '../components/Header';
import { MoonIcon, SunIcon, UserIcon, BuildingIcon, LogOutIcon, ChevronRightIcon, EyeIcon, SettingsIcon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { FormVisibilitySettings } from './FormVisibilitySettings';
export function SettingsScreen({
  onBack,
  onProfileClick,
  onSettingsClick
}) {
  const {
    theme,
    setTheme
  } = useTheme();
  const [showFormVisibilitySettings, setShowFormVisibilitySettings] = useState(false);
  const [formVisibility, setFormVisibility] = useState([]);
  const handleSaveFormVisibility = visibility => {
    setFormVisibility(visibility);
    setShowFormVisibilitySettings(false);
    // In a real app, we would save this to local storage or a backend
    localStorage.setItem('formVisibility', JSON.stringify(visibility));
  };
  if (showFormVisibilitySettings) {
    return <FormVisibilitySettings onBack={() => setShowFormVisibilitySettings(false)} onSave={handleSaveFormVisibility} />;
  }
  return <div className="flex flex-col h-full min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header title="Settings" onBack={onBack} />
      <div className="flex-1 overflow-y-auto p-4 pb-24">
        <div className="space-y-4">
          {/* Theme Toggle */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center">
                {theme === 'dark' ? <MoonIcon className="text-blue-500 mr-3" size={24} /> : <SunIcon className="text-yellow-500 mr-3" size={24} />}
                <span className="text-gray-900 dark:text-white">
                  {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                </span>
              </div>
              <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center p-1 transition-all">
                <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
          {/* Form Visibility Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <button onClick={() => setShowFormVisibilitySettings(true)} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
              <div className="flex items-center">
                <EyeIcon className="text-green-500 mr-3" size={24} />
                <span className="text-gray-900 dark:text-white">
                  Form Visibility
                </span>
              </div>
              <ChevronRightIcon className="text-gray-400" size={20} />
            </button>
          </div>
          {/* Profile & Account */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <button className="w-full flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors" onClick={onProfileClick}>
              <div className="flex items-center">
                <UserIcon className="text-blue-500 mr-3" size={24} />
                <span className="text-gray-900 dark:text-white">
                  Personal Info
                </span>
              </div>
              <ChevronRightIcon className="text-gray-400" size={20} />
            </button>
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
              <div className="flex items-center">
                <BuildingIcon className="text-purple-500 mr-3" size={24} />
                <span className="text-gray-900 dark:text-white">
                  Company Info
                </span>
              </div>
              <ChevronRightIcon className="text-gray-400" size={20} />
            </button>
          </div>
          {/* App Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
              <div className="flex items-center">
                <SettingsIcon className="text-gray-500 mr-3" size={24} />
                <span className="text-gray-900 dark:text-white">
                  App Configuration
                </span>
              </div>
              <ChevronRightIcon className="text-gray-400" size={20} />
            </button>
          </div>
          {/* Logout */}
          <div className="mt-8">
            <button className="w-full flex items-center justify-center p-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
              <LogOutIcon className="mr-2" size={20} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>;
}