import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Switch } from '../components/Switch';
import { GripVertical, Check } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
interface FormVisibilityItem {
  id: string;
  label: string;
  visible: boolean;
}
export function FormVisibilitySettings({
  onBack,
  onSave
}) {
  const [formVisibility, setFormVisibility] = useState<FormVisibilityItem[]>([{
    id: 'railroad',
    label: 'Railroad',
    visible: true
  }, {
    id: 'road',
    label: 'Road',
    visible: true
  }, {
    id: 'intersection',
    label: 'Intersection',
    visible: true
  }, {
    id: 'bridge',
    label: 'Bridge',
    visible: true
  }, {
    id: 'powerline',
    label: 'Power Line',
    visible: true
  }, {
    id: 'overhead',
    label: 'Overhead',
    visible: true
  }, {
    id: 'tunnel',
    label: 'Tunnel',
    visible: true
  }, {
    id: 'roadway_geometry',
    label: 'Roadway Geometry',
    visible: true
  }, {
    id: 'rail_crossing',
    label: 'Rail Crossing',
    visible: true
  }, {
    id: 'culvert',
    label: 'Culvert',
    visible: true
  }, {
    id: 'pavement',
    label: 'Pavement',
    visible: true
  }, {
    id: 'shoulder',
    label: 'Shoulder',
    visible: true
  }, {
    id: 'traffic_device',
    label: 'Traffic Device',
    visible: true
  }, {
    id: 'weight_station',
    label: 'Weight Station',
    visible: true
  }, {
    id: 'sensitive_zone',
    label: 'Sensitive Zone',
    visible: true
  }, {
    id: 'gradient',
    label: 'Gradient',
    visible: true
  }, {
    id: 'vegetation',
    label: 'Vegetation',
    visible: true
  }, {
    id: 'flood_zone',
    label: 'Flood Zone',
    visible: true
  }, {
    id: 'custom',
    label: 'Custom',
    visible: true
  }]);
  const handleToggleVisibility = (id: string) => {
    setFormVisibility(prev => prev.map(item => item.id === id ? {
      ...item,
      visible: !item.visible
    } : item));
  };
  const handleSave = () => {
    onSave(formVisibility);
  };
  // Handle drag end event
  const onDragEnd = result => {
    // Dropped outside the list
    if (!result.destination) {
      return;
    }
    const items = Array.from(formVisibility);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setFormVisibility(items);
  };
  return <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      <Header title="Form Visibility" onBack={onBack} />
      <div className="p-4 flex-1 overflow-y-auto">
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Select which forms you want to make visible in the survey screen. Drag
          to reorder.
        </p>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-4">
          <div className="flex items-center justify-between mb-4">
            <span className="font-medium">Show All Forms</span>
            <Switch checked={formVisibility.every(item => item.visible)} onChange={() => {
            const allVisible = formVisibility.every(item => item.visible);
            setFormVisibility(prev => prev.map(item => ({
              ...item,
              visible: !allVisible
            })));
          }} />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="form-items">
              {provided => <div {...provided.droppableProps} ref={provided.innerRef}>
                  {formVisibility.map((item, index) => <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => <div ref={provided.innerRef} {...provided.draggableProps} className={`flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 last:border-0 ${snapshot.isDragging ? 'bg-gray-100 dark:bg-gray-700' : ''}`}>
                          <div className="flex items-center">
                            <div {...provided.dragHandleProps} className="mr-3 cursor-grab">
                              <GripVertical size={20} className="text-gray-400" />
                            </div>
                            <span>{item.label}</span>
                          </div>
                          <Switch checked={item.visible} onChange={() => handleToggleVisibility(item.id)} />
                        </div>}
                    </Draggable>)}
                  {provided.placeholder}
                </div>}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
      <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <button onClick={handleSave} className="w-full p-4 bg-primary text-white rounded-lg flex items-center justify-center">
          <Check size={20} className="mr-2" />
          Save Settings
        </button>
      </div>
    </div>;
}