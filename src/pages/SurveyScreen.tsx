import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { TrainIcon, GitMergeIcon, ZapIcon, ArrowUpIcon, HelpCircleIcon, CameraIcon, XIcon, LocateIcon, BoxIcon, SaveIcon, PlusIcon, MapPinIcon, ChevronRightIcon, SatelliteIcon, MicIcon, PlayIcon, UnderlineIcon, AlertTriangleIcon, TruckIcon, BarChartIcon, ThermometerIcon, CloudRainIcon, SignalIcon, WeightIcon, ActivityIcon, ShieldIcon } from 'lucide-react';
import { SaveRouteForm } from '../components/survey/SaveRouteForm';
import { CustomPointForm } from '../components/survey/CustomPointForm';
import { OverheadForm } from '../components/survey/OverheadForm';
import { RailroadForm } from '../components/survey/RailroadForm';
import { RoadForm } from '../components/survey/RoadForm';
import { IntersectionForm } from '../components/survey/IntersectionForm';
import { CameraView } from '../components/camera/CameraView';
import { RoutesOverviewScreen } from './RoutesOverviewScreen';
import { BridgeForm } from '../components/survey/BridgeForm';
import { PowerlineForm } from '../components/survey/PowerlineForm';
import { AddTunnelForm } from '../components/AddTunnelForm';
import { AddRoadwayGeometryForm } from '../components/AddRoadwayGeometryForm';
import { AddRailCrossingForm } from '../components/AddRailCrossingForm';
import { AddCulvertForm } from '../components/AddCulvertForm';
import { AddPavementConditionForm } from '../components/AddPavementConditionForm';
import { AddShoulderForm } from '../components/AddShoulderForm';
import { AddTrafficDeviceForm } from '../components/AddTrafficDeviceForm';
import { AddWeightStationForm } from '../components/AddWeightStationForm';
import { AddSensitiveZoneForm } from '../components/AddSensitiveZoneForm';
import { AddGradientForm } from '../components/AddGradientForm';
import { AddVegetationForm } from '../components/AddVegetationForm';
import { AddFloodZoneForm } from '../components/AddFloodZoneForm';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useTheme } from '../contexts/ThemeContext';
import { ConfirmationDialog } from '../components/ConfirmationDialog';
const DEFAULT_CENTER = [-33.4085, -70.5676]; // Santiago, Chile coordinates
const DEFAULT_ZOOM = 13;
const pointTypes = [{
  id: 'railroad',
  icon: TrainIcon,
  label: 'Railroad'
}, {
  id: 'road',
  icon: BoxIcon,
  label: 'Road'
}, {
  id: 'intersection',
  icon: GitMergeIcon,
  label: 'Intersection'
}, {
  id: 'bridge',
  icon: BoxIcon,
  label: 'Bridge'
}, {
  id: 'powerline',
  icon: ZapIcon,
  label: 'Power Line'
}, {
  id: 'overhead',
  icon: ArrowUpIcon,
  label: 'Overhead'
}, {
  id: 'tunnel',
  icon: UnderlineIcon,
  label: 'Tunnel'
}, {
  id: 'roadway_geometry',
  icon: ActivityIcon,
  label: 'Roadway Geometry'
}, {
  id: 'rail_crossing',
  icon: AlertTriangleIcon,
  label: 'Rail Crossing'
}, {
  id: 'culvert',
  icon: BoxIcon,
  label: 'Culvert'
}, {
  id: 'pavement',
  icon: BarChartIcon,
  label: 'Pavement'
}, {
  id: 'shoulder',
  icon: BoxIcon,
  label: 'Shoulder'
}, {
  id: 'traffic_device',
  icon: SignalIcon,
  label: 'Traffic Device'
}, {
  id: 'weight_station',
  icon: WeightIcon,
  label: 'Weight Station'
}, {
  id: 'sensitive_zone',
  icon: ShieldIcon,
  label: 'Sensitive Zone'
}, {
  id: 'gradient',
  icon: ThermometerIcon,
  label: 'Gradient'
}, {
  id: 'vegetation',
  icon: BoxIcon,
  label: 'Vegetation'
}, {
  id: 'flood_zone',
  icon: CloudRainIcon,
  label: 'Flood Zone'
}, {
  id: 'custom',
  icon: HelpCircleIcon,
  label: 'Custom'
}];
export function SurveyScreen({
  onProfileClick,
  onSettingsClick,
  onShowRoutes
}) {
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [distance, setDistance] = useState('0.00');
  const [showForm, setShowForm] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [showSaveRoute, setShowSaveRoute] = useState(false);
  const [showRoutes, setShowRoutes] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [handedness, setHandedness] = useState('right');
  const [visiblePointTypes, setVisiblePointTypes] = useState(pointTypes);
  const [lastVisibilityCheck, setLastVisibilityCheck] = useState(Date.now());
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showUnsavedChangesDialog, setShowUnsavedChangesDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const surveys = [{
    id: '1',
    name: 'Vitacura Survey',
    date: '2025-05-30',
    startPoint: 'Luis Carrera 2091, Vitacura',
    endPoint: 'Nazca 5652, Vitacura',
    distance: '0.07 Km'
  }, {
    id: '2',
    name: 'Santiago Route',
    date: '2025-05-30',
    startPoint: 'Start Point B',
    endPoint: 'End Point B',
    distance: '0.04 Km'
  }];
  useEffect(() => {
    if (selectedSurvey) {
      loadFormVisibilitySettings();
    }
  }, [selectedSurvey]);
  useEffect(() => {
    const loadMap = async () => {
      try {
        const L = await import('leaflet');
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
        });
        setMapLoaded(true);
      } catch (error) {
        console.error('Error loading map:', error);
      }
    };
    loadMap();
  }, []);
  useEffect(() => {
    loadFormVisibilitySettings();
  }, []);
  const loadFormVisibilitySettings = () => {
    const savedFormVisibility = localStorage.getItem('formVisibility');
    if (savedFormVisibility) {
      try {
        const formVisibilitySettings = JSON.parse(savedFormVisibility);
        const orderedPointTypes = [];
        formVisibilitySettings.forEach(setting => {
          const pointType = pointTypes.find(type => type.id === setting.id);
          if (pointType && setting.visible !== false) {
            orderedPointTypes.push(pointType);
          }
        });
        pointTypes.forEach(type => {
          const existsInSettings = formVisibilitySettings.some(setting => setting.id === type.id);
          if (!existsInSettings) {
            orderedPointTypes.push(type);
          }
        });
        setVisiblePointTypes(orderedPointTypes);
        setLastVisibilityCheck(Date.now());
      } catch (error) {
        console.error('Error parsing form visibility settings:', error);
      }
    }
  };
  const handlePointSelect = type => {
    setSelectedType(type);
    setShowForm(true);
  };
  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedType(null);
  };
  const handleSavePoint = data => {
    console.log('Saving point data:', data);
    handleCloseForm();
  };
  const handleStartSurvey = () => {
    console.log('Starting survey...');
  };
  const handleEndSurvey = () => {
    setShowSaveRoute(true);
  };
  const handleSaveRoute = () => {
    setShowSaveRoute(false);
    setShowRoutes(true);
  };
  const handleDeleteConfirm = item => {
    setItemToDelete(item);
    setShowDeleteConfirm(true);
  };
  const handleDeleteItem = () => {
    if (itemToDelete) {
      console.log('Deleting item:', itemToDelete);
      setShowDeleteConfirm(false);
      setItemToDelete(null);
    }
  };
  const handleNavigateWithCheck = action => {
    if (hasUnsavedChanges) {
      setPendingAction(action);
      setShowUnsavedChangesDialog(true);
    } else {
      executePendingAction(action);
    }
  };
  const executePendingAction = action => {
    if (!action) return;
    switch (action.type) {
      case 'navigate':
        action.handler();
        break;
      case 'delete':
        handleDeleteItem();
        break;
      default:
        break;
    }
    setPendingAction(null);
  };
  const renderForm = () => {
    switch (selectedType) {
      case 'railroad':
        return <RailroadForm onClose={handleCloseForm} onSave={handleSavePoint} />;
      case 'road':
        return <RoadForm onClose={handleCloseForm} onSave={handleSavePoint} />;
      case 'intersection':
        return <IntersectionForm onClose={handleCloseForm} onSave={handleSavePoint} />;
      case 'bridge':
        return <BridgeForm onClose={handleCloseForm} onSave={handleSavePoint} />;
      case 'powerline':
        return <PowerlineForm onClose={handleCloseForm} onSave={handleSavePoint} />;
      case 'overhead':
        return <OverheadForm onCancel={handleCloseForm} onSave={handleSavePoint} />;
      case 'tunnel':
        return <AddTunnelForm onBack={handleCloseForm} onSave={handleSavePoint} onCancel={handleCloseForm} />;
      case 'roadway_geometry':
        return <AddRoadwayGeometryForm onBack={handleCloseForm} onSave={handleSavePoint} onCancel={handleCloseForm} />;
      case 'rail_crossing':
        return <AddRailCrossingForm onBack={handleCloseForm} onSave={handleSavePoint} onCancel={handleCloseForm} />;
      case 'culvert':
        return <AddCulvertForm onBack={handleCloseForm} onSave={handleSavePoint} onCancel={handleCloseForm} />;
      case 'pavement':
        return <AddPavementConditionForm onBack={handleCloseForm} onSave={handleSavePoint} onCancel={handleCloseForm} />;
      case 'shoulder':
        return <AddShoulderForm onBack={handleCloseForm} onSave={handleSavePoint} onCancel={handleCloseForm} />;
      case 'traffic_device':
        return <AddTrafficDeviceForm onBack={handleCloseForm} onSave={handleSavePoint} onCancel={handleCloseForm} />;
      case 'weight_station':
        return <AddWeightStationForm onBack={handleCloseForm} onSave={handleSavePoint} onCancel={handleCloseForm} />;
      case 'sensitive_zone':
        return <AddSensitiveZoneForm onBack={handleCloseForm} onSave={handleSavePoint} onCancel={handleCloseForm} />;
      case 'gradient':
        return <AddGradientForm onBack={handleCloseForm} onSave={handleSavePoint} onCancel={handleCloseForm} />;
      case 'vegetation':
        return <AddVegetationForm onBack={handleCloseForm} onSave={handleSavePoint} onCancel={handleCloseForm} />;
      case 'flood_zone':
        return <AddFloodZoneForm onBack={handleCloseForm} onSave={handleSavePoint} onCancel={handleCloseForm} />;
      case 'custom':
        return <CustomPointForm onCancel={handleCloseForm} onSave={handleSavePoint} />;
      default:
        return null;
    }
  };
  if (showRoutes) {
    return <RoutesOverviewScreen onBack={() => setShowRoutes(false)} />;
  }
  if (showSaveRoute) {
    return <SaveRouteForm onSave={handleSaveRoute} onCancel={() => setShowSaveRoute(false)} />;
  }
  if (showCamera) {
    return <CameraView onClose={() => setShowCamera(false)} onSave={() => setShowCamera(false)} />;
  }
  if (showForm) {
    return renderForm();
  }
  return <div className="flex flex-col h-full min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header title="Surveys" onProfileClick={onProfileClick} onSettingsClick={onSettingsClick} />
      <div className="flex-1 overflow-y-auto p-4 pb-24">
        <button onClick={() => setSelectedSurvey('new')} className="w-full mb-4 p-4 bg-primary text-white rounded-lg flex items-center justify-center shadow-sm hover:bg-primary/90 transition-colors">
          <PlusIcon size={20} className="mr-2" />
          Start New Survey
        </button>
        <div className="space-y-4">
          {surveys.map(survey => <button key={survey.id} onClick={() => setSelectedSurvey(survey.id)} className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <MapPinIcon size={20} className="text-blue-500 mr-2" />
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {survey.name}
                  </span>
                </div>
                <ChevronRightIcon size={20} className="text-gray-400" />
              </div>
              <div className="space-y-2">
                <div className="flex items-start">
                  <div className="flex-1 text-left">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <span className="text-gray-500">Start:</span>{' '}
                      {survey.startPoint}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <span className="text-gray-500">End:</span>{' '}
                      {survey.endPoint}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{survey.date}</span>
                  <span>{survey.distance}</span>
                </div>
              </div>
            </button>)}
        </div>
      </div>
      {showDeleteConfirm && <ConfirmationDialog title="Delete Item" message="Are you sure you want to delete this item? This action cannot be undone." confirmText="Delete" cancelText="Cancel" type="danger" onConfirm={handleDeleteItem} onCancel={() => setShowDeleteConfirm(false)} />}
      {showUnsavedChangesDialog && <ConfirmationDialog title="Unsaved Changes" message="You have unsaved changes. Do you want to save them before leaving?" confirmText="Save" cancelText="Discard" type="warning" onConfirm={() => {
      setHasUnsavedChanges(false);
      setShowUnsavedChangesDialog(false);
      if (pendingAction) {
        executePendingAction(pendingAction);
      }
    }} onCancel={() => {
      setHasUnsavedChanges(false);
      setShowUnsavedChangesDialog(false);
      if (pendingAction) {
        executePendingAction(pendingAction);
      }
    }} />}
    </div>;
}