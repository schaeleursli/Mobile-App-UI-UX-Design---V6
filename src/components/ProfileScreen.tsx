import React from 'react';
import { Header } from './Header';
import { UserIcon, BuildingIcon, LogOutIcon, SunIcon, MoonIcon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
export function ProfileScreen({
  userData,
  onNavigate,
  onLogout
}) {
  const {
    theme,
    toggleTheme
  } = useTheme();
  return <div className="flex flex-col flex-grow">
      <Header title="Profile" />
      <div className="flex flex-col p-4 space-y-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 flex flex-col items-center shadow-sm">
          <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center mb-4">
            <div className="w-8 h-8 rounded-full bg-blue-500 border-4 border-white dark:border-gray-800 mb-1"></div>
            <div className="absolute mt-8 w-12 h-3 bg-white dark:bg-gray-800 rounded-full"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {userData.firstName} {userData.lastName}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {userData.email}
          </p>
        </div>
        <button onClick={toggleTheme} className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <div className="flex items-center">
            {theme === 'light' ? <SunIcon size={20} className="mr-3 text-yellow-500" /> : <MoonIcon size={20} className="mr-3 text-blue-400" />}
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
            </span>
          </div>
          <div className="w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center p-1">
            <div className={`w-4 h-4 rounded-full transition-transform ${theme === 'dark' ? 'bg-blue-400 transform translate-x-6' : 'bg-yellow-500'}`}></div>
          </div>
        </button>
        <button onClick={() => onNavigate('personalInfo')} className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <div className="flex items-center">
            <UserIcon size={20} className="mr-3 text-gray-600 dark:text-gray-300" />
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              Personal Info
            </span>
          </div>
          <div className="text-gray-400 dark:text-gray-500">&gt;</div>
        </button>
        <button onClick={() => onNavigate('companyInfo')} className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <div className="flex items-center">
            <BuildingIcon size={20} className="mr-3 text-gray-600 dark:text-gray-300" />
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              Company Info
            </span>
          </div>
          <div className="text-gray-400 dark:text-gray-500">&gt;</div>
        </button>
        <div className="h-px bg-gray-300 my-2"></div>
        <button onClick={onLogout} className="flex items-center justify-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <LogOutIcon size={20} className="mr-2 text-red-500" />
          <span className="text-lg font-semibold text-red-500">Logout</span>
        </button>
      </div>
    </div>;
}