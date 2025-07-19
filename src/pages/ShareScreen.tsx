import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Share2Icon, FileTextIcon, GlobeIcon, UsersIcon, LinkIcon, ChevronRightIcon, DownloadIcon } from 'lucide-react';
export function ShareScreen() {
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareType, setShareType] = useState(null);
  const surveys = [{
    id: '1',
    name: 'Vitacura Survey',
    date: '2025-05-30',
    shared: 3
  }, {
    id: '2',
    name: 'Santiago Route',
    date: '2025-05-30',
    shared: 0
  }];
  // Pre-define color classes instead of using dynamic ones
  const shareOptions = [{
    id: 'users',
    icon: UsersIcon,
    title: 'Share with Team',
    description: 'Invite users to view or edit',
    bgClass: 'bg-blue-100 dark:bg-blue-900',
    iconClass: 'text-blue-500'
  }, {
    id: 'pdf',
    icon: FileTextIcon,
    title: 'Share PDF Report',
    description: 'Export and share detailed report',
    bgClass: 'bg-red-100 dark:bg-red-900',
    iconClass: 'text-red-500'
  }, {
    id: 'kml',
    icon: GlobeIcon,
    title: 'Share KML File',
    description: 'Export for Google Earth',
    bgClass: 'bg-green-100 dark:bg-green-900',
    iconClass: 'text-green-500'
  }, {
    id: 'link',
    icon: LinkIcon,
    title: 'Share View Link',
    description: 'Create public view-only link',
    bgClass: 'bg-purple-100 dark:bg-purple-900',
    iconClass: 'text-purple-500'
  }];
  const handleShare = type => {
    setShareType(type);
    setShowShareModal(true);
  };
  if (showShareModal) {
    return <ShareModal type={shareType} onClose={() => setShowShareModal(false)} />;
  }
  return <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      <Header title="Share" />
      <div className="p-4 flex-1 overflow-y-auto space-y-6">
        {/* Survey Selection */}
        <div>
          <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
            Select Survey to Share
          </h2>
          <div className="space-y-3">
            {surveys.map(survey => <button key={survey.id} onClick={() => setSelectedSurvey(survey.id)} className={`w-full flex items-center justify-between p-4 rounded-lg ${selectedSurvey === survey.id ? 'bg-blue-50 dark:bg-blue-900 border-2 border-blue-500' : 'bg-white dark:bg-gray-800'}`}>
                <div className="flex items-center">
                  <Share2Icon className="text-blue-500 mr-3" size={24} />
                  <div className="text-left">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {survey.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {survey.date} • {survey.shared} shares
                    </p>
                  </div>
                </div>
                {selectedSurvey === survey.id && <ChevronRightIcon className="text-blue-500" size={24} />}
              </button>)}
          </div>
        </div>
        {/* Share Options */}
        <div>
          <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
            Share Options
          </h2>
          <div className="space-y-3">
            {shareOptions.map(option => <button key={option.id} onClick={() => handleShare(option.id)} disabled={!selectedSurvey} className={`w-full flex items-center justify-between p-4 rounded-lg ${!selectedSurvey ? 'bg-gray-100 dark:bg-gray-800 opacity-50 cursor-not-allowed' : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                <div className="flex items-center">
                  <div className={`p-2 rounded-full ${option.bgClass}`}>
                    <option.icon className={option.iconClass} size={24} />
                  </div>
                  <div className="ml-3 text-left">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {option.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {option.description}
                    </p>
                  </div>
                </div>
                <ChevronRightIcon className="text-gray-400" size={20} />
              </button>)}
          </div>
        </div>
      </div>
    </div>;
}
// Move ShareModal to its own component to keep state handling clean
function ShareModal({
  type,
  onClose
}) {
  const [linkCopied, setLinkCopied] = useState(false);
  const handleCopyLink = () => {
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };
  return <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="flex flex-col h-full bg-white dark:bg-gray-900">
        <Header title={`Share ${type === 'pdf' ? 'PDF' : type === 'kml' ? 'KML' : 'Survey'}`} onBack={onClose} />
        <div className="p-4 flex-1 overflow-y-auto">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-500">Email Addresses</label>
              <input type="text" placeholder="Enter email addresses" className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-500">Permission Level</label>
              <select className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <option>View Only</option>
                <option>Can Edit</option>
                <option>Admin</option>
              </select>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="font-medium mb-2">Export Options</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Include Photos
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Include Maps
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Include Measurements
                </label>
              </div>
            </div>
            <button className="flex items-center justify-center w-full p-3 bg-red-500 text-white rounded-lg">
              <DownloadIcon size={20} className="mr-2" />
              Export PDF
            </button>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="font-medium mb-2">KML Options</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Include Route Path
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Include Points
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Include Photos
                </label>
              </div>
            </div>
            <button className="flex items-center justify-center w-full p-3 bg-green-500 text-white rounded-lg">
              <DownloadIcon size={20} className="mr-2" />
              Export KML
            </button>
          </div>
          <div className="space-y-4">
            <div className="relative">
              <input type="text" readOnly value="https://routesurvey.app/share/abc123" className="w-full p-3 pr-24 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800" />
              <button onClick={handleCopyLink} className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-blue-500 text-white rounded">
                {linkCopied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="font-medium mb-2">Link Settings</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Require Password
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Expire After 7 Days
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button onClick={onClose} className="w-full p-4 bg-primary text-white rounded-lg">
            Done
          </button>
        </div>
      </div>
    </div>;
}