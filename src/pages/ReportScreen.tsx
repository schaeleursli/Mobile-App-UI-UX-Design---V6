import React, { useState } from 'react';
import { Header } from '../components/Header';
import { FileTextIcon, CheckIcon, ChevronRightIcon, FileIcon, DownloadIcon } from 'lucide-react';
export function ReportScreen() {
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const surveys = [{
    id: '1',
    name: 'Vitacura Survey',
    date: '2025-05-30',
    points: 12
  }, {
    id: '2',
    name: 'Santiago Route',
    date: '2025-05-30',
    points: 8
  }];
  const templates = [{
    id: '1',
    name: 'Standard Report',
    description: 'Basic survey report with all measurements'
  }, {
    id: '2',
    name: 'Detailed Report',
    description: 'Comprehensive report with photos and notes'
  }, {
    id: '3',
    name: 'Executive Summary',
    description: 'Brief overview of key findings'
  }];
  if (showEditor) {
    return <ReportEditor onClose={() => setShowEditor(false)} />;
  }
  return <div className="flex flex-col h-full min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header title="Build Report" />
      <div className="flex-1 overflow-y-auto p-4 pb-24 space-y-6">
        {/* Survey Selection */}
        <div>
          <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
            Select Survey
          </h2>
          <div className="space-y-3">
            {surveys.map(survey => <button key={survey.id} onClick={() => setSelectedSurvey(survey.id)} className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors ${selectedSurvey === survey.id ? 'bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-500' : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750'}`}>
                <div className="flex items-center">
                  <FileTextIcon className="text-blue-500 mr-3" size={24} />
                  <div className="text-left">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {survey.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {survey.date} • {survey.points} points
                    </p>
                  </div>
                </div>
                {selectedSurvey === survey.id && <CheckIcon className="text-blue-500" size={24} />}
              </button>)}
          </div>
        </div>
        {/* Template Selection */}
        <div>
          <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
            Select Template
          </h2>
          <div className="space-y-3">
            {templates.map(template => <button key={template.id} onClick={() => setSelectedTemplate(template.id)} className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors ${selectedTemplate === template.id ? 'bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-500' : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750'}`}>
                <div className="flex items-center">
                  <FileIcon className="text-blue-500 mr-3" size={24} />
                  <div className="text-left">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {template.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {template.description}
                    </p>
                  </div>
                </div>
                {selectedTemplate === template.id && <CheckIcon className="text-blue-500" size={24} />}
              </button>)}
          </div>
        </div>
        {/* Build Button */}
        <button onClick={() => setShowEditor(true)} disabled={!selectedSurvey || !selectedTemplate} className={`w-full p-4 rounded-lg text-white text-lg font-medium transition-colors ${selectedSurvey && selectedTemplate ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'}`}>
          Build Report
        </button>
      </div>
    </div>;
}
function ReportEditor({
  onClose
}) {
  return <div className="flex flex-col h-full min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header title="Edit Report" onBack={onClose} />
      {/* Toolbar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="flex items-center p-2 space-x-1 overflow-x-auto">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <span className="font-bold">B</span>
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <span className="italic">I</span>
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <span className="underline">U</span>
          </button>
          <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-2" />
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            H1
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            H2
          </button>
          <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-2" />
          <button className="flex items-center px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-blue-500">
            <DownloadIcon size={16} className="mr-1" />
            Export
          </button>
        </div>
      </div>
      {/* Editor */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 min-h-[calc(100vh-200px)] shadow-sm">
          <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Route Survey Report
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <h2>Survey Details</h2>
            <p>Date: May 30, 2025</p>
            <p>Route: Vitacura to Santiago</p>
            <p>Distance: 0.07 km</p>
            <h2>Obstructions</h2>
            <ul>
              <li>Railroad crossing at km 0.02</li>
              <li>Overhead power line at km 0.04</li>
              <li>Bridge clearance at km 0.06</li>
            </ul>
            <h2>Recommendations</h2>
            <p>
              Based on the survey findings, the following recommendations are
              made:
            </p>
            <ol>
              <li>Use alternate route for vehicles over 4.5m height</li>
              <li>Coordinate with railway authority for crossing</li>
              <li>Schedule transport during off-peak hours</li>
            </ol>
          </div>
        </div>
      </div>
    </div>;
}