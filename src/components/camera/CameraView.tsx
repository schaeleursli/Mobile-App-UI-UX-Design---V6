import React, { useState } from 'react';
import { Header } from '../Header';
import { PencilIcon, TypeIcon, RotateCcwIcon, SlidersIcon, ImageIcon, XIcon, CheckIcon } from 'lucide-react';
export function CameraView({
  onClose,
  onSave
}) {
  const [isEditing, setIsEditing] = useState(false);
  return <div className="fixed inset-0 bg-black z-50">
      <div className="flex flex-col h-full">
        {/* Top Bar */}
        <div className="flex justify-between items-center p-4 bg-black">
          <button onClick={onClose} className="text-white">
            <XIcon size={24} />
          </button>
          <div className="flex space-x-4">
            <button className="text-white">
              <RotateCcwIcon size={24} />
            </button>
            <button onClick={() => onSave()} className="text-white">
              <CheckIcon size={24} />
            </button>
          </div>
        </div>
        {/* Camera Preview / Image */}
        <div className="flex-1 relative">
          {/* This would be replaced with actual camera preview */}
          <div className="w-full h-full bg-gray-900" />
        </div>
        {/* Bottom Toolbar */}
        <div className="bg-black p-4">
          <div className="flex justify-around items-center">
            <button className="flex flex-col items-center text-white">
              <PencilIcon size={24} />
              <span className="text-xs mt-1">Paint</span>
            </button>
            <button className="flex flex-col items-center text-white">
              <TypeIcon size={24} />
              <span className="text-xs mt-1">Text</span>
            </button>
            <button className="flex flex-col items-center text-white">
              <RotateCcwIcon size={24} />
              <span className="text-xs mt-1">Crop/Rotate</span>
            </button>
            <button className="flex flex-col items-center text-white">
              <SlidersIcon size={24} />
              <span className="text-xs mt-1">Tune</span>
            </button>
            <button className="flex flex-col items-center text-white">
              <ImageIcon size={24} />
              <span className="text-xs mt-1">Filter</span>
            </button>
          </div>
        </div>
      </div>
    </div>;
}