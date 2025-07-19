import React from 'react';
import { Header } from './Header';
export function UserConfigScreen({
  userData,
  onSave,
  onCancel
}) {
  return <div className="flex flex-col flex-grow">
      <Header title="User Configuration" onBack={onCancel} />
      <div className="flex flex-col p-4 space-y-4">
        <div className="space-y-2">
          <label className="text-gray-500 text-lg">First Name</label>
          <input type="text" defaultValue={userData.firstName} className="w-full p-4 bg-gray-200 rounded-lg text-lg" />
        </div>
        <div className="space-y-2">
          <label className="text-gray-500 text-lg">Last Name</label>
          <input type="text" defaultValue={userData.lastName} className="w-full p-4 bg-gray-200 rounded-lg text-lg" />
        </div>
        <div className="flex justify-between items-center py-4">
          <div className="text-lg font-semibold">
            Measurement System
            <br />
            (Imperial)
          </div>
          <div className="w-12 h-6 bg-gray-300 rounded-full flex items-center p-1">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
        </div>
        <div className="h-px bg-gray-300 my-2"></div>
        <div className="space-y-2">
          <label className="text-gray-500 text-lg">
            Minimum Distance for recording new GPS
          </label>
          <div className="flex">
            <input type="number" defaultValue="2.0" className="flex-1 p-4 bg-gray-200 rounded-l-lg text-lg" />
            <div className="bg-gray-400 text-black p-4 rounded-r-lg flex items-center">
              Meter
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-gray-500 text-lg">
            Maximum allowed accuracy for new GPS
          </label>
          <div className="flex">
            <input type="number" defaultValue="40.0" className="flex-1 p-4 bg-gray-200 rounded-l-lg text-lg" />
            <div className="bg-gray-400 text-black p-4 rounded-r-lg flex items-center">
              Meter
            </div>
          </div>
        </div>
        <div className="h-px bg-gray-300 my-2"></div>
        <div className="pt-4">
          <button onClick={onSave} className="w-full p-4 bg-[#3b4359] text-white rounded-lg text-xl">
            Save
          </button>
        </div>
        <div>
          <button onClick={onCancel} className="w-full p-4 bg-gray-400 text-white rounded-lg text-xl">
            Cancel
          </button>
        </div>
      </div>
    </div>;
}