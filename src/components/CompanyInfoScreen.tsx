import React from 'react';
import { Header } from './Header';
export function CompanyInfoScreen({
  onBack
}) {
  return <div className="flex flex-col flex-grow">
      <Header title="Company Info" onBack={onBack} />
      <div className="flex flex-col p-4 space-y-4">
        <div className="bg-gray-200 rounded-lg p-6 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center mb-4">
            <div className="w-8 h-8 rounded-full bg-blue-500 border-4 border-white mb-1"></div>
            <div className="absolute mt-8 w-12 h-3 bg-white rounded-full"></div>
          </div>
        </div>
        <div className="h-px bg-gray-300 my-2"></div>
        <div className="space-y-4">
          <input type="text" placeholder="Company Name" className="w-full p-4 bg-gray-200 rounded-lg text-lg" />
          <input type="text" placeholder="Company Website" className="w-full p-4 bg-gray-200 rounded-lg text-lg" />
          <input type="text" placeholder="Company Address Street" className="w-full p-4 bg-gray-200 rounded-lg text-lg" />
          <input type="text" placeholder="Company Address City" className="w-full p-4 bg-gray-200 rounded-lg text-lg" />
          <input type="text" placeholder="Company Address State" className="w-full p-4 bg-gray-200 rounded-lg text-lg" />
          <input type="text" placeholder="Company Address Zip" className="w-full p-4 bg-gray-200 rounded-lg text-lg" />
          <input type="text" placeholder="Company Address Country" className="w-full p-4 bg-gray-200 rounded-lg text-lg" />
          <textarea placeholder="Company Disclaimer" className="w-full p-4 bg-gray-200 rounded-lg text-lg h-32"></textarea>
        </div>
      </div>
    </div>;
}