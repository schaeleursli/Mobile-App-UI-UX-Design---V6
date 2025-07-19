import React from 'react';
import { BatteryIcon, WifiIcon } from 'lucide-react';
export function StatusBar() {
  return <div className="flex justify-between items-center p-2 bg-gray-800 dark:bg-black text-white transition-colors">
      <div className="text-lg font-semibold">6:46</div>
      <div className="flex items-center space-x-2">
        <div className="text-sm">•••</div>
        <WifiIcon size={16} />
        <div className="w-10 h-5 rounded-md border border-white flex items-center px-0.5">
          <div className="w-7 h-3 bg-white rounded-sm"></div>
        </div>
      </div>
    </div>;
}