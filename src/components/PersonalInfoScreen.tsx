import React from 'react';
import { Header } from './Header';
export function PersonalInfoScreen({
  userData,
  onSave,
  onCancel
}) {
  return <div className="flex flex-col flex-grow">
      <Header title="Personal Info" onBack={onCancel} />
      <div className="flex flex-col p-4 space-y-4">
        <div className="space-y-2">
          <label className="text-gray-500 text-lg">First Name</label>
          <input type="text" defaultValue={userData.firstName} className="w-full p-4 bg-gray-200 rounded-lg text-lg" />
        </div>
        <div className="space-y-2">
          <label className="text-gray-500 text-lg">Last Name</label>
          <input type="text" defaultValue={userData.lastName} className="w-full p-4 bg-gray-200 rounded-lg text-lg" />
        </div>
        <div className="space-y-2">
          <label className="text-gray-500 text-lg">Office Phone</label>
          <input type="tel" defaultValue={userData.officePhone} className="w-full p-4 bg-gray-200 rounded-lg text-lg" />
        </div>
        <div className="space-y-2">
          <label className="text-gray-500 text-lg">Mobile Phone</label>
          <input type="tel" defaultValue={userData.mobilePhone} className="w-full p-4 bg-gray-200 rounded-lg text-lg" />
        </div>
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