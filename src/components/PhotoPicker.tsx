import React, { useState, useRef } from 'react';
import { CameraIcon, ImageIcon, UploadIcon, XIcon } from 'lucide-react';
interface PhotoPickerProps {
  max?: number;
  onPhotosChange?: (photos: File[]) => void;
}
export function PhotoPicker({
  max = 6,
  onPhotosChange
}: PhotoPickerProps) {
  const [photos, setPhotos] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(Array.from(e.target.files));
    }
  };
  const addFiles = (files: File[]) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    const newPhotos = [...photos];
    const newPreviews = [...previews];
    for (let i = 0; i < imageFiles.length && newPhotos.length < max; i++) {
      newPhotos.push(imageFiles[i]);
      newPreviews.push(URL.createObjectURL(imageFiles[i]));
    }
    setPhotos(newPhotos);
    setPreviews(newPreviews);
    if (onPhotosChange) {
      onPhotosChange(newPhotos);
    }
  };
  const removePhoto = (index: number) => {
    const newPhotos = [...photos];
    const newPreviews = [...previews];
    URL.revokeObjectURL(newPreviews[index]);
    newPhotos.splice(index, 1);
    newPreviews.splice(index, 1);
    setPhotos(newPhotos);
    setPreviews(newPreviews);
    if (onPhotosChange) {
      onPhotosChange(newPhotos);
    }
  };
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounter.current = 0;
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(Array.from(e.dataTransfer.files));
      e.dataTransfer.clearData();
    }
  };
  const openCamera = () => {
    // In a real app, this would use the device camera
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const openGallery = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return <div className="mb-6">
      <h3 className="text-sm font-medium mb-2 text-[#0F172A] dark:text-[#F1F5F9]">
        Photos
      </h3>
      <div className={`p-4 bg-[#F5F7FA] dark:bg-[#2A2C30] rounded-md border-2 border-dashed ${isDragging ? 'border-[#00C48C]' : 'border-gray-300 dark:border-gray-600'} transition-colors`} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop}>
        {photos.length === 0 ? <div className="flex flex-col items-center justify-center py-8">
            <UploadIcon size={32} className="text-gray-400 mb-2" />
            <p className="text-center text-gray-500 dark:text-gray-400 mb-4">
              No Photos
            </p>
            <p className="text-center text-xs text-gray-400 dark:text-gray-500 mb-4">
              Drag and drop photos here, or use buttons below
            </p>
            <div className="flex space-x-4">
              <button onClick={openCamera} className="flex items-center justify-center p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                <CameraIcon size={20} className="text-[#1F3C56] dark:text-[#F1F5F9]" />
              </button>
              <button onClick={openGallery} className="flex items-center justify-center p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                <ImageIcon size={20} className="text-[#1F3C56] dark:text-[#F1F5F9]" />
              </button>
            </div>
          </div> : <div>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {previews.map((preview, index) => <div key={index} className="relative aspect-square">
                  <img src={preview} alt={`Photo ${index + 1}`} className="w-full h-full object-cover rounded-md" />
                  <button onClick={() => removePhoto(index)} className="absolute top-1 right-1 p-1 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-opacity">
                    <XIcon size={16} className="text-white" />
                  </button>
                </div>)}
              {photos.length < max && <button onClick={openGallery} className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md aspect-square hover:border-[#00C48C] transition-colors">
                  <PlusIcon size={24} className="text-gray-400" />
                  <span className="text-xs text-gray-500 mt-1">Add Photo</span>
                </button>}
            </div>
            <div className="flex justify-center space-x-4">
              <button onClick={openCamera} className="flex items-center justify-center p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                <CameraIcon size={16} className="text-[#1F3C56] dark:text-[#F1F5F9] mr-1" />
                <span className="text-xs">Camera</span>
              </button>
              <button onClick={openGallery} className="flex items-center justify-center p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                <ImageIcon size={16} className="text-[#1F3C56] dark:text-[#F1F5F9] mr-1" />
                <span className="text-xs">Gallery</span>
              </button>
            </div>
          </div>}
      </div>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" multiple={true} className="hidden" />
      <p className="text-xs text-gray-500 mt-1">
        {photos.length} of {max} photos added
      </p>
    </div>;
}
// Helper component for the "Add Photo" button
function PlusIcon({
  size,
  className
}: {
  size: number;
  className?: string;
}) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>;
}