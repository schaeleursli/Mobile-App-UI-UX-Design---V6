import React from 'react';
import { Header } from '../components/Header';
import { TruckIcon, MapPinIcon, PlayIcon, FolderIcon, PlusIcon, ChevronRightIcon } from 'lucide-react';
export function DashboardScreen({
  onProfileClick,
  onSettingsClick
}) {
  const userName = 'Orsan'; // This would come from user context/state
  const greeting = getGreeting();
  const recentRoutes = [{
    id: '1',
    name: 'Vitacura Survey',
    distance: '0.07 Km',
    points: 12,
    date: '2 hours ago'
  }, {
    id: '2',
    name: 'Santiago Route',
    distance: '0.04 Km',
    points: 8,
    date: '5 hours ago'
  }
  // Add more routes as needed
  ];
  return <div className="flex flex-col h-full min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header title="Dashboard" onProfileClick={onProfileClick} onSettingsClick={onSettingsClick} />
      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto pb-20">
        {/* Greeting Section */}
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {greeting}, {userName}!
          </h1>
        </div>
        {/* Action Cards */}
        <div className="grid grid-cols-1 gap-4 px-4">
          <button className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <PlusIcon className="text-blue-500" size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Start New Survey
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Create a new route survey
                </p>
              </div>
            </div>
            <ChevronRightIcon size={24} className="text-gray-400" />
          </button>
          <button className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <PlayIcon className="text-green-500" size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Resume Last Survey
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Continue where you left off
                </p>
              </div>
            </div>
            <ChevronRightIcon size={24} className="text-gray-400" />
          </button>
          <button className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                <FolderIcon className="text-purple-500" size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  View Saved Surveys
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Access your completed routes
                </p>
              </div>
            </div>
            <ChevronRightIcon size={24} className="text-gray-400" />
          </button>
        </div>
        {/* Recent Routes */}
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Recent Routes
          </h2>
          <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
            {recentRoutes.map(route => <div key={route.id} className="flex-shrink-0 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
                <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg mb-3 flex items-center justify-center">
                  {/* This would be a mini map view */}
                  <MapPinIcon size={24} className="text-gray-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {route.name}
                </h3>
                <div className="flex justify-between mt-2 text-sm text-gray-500 dark:text-gray-400">
                  <span>{route.distance}</span>
                  <span>{route.points} points</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">{route.date}</p>
              </div>)}
          </div>
        </div>
      </div>
    </div>;
}
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
}