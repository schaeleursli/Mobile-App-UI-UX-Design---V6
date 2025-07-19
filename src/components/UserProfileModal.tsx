import React from 'react';
import { Header } from './Header';
import { UserIcon, BuildingIcon, GlobeIcon, FileTextIcon, InfoIcon, PhoneIcon, MailIcon, MapPinIcon, UploadIcon, ImageIcon } from 'lucide-react';
export function UserProfileModal({
  user,
  onClose
}) {
  return <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="flex flex-col h-full bg-white dark:bg-gray-900">
        <Header title="Profile" onBack={onClose} />
        <div className="flex-1 p-4 overflow-y-auto space-y-6">
          {/* User Information Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex flex-col items-center mb-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center mb-4">
                  <UserIcon size={48} className="text-white" />
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-colors">
                  <UploadIcon size={16} />
                </button>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 flex items-center mt-1">
                <MailIcon size={16} className="mr-2" />
                {user.email}
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <PhoneIcon size={16} className="text-gray-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Office Phone</p>
                  <p className="text-gray-900 dark:text-white">
                    +1 (555) 123-4567
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <PhoneIcon size={16} className="text-gray-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Mobile Phone</p>
                  <p className="text-gray-900 dark:text-white">
                    +1 (555) 987-6543
                  </p>
                </div>
              </div>
              <div className="border-t dark:border-gray-700 pt-4 mt-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center mb-3">
                  <div size={18} className="mr-2 text-blue-500" />
                  Tools & Expertise
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['Route Planning', 'Survey Tools', 'GPS Mapping', 'Load Analysis'].map(tool => <span key={tool} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                      {tool}
                    </span>)}
                </div>
              </div>
            </div>
          </div>
          {/* Company Information Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="relative">
                  <div className="w-16 h-16 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <BuildingIcon size={32} className="text-gray-400" />
                  </div>
                  <button className="absolute bottom-0 right-0 p-1.5 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-colors">
                    <UploadIcon size={12} />
                  </button>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Route Survey Inc.
                  </h3>
                  <p className="text-gray-500">Transportation & Logistics</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      Company Address
                    </p>
                    <div className="flex items-start">
                      <MapPinIcon size={16} className="text-gray-500 mr-2 mt-1" />
                      <div>
                        <p className="text-gray-900 dark:text-white">
                          123 Business Ave
                        </p>
                        <p className="text-gray-900 dark:text-white">
                          Suite 456
                        </p>
                        <p className="text-gray-900 dark:text-white">
                          San Francisco, CA 94107
                        </p>
                        <p className="text-gray-900 dark:text-white">
                          United States
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      Contact Information
                    </p>
                    <div className="space-y-2">
                      <p className="flex items-center text-gray-900 dark:text-white">
                        <PhoneIcon size={16} className="mr-2" />
                        +1 (555) 123-4567
                      </p>
                      <p className="flex items-center text-gray-900 dark:text-white">
                        <MailIcon size={16} className="mr-2" />
                        contact@routesurvey.com
                      </p>
                      <p className="flex items-center text-blue-500 hover:underline">
                        <GlobeIcon size={16} className="mr-2" />
                        www.routesurvey.com
                      </p>
                    </div>
                  </div>
                </div>
                <div className="relative h-40 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageIcon size={32} className="text-gray-400" />
                  </div>
                  <button className="absolute bottom-2 right-2 p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-colors">
                    <UploadIcon size={16} />
                  </button>
                </div>
              </div>
              <div className="border-t dark:border-gray-700 pt-4 mt-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center mb-3">
                  <InfoIcon size={18} className="mr-2 text-blue-500" />
                  About
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Leading provider of route survey solutions for transportation
                  and logistics companies. Specializing in complex route
                  planning and analysis for oversized cargo transportation.
                </p>
              </div>
              <div className="border-t dark:border-gray-700 pt-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center mb-3">
                  <FileTextIcon size={18} className="mr-2 text-blue-500" />
                  Disclaimer
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  All survey data and measurements are provided for planning
                  purposes only. Final route execution should be verified by
                  qualified personnel. Route Survey Inc. assumes no liability
                  for decisions made based on this data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
}