import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { CameraIcon, XIcon, ImageIcon } from 'lucide-react';
interface MediaCaptureProps {
  photos: string[];
  onAddPhoto: () => void;
  onRemovePhoto: (index: number) => void;
  maxPhotos?: number;
}
export function MediaCapture({
  photos = [],
  onAddPhoto,
  onRemovePhoto,
  maxPhotos = 4
}: MediaCaptureProps) {
  const {
    colors
  } = useTheme();
  return <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        {photos.map((photo, index) => <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
            <img src={photo} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
            <button onClick={() => onRemovePhoto(index)} className="absolute top-2 right-2 p-1 rounded-full bg-black bg-opacity-70 hover:bg-opacity-90">
              <XIcon size={16} className="text-white" />
            </button>
          </div>)}
        {photos.length < maxPhotos && <button onClick={onAddPhoto} className="aspect-square rounded-lg border-2 border-dashed flex flex-col items-center justify-center" style={{
        borderColor: colors.border
      }}>
            <CameraIcon size={24} style={{
          color: colors.primary
        }} />
            <span className="mt-2 text-sm font-medium" style={{
          color: colors.textSecondary
        }}>
              Add Photo
            </span>
          </button>}
      </div>
    </div>;
}