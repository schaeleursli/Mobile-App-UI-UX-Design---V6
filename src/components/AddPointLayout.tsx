import React from 'react';
import { ChevronLeftIcon } from 'lucide-react';
import { Header } from './Header';
interface AddPointLayoutProps {
  pointType: string;
  onBack: () => void;
  onSave: () => void;
  onCancel: () => void;
  children: ReactNode;
  universalSection: ReactNode;
}
export function AddPointLayout({
  pointType,
  onBack,
  onSave,
  onCancel,
  children,
  universalSection
}: AddPointLayoutProps) {
  return <div className="flex flex-col h-screen bg-white dark:bg-[#1E1E1E] text-[#0F172A] dark:text-[#F1F5F9]">
      {/* Header */}
      <Header title={`Add ${pointType}`} onBack={onBack} onSave={onSave} />
      {/* Form Content - Combined sections */}
      <div className="flex-1 overflow-y-auto p-4 pb-24">
        <div className="bg-white dark:bg-[#1E1E1E] rounded-md shadow-[0_1px_3px_rgba(0,0,0,0.08)] overflow-hidden">
          <div className="p-4">
            {/* Universal section (photos and road name) */}
            {universalSection}
            {/* Type-specific section */}
            <div className="mt-6">{children}</div>
          </div>
        </div>
      </div>
      {/* Footer with Action Buttons - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-[#1E1E1E] border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-4 z-10">
        <button onClick={onCancel} className="px-6 py-2 rounded-md bg-transparent border border-gray-300 dark:border-gray-600 text-[#0F172A] dark:text-[#F1F5F9] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          Cancel
        </button>
        <button onClick={onSave} className="px-6 py-2 rounded-md bg-[#00C48C] text-white hover:bg-opacity-90 transition-colors">
          Save
        </button>
      </div>
    </div>;
}