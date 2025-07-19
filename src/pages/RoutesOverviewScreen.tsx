import React from 'react';
import { Header } from '../components/Header';
import { PlannedRouteTile } from '../components/routes/PlannedRouteTile';
export function RoutesOverviewScreen({
  onBack
}) {
  const routes = [{
    id: '1',
    title: 'Vitacura Survey',
    client: 'Mining Corp Ltd.',
    date: '2025-05-30',
    startPoint: 'Luis Carrera 2091, Vitacura, Santiago',
    endPoint: 'Nazca 5652, Vitacura, Santiago',
    distance: '0.07 Km',
    status: 'planned',
    cargoDescription: 'Heavy Equipment',
    cargoDimensions: '4.5m x 2.2m x 3.1m',
    cargoWeight: '12 tons',
    vehicleType: 'Semi Truck',
    trailerType: '40ft Container',
    notes: 'Route includes narrow passages and a bridge with height restrictions. Coordinate with local authorities before transit.',
    attachments: [{
      type: 'image',
      url: '#',
      name: 'site_photo.jpg'
    }, {
      type: 'document',
      url: '#',
      name: 'permits.pdf'
    }]
  }, {
    id: '2',
    title: 'Antofagasta Route',
    client: 'Logistics S.A.',
    date: '2025-06-15',
    startPoint: 'Agustín Denegri 5535, Vitacura',
    endPoint: 'Luis Carrera 2091, Vitacura, Santiago',
    distance: '0.04 Km',
    status: 'in-progress',
    cargoDescription: 'Construction Materials',
    cargoDimensions: '3.2m x 2.0m x 2.5m',
    cargoWeight: '8 tons',
    vehicleType: 'Flatbed Truck',
    notes: 'Delivery must be completed during daylight hours due to site restrictions.'
  }];
  const handleEdit = id => {
    console.log('Edit route:', id);
  };
  const handleDelete = id => {
    console.log('Delete route:', id);
  };
  const handleViewReport = id => {
    console.log('View report for route:', id);
  };
  const handleDuplicate = id => {
    console.log('Duplicate route:', id);
  };
  return <div className="flex flex-col h-full min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header title="View Routes" onBack={onBack} />
      <div className="flex-1 overflow-y-auto p-4 pb-24 space-y-4">
        {routes.map(route => <PlannedRouteTile key={route.id} {...route} onEdit={handleEdit} onDelete={handleDelete} onViewReport={handleViewReport} onDuplicate={handleDuplicate} />)}
      </div>
    </div>;
}