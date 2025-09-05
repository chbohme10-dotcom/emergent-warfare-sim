import React, { useState } from 'react';
import { WarfareLayout } from '@/components/layout/WarfareLayout';
import { TerminalInterface } from '@/components/TerminalInterface';
import { TacticalMap3D } from '@/components/TacticalMap3D';
import { DesktopEmulator } from '@/components/DesktopEmulator';
import { ProductionDesktopEmulator } from '@/components/Enhanced/ProductionDesktopEmulator';
import { MobileHackingDevice } from '@/components/Mobile/MobileHackingDevice';
import { AndroidInterface } from '@/components/Mobile/AndroidInterface';
import { TimelineSystem } from '@/components/Timeline/TimelineSystem';
import { AIAssistant } from '@/components/AI/AIAssistant';
import { WorldWarClock } from '@/components/WorldWarClock';
import { FactionOverview } from '@/components/FactionOverview';

export const WarfareSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState('map');
  const [isCliMode, setIsCliMode] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [osType, setOsType] = useState<'linux' | 'windows'>('linux');
  const [timelineTime, setTimelineTime] = useState(new Date());

  const renderTabContent = () => {
    switch (activeTab) {
      case 'map':
        return <TacticalMap3D />;
      case 'terminal':
        return <TerminalInterface isCliMode={isCliMode} onModeToggle={() => setIsCliMode(!isCliMode)} />;
      case 'agents':
        return (
          <TimelineSystem 
            onTimeChange={setTimelineTime}
            onEventSelect={(event) => console.log('Event selected:', event)}
          />
        );
      case 'intel':
        return <div className="p-8 text-center text-muted-foreground">Intelligence analysis dashboard coming soon...</div>;
      case 'pc':
        return (
          <div className="h-full flex flex-col">
            <div className="p-4 bg-terminal-bg border-b border-terminal-border flex items-center justify-between">
              <h2 className="font-display font-bold text-glow-primary">Desktop Emulation Environment</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setOsType('linux')}
                  className={`px-3 py-1 text-xs rounded ${osType === 'linux' ? 'bg-glow-primary text-terminal-bg' : 'bg-terminal-surface text-glow-primary'}`}
                >
                  Linux
                </button>
                <button
                  onClick={() => setOsType('windows')}
                  className={`px-3 py-1 text-xs rounded ${osType === 'windows' ? 'bg-glow-primary text-terminal-bg' : 'bg-terminal-surface text-glow-primary'}`}
                >
                  Windows
                </button>
              </div>
            </div>
            <div className="flex-1">
              <ProductionDesktopEmulator osType={osType} />
            </div>
          </div>
        );
      case 'blackbag':
        return <div className="p-8 text-center text-muted-foreground">Equipment management coming soon...</div>;
      case 'mobile':
        return (
          <div className="h-full flex items-center justify-center bg-terminal-bg">
            <div className="flex gap-8 items-center">
              <div className="text-center">
                <h3 className="text-glow-primary font-display font-bold mb-4">TACTICAL MOBILE DEVICE</h3>
                <AndroidInterface onClose={() => {}} />
              </div>
              <div className="text-center">
                <h3 className="text-glow-primary font-display font-bold mb-4">MOBILE HACKING SUITE</h3>
                <MobileHackingDevice />
              </div>
            </div>
          </div>
        );
      case 'tools':
        return <div className="p-8 text-center text-muted-foreground">Advanced tools interface coming soon...</div>;
      default:
        return <TacticalMap3D />;
    }
  };

  return (
    <>
      <WarfareLayout activeTab={activeTab} onTabChange={setActiveTab}>
        {renderTabContent()}
      </WarfareLayout>
      
      {/* AI Assistant */}
      <AIAssistant 
        isMinimized={!showAI} 
        onToggleMinimize={() => setShowAI(!showAI)} 
      />
      
      {/* World War Clock removed - now integrated into top navigation */}
    </>
  );
};