import React from 'react';
import { ChevronLeftIcon, UserIcon, SettingsIcon, SaveIcon } from 'lucide-react';
import { GlassPanel } from './ui/GlassPanel';
import { GlassButton } from './ui/GlassButton';
export function Header({
  title,
  onBack,
  onProfileClick,
  onSettingsClick,
  onSave
}) {
  return <GlassPanel position="top" className="flex items-center justify-between p-4 z-50">
      <div className="flex items-center">
        {onBack && <GlassButton onClick={onBack} variant="ghost" size="icon" className="mr-3 hover:bg-white/10 dark:hover:bg-black/10" icon={<ChevronLeftIcon size={24} />} />}
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>
      <div className="flex items-center space-x-2">
        {onSave && <GlassButton onClick={onSave} variant="ghost" size="icon" className="hover:bg-white/10 dark:hover:bg-black/10" icon={<SaveIcon size={22} />} />}
        {onSettingsClick && <GlassButton onClick={onSettingsClick} variant="ghost" size="icon" className="hover:bg-white/10 dark:hover:bg-black/10" icon={<SettingsIcon size={22} />} />}
        {onProfileClick && <GlassButton onClick={onProfileClick} variant="ghost" size="icon" className="hover:bg-white/10 dark:hover:bg-black/10" icon={<UserIcon size={22} />} />}
      </div>
    </GlassPanel>;
}