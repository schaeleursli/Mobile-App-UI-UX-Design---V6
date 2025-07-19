import React, { useState } from 'react';
import { StatusBar } from './components/StatusBar';
import { LoginScreen } from './components/LoginScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { PersonalInfoScreen } from './components/PersonalInfoScreen';
import { CompanyInfoScreen } from './components/CompanyInfoScreen';
import { SettingsScreen } from './pages/SettingsScreen';
import { ThemeProvider } from './contexts/ThemeContext';
import { BottomNavigation } from './components/BottomNavigation';
import { DashboardScreen } from './pages/DashboardScreen';
import { PlanScreen } from './pages/PlanScreen';
import { SurveyScreen } from './pages/SurveyScreen';
import { ReportScreen } from './pages/ReportScreen';
import { ShareScreen } from './pages/ShareScreen';
import { UserProfileModal } from './components/UserProfileModal';
export function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showRoutes, setShowRoutes] = useState(false);
  const [userData, setUserData] = useState({
    email: 'test@gmail.com',
    firstName: 'Test',
    lastName: 'User',
    officePhone: '',
    mobilePhone: ''
  });
  const navigateTo = screen => {
    setCurrentScreen(screen);
  };
  const handleProfileClick = () => {
    setShowProfile(true);
  };
  const handleSettingsClick = () => {
    navigateTo('settings');
  };
  const handleCloseSettings = () => {
    setShowSettings(false);
  };
  // Common props for all screens that need header buttons
  const headerProps = {
    onProfileClick: handleProfileClick,
    onSettingsClick: handleSettingsClick
  };
  return <ThemeProvider>
      <div className="flex flex-col w-full min-h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden transition-colors">
        <StatusBar />
        {currentScreen === 'login' && <LoginScreen onLogin={() => navigateTo('dashboard')} />}
        {currentScreen === 'dashboard' && <DashboardScreen {...headerProps} />}
        {currentScreen === 'plan' && <PlanScreen {...headerProps} />}
        {currentScreen === 'survey' && <SurveyScreen {...headerProps} onShowRoutes={show => setShowRoutes(show)} />}
        {currentScreen === 'report' && <ReportScreen {...headerProps} />}
        {currentScreen === 'share' && <ShareScreen {...headerProps} />}
        {currentScreen === 'settings' && <SettingsScreen onBack={() => navigateTo('dashboard')} {...headerProps} />}
        {currentScreen !== 'login' && <BottomNavigation currentScreen={currentScreen} onNavigate={navigateTo} />}
        {showProfile && <UserProfileModal user={userData} onClose={() => setShowProfile(false)} />}
        {showSettings && <SettingsScreen onBack={handleCloseSettings} {...headerProps} />}
      </div>
    </ThemeProvider>;
}