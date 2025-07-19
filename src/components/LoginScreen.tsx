import React from 'react';
import { MapPinIcon } from 'lucide-react';
export function LoginScreen({
  onLogin
}) {
  return <div className="flex flex-col flex-grow bg-primary dark:bg-primary-dark w-full transition-colors">
      <div className="flex-1 flex flex-col items-center justify-center pt-20">
        <div className="flex items-center mb-2">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <div className="absolute w-full h-full rounded-full border-2 border-blue-400"></div>
            <MapPinIcon size={32} className="text-blue-400" />
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center">
              <div className="w-3 h-1 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-white mt-2">Route</h1>
        <h1 className="text-4xl font-bold text-white">Survey</h1>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-t-3xl overflow-hidden shadow-lg">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
            Login
          </h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-gray-600 dark:text-gray-300 text-lg">
              Email
            </label>
            <input type="email" defaultValue="test@gmail.com" className="w-full p-4 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg text-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-gray-600 dark:text-gray-300 text-lg">
              Password
            </label>
            <input type="password" defaultValue="••••••••" className="w-full p-4 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg text-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 outline-none transition-all" />
          </div>
          <div className="pt-4">
            <button onClick={onLogin} className="w-full p-4 bg-[#3b4359] text-white rounded-lg text-xl">
              Login
            </button>
          </div>
          <div className="pt-2">
            <button className="w-full p-4 bg-blue-400 text-white rounded-lg text-xl">
              Forgot password
            </button>
          </div>
        </div>
      </div>
    </div>;
}