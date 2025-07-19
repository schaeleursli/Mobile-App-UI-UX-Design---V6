import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, ChevronUpIcon, MapPinIcon, CalendarIcon, TruckIcon, UserIcon, EyeIcon, PencilIcon, CopyIcon, TrashIcon, InfoIcon, ArrowRightIcon, ImageIcon, FileTextIcon } from 'lucide-react';
import { ConfirmationDialog } from '../ConfirmationDialog';
export type RouteStatus = 'planned' | 'in-progress' | 'completed';
export interface PlannedRouteProps {
  id: string;
  title: string;
  client: string;
  date: string;
  startPoint: string;
  endPoint: string;
  distance: string;
  status: RouteStatus;
  cargoDescription?: string;
  cargoDimensions?: string;
  cargoWeight?: string;
  vehicleType?: string;
  trailerType?: string;
  notes?: string;
  attachments?: {
    type: 'image' | 'document';
    url: string;
    name: string;
  }[];
  startCoords?: [number, number];
  endCoords?: [number, number];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onViewReport?: (id: string) => void;
  onDuplicate?: (id: string) => void;
}
export function PlannedRouteTile({
  id,
  title,
  client,
  date,
  startPoint,
  endPoint,
  distance,
  status,
  cargoDescription,
  cargoDimensions,
  cargoWeight,
  vehicleType,
  trailerType,
  notes,
  attachments = [],
  startCoords,
  endCoords,
  onEdit,
  onDelete,
  onViewReport,
  onDuplicate
}: PlannedRouteProps) {
  const [expanded, setExpanded] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  const getStatusColor = (status: RouteStatus) => {
    switch (status) {
      case 'planned':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'in-progress':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };
  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };
  const confirmDelete = () => {
    onDelete?.(id);
    setShowDeleteConfirm(false);
  };
  return <>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
        {/* Card Header - Always visible */}
        <div className="p-4 cursor-pointer" onClick={() => setExpanded(!expanded)}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {title}
                </h3>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(status)}`}>
                  {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                </span>
              </div>
              <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <UserIcon size={14} className="mr-1" />
                <span>{client}</span>
              </div>
              <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <CalendarIcon size={14} className="mr-1" />
                <span>{formatDate(date)}</span>
              </div>
              <div className="mt-2 flex items-center text-sm font-medium">
                <div className="flex items-center text-green-600 dark:text-green-400">
                  <MapPinIcon size={14} className="mr-1" />
                  <span className="truncate max-w-[120px]">{startPoint}</span>
                </div>
                <ArrowRightIcon size={14} className="mx-2 text-gray-400" />
                <div className="flex items-center text-red-600 dark:text-red-400">
                  <MapPinIcon size={14} className="mr-1" />
                  <span className="truncate max-w-[120px]">{endPoint}</span>
                </div>
              </div>
            </div>
            <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" aria-label={expanded ? 'Collapse details' : 'Expand details'}>
              {expanded ? <ChevronUpIcon size={20} className="text-gray-500" /> : <ChevronDownIcon size={20} className="text-gray-500" />}
            </button>
          </div>
        </div>
        {/* Expandable Content */}
        <AnimatePresence>
          {expanded && <motion.div initial={{
          height: 0,
          opacity: 0
        }} animate={{
          height: 'auto',
          opacity: 1
        }} exit={{
          height: 0,
          opacity: 0
        }} transition={{
          duration: 0.3
        }} className="overflow-hidden border-t border-gray-200 dark:border-gray-700">
              <div className="p-4">
                {/* Map Preview */}
                <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-48 mb-4 flex items-center justify-center">
                  {/* In a real implementation, this would be a map component */}
                  <div className="text-gray-500 dark:text-gray-400 flex flex-col items-center">
                    <MapPinIcon size={24} />
                    <span className="text-sm mt-2">Route Map Preview</span>
                  </div>
                </div>
                {/* Route Details Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Start Point
                      </label>
                      <div className="flex items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                        <MapPinIcon size={16} className="text-green-500 mr-2" />
                        <span className="text-gray-800 dark:text-gray-200">
                          {startPoint}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        End Point
                      </label>
                      <div className="flex items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                        <MapPinIcon size={16} className="text-red-500 mr-2" />
                        <span className="text-gray-800 dark:text-gray-200">
                          {endPoint}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Distance
                      </label>
                      <div className="flex items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                        <span className="text-gray-800 dark:text-gray-200">
                          {distance}
                        </span>
                      </div>
                    </div>
                    {notes && <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Notes
                        </label>
                        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                          <p className="text-gray-800 dark:text-gray-200 text-sm whitespace-pre-line">
                            {notes}
                          </p>
                        </div>
                      </div>}
                  </div>
                  {/* Right Column */}
                  <div className="space-y-4">
                    {cargoDescription && <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Cargo
                        </label>
                        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                          <p className="text-gray-800 dark:text-gray-200">
                            {cargoDescription}
                          </p>
                          {cargoDimensions && <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              Dimensions: {cargoDimensions}
                            </p>}
                          {cargoWeight && <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              Weight: {cargoWeight}
                            </p>}
                        </div>
                      </div>}
                    {(vehicleType || trailerType) && <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Vehicle Setup
                        </label>
                        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                          <div className="flex items-center">
                            <TruckIcon size={16} className="text-gray-500 mr-2" />
                            <span className="text-gray-800 dark:text-gray-200">
                              {vehicleType || 'Not specified'}
                              {trailerType && ` + ${trailerType}`}
                            </span>
                          </div>
                        </div>
                      </div>}
                    {attachments.length > 0 && <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Attachments
                        </label>
                        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                          <div className="flex flex-wrap gap-2">
                            {attachments.map((attachment, index) => <div key={index} className="flex items-center bg-white dark:bg-gray-800 px-2 py-1 rounded text-sm">
                                {attachment.type === 'image' ? <ImageIcon size={14} className="mr-1 text-blue-500" /> : <FileTextIcon size={14} className="mr-1 text-orange-500" />}
                                <span className="truncate max-w-[100px]">
                                  {attachment.name}
                                </span>
                              </div>)}
                          </div>
                        </div>
                      </div>}
                  </div>
                </div>
                {/* Action Buttons */}
                <div className="mt-6 flex flex-wrap gap-2">
                  <button onClick={() => onEdit?.(id)} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <PencilIcon size={16} className="mr-2" />
                    Edit
                  </button>
                  <button onClick={() => onViewReport?.(id)} className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                    <EyeIcon size={16} className="mr-2" />
                    View Report
                  </button>
                  <button onClick={() => onDuplicate?.(id)} className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                    <CopyIcon size={16} className="mr-2" />
                    Duplicate
                  </button>
                  <button onClick={handleDelete} className="flex items-center px-4 py-2 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800/30 transition-colors ml-auto">
                    <TrashIcon size={16} className="mr-2" />
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>}
        </AnimatePresence>
      </div>
      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && <ConfirmationDialog title="Delete Route" message="Are you sure you want to delete this route? This action cannot be undone." confirmText="Delete" cancelText="Cancel" type="danger" onConfirm={confirmDelete} onCancel={() => setShowDeleteConfirm(false)} />}
    </>;
}