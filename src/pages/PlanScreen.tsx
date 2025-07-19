import React, { useEffect, useState, Suspense, lazy } from 'react';
import { Header } from '../components/Header';
import { CalendarIcon, MapPinIcon, TruckIcon, InfoIcon, PlusIcon, EyeIcon, PencilIcon, TrashIcon, XIcon, MaximizeIcon } from 'lucide-react';
import { AddPlanForm } from '../components/plan/AddPlanForm';
import { ConfirmationDialog } from '../components/ConfirmationDialog';
// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';
// We'll import these normally since we're in a client-side only React app
let MapContainer, TileLayer, Marker, Popup;
export function PlanScreen() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showFullMap, setShowFullMap] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [mapReady, setMapReady] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [surveyToDelete, setSurveyToDelete] = useState(null);
  const [plannedSurveys, setPlannedSurveys] = useState([{
    id: 1,
    name: 'Vitacura Survey',
    date: '2025-05-30',
    startPoint: 'Luis Carrera 2091, Vitacura',
    startCoords: [-33.3972, -70.5933],
    endPoint: 'Nazca 5652, Vitacura',
    endCoords: [-33.3939, -70.5868],
    client: 'Client A',
    cargo: 'Heavy Equipment',
    trailer: '40ft Container',
    distance: '0.07 Km'
  }]);
  // Initialize Leaflet
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Only run on client side
      const L = require('leaflet');
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
      });
      // Import Leaflet components
      import('react-leaflet').then(reactLeaflet => {
        MapContainer = reactLeaflet.MapContainer;
        TileLayer = reactLeaflet.TileLayer;
        Marker = reactLeaflet.Marker;
        Popup = reactLeaflet.Popup;
        setMapReady(true);
      });
    }
  }, []);
  const handleAddSurvey = newSurvey => {
    setPlannedSurveys(prev => [...prev, {
      ...newSurvey,
      id: prev.length + 1,
      // Default coordinates for new surveys if not provided
      startCoords: [-33.3972, -70.5933],
      endCoords: [-33.3939, -70.5868]
    }]);
    setShowAddForm(false);
  };
  const handleViewSurvey = survey => {
    console.log('View survey:', survey);
    // Implementation for viewing survey details
  };
  const handleEditSurvey = survey => {
    console.log('Edit survey:', survey);
    // Implementation for editing survey
  };
  const handleDeleteConfirm = surveyId => {
    setSurveyToDelete(surveyId);
    setShowDeleteConfirm(true);
  };
  const handleDeleteSurvey = () => {
    if (surveyToDelete) {
      setPlannedSurveys(prev => prev.filter(survey => survey.id !== surveyToDelete));
      setShowDeleteConfirm(false);
      setSurveyToDelete(null);
    }
  };
  const handleShowFullMap = survey => {
    setSelectedSurvey(survey);
    setShowFullMap(true);
  };
  return <div className="flex flex-col h-full min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header title="Planned Surveys" />
      <div className="flex-1 overflow-y-auto p-4 pb-24">
        {/* Add Button */}
        <button onClick={() => setShowAddForm(true)} className="w-full mb-6 p-4 bg-primary text-white rounded-lg flex items-center justify-center shadow-sm hover:bg-primary/90 transition-colors">
          <PlusIcon size={20} className="mr-2" />
          Add New Survey
        </button>
        <div className="space-y-6">
          {plannedSurveys.map(survey => <div key={survey.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {/* Card Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {survey.name}
                  </h3>
                  <div className="flex items-center space-x-1">
                    <CalendarIcon size={16} className="text-blue-500 mr-1" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {survey.date}
                    </span>
                  </div>
                </div>
              </div>
              {/* Card Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                {/* Info Section */}
                <div className="space-y-3">
                  <div className="flex items-start">
                    <InfoIcon size={16} className="text-blue-500 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Client
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {survey.client}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPinIcon size={16} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Start Point
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {survey.startPoint}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPinIcon size={16} className="text-red-500 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        End Point
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {survey.endPoint}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <TruckIcon size={16} className="text-orange-500 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Transport
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Cargo: {survey.cargo} • Trailer: {survey.trailer}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Map Section */}
                {mapReady && <div className="relative h-[180px] rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="absolute inset-0 z-0">
                      <MapContainer center={survey.startCoords} zoom={14} style={{
                  height: '100%',
                  width: '100%'
                }} zoomControl={false}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
                        <Marker position={survey.startCoords}>
                          <Popup>Start: {survey.startPoint}</Popup>
                        </Marker>
                        <Marker position={survey.endCoords}>
                          <Popup>End: {survey.endPoint}</Popup>
                        </Marker>
                      </MapContainer>
                    </div>
                    <button onClick={() => handleShowFullMap(survey)} className="absolute top-2 right-2 p-1.5 bg-white dark:bg-gray-800 rounded-md shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <MaximizeIcon size={16} className="text-gray-700 dark:text-gray-300" />
                    </button>
                    <div className="absolute bottom-2 right-2 bg-white dark:bg-gray-800 px-2 py-1 rounded-md text-xs font-medium shadow-md">
                      {survey.distance}
                    </div>
                  </div>}
              </div>
              {/* Card Actions */}
              <div className="flex border-t border-gray-200 dark:border-gray-700">
                <button onClick={() => handleViewSurvey(survey)} className="flex-1 p-3 text-blue-600 dark:text-blue-400 font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors flex items-center justify-center">
                  <EyeIcon size={16} className="mr-2" />
                  View
                </button>
                <div className="w-px bg-gray-200 dark:bg-gray-700"></div>
                <button onClick={() => handleEditSurvey(survey)} className="flex-1 p-3 text-amber-600 dark:text-amber-400 font-medium hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors flex items-center justify-center">
                  <PencilIcon size={16} className="mr-2" />
                  Edit
                </button>
                <div className="w-px bg-gray-200 dark:bg-gray-700"></div>
                <button onClick={() => handleDeleteConfirm(survey.id)} className="flex-1 p-3 text-red-600 dark:text-red-400 font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center justify-center">
                  <TrashIcon size={16} className="mr-2" />
                  Delete
                </button>
              </div>
            </div>)}
        </div>
      </div>
      {/* Full Map Modal */}
      {showFullMap && selectedSurvey && mapReady && <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl h-[80vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {selectedSurvey.name} - Route Map
              </h3>
              <button onClick={() => setShowFullMap(false)} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <XIcon size={24} className="text-gray-500" />
              </button>
            </div>
            <div className="flex-1 relative">
              <MapContainer center={selectedSurvey.startCoords} zoom={13} style={{
            height: '100%',
            width: '100%'
          }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
                <Marker position={selectedSurvey.startCoords}>
                  <Popup>
                    <strong>Start Point</strong>
                    <br />
                    {selectedSurvey.startPoint}
                  </Popup>
                </Marker>
                <Marker position={selectedSurvey.endCoords}>
                  <Popup>
                    <strong>End Point</strong>
                    <br />
                    {selectedSurvey.endPoint}
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <div>
                <span className="text-sm font-medium">Distance: </span>
                <span className="text-sm">{selectedSurvey.distance}</span>
              </div>
              <button onClick={() => setShowFullMap(false)} className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>}
      {showAddForm && <AddPlanForm onClose={() => setShowAddForm(false)} onSave={handleAddSurvey} />}
      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && <ConfirmationDialog title="Delete Survey" message="Are you sure you want to delete this survey? This action cannot be undone." confirmText="Delete" cancelText="Cancel" type="danger" onConfirm={handleDeleteSurvey} onCancel={() => setShowDeleteConfirm(false)} />}
    </div>;
}