import React, { useState } from 'react';
import { WarfareLayout } from '@/components/layout/WarfareLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Globe, 
  Terminal, 
  Users, 
  Brain, 
  Monitor, 
  Briefcase, 
  Smartphone, 
  Wrench
} from 'lucide-react';
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

  const tabs = [
    { id: 'map', label: 'TACTICAL MAP', icon: Globe },
    { id: 'terminal', label: 'TERMINAL', icon: Terminal },
    { id: 'agents', label: 'AGENTS', icon: Users },
    { id: 'intel', label: 'INTEL', icon: Brain },
    { id: 'pc', label: 'PC', icon: Monitor },
    { id: 'blackbag', label: 'BLACKBAG', icon: Briefcase },
    { id: 'mobile', label: 'MOBILE', icon: Smartphone },
    { id: 'tools', label: 'TOOLS', icon: Wrench }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      {/* Top Navigation Bar */}
      <div className="bg-terminal-surface border-b border-terminal-border px-6 py-2">
        <div className="flex items-center gap-2 overflow-x-auto">
          {tabs.map(({ id, label, icon: Icon }) => (
            <Button
              key={id}
              variant={activeTab === id ? "terminal" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 whitespace-nowrap font-mono text-xs ${
                activeTab === id 
                  ? 'bg-terminal-border text-glow-primary border border-glow-primary/30' 
                  : 'hover:bg-terminal-border/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* Main Layout */}
      <WarfareLayout activeTab={activeTab} onTabChange={setActiveTab}>
        {renderTabContent()}
        {showAI && (
          <AIAssistant isMinimized={!showAI} onToggleMinimize={() => setShowAI(!showAI)} />
        )}
      </WarfareLayout>
      
      {/* Status Bar */}
      <div className="border-t border-terminal-border bg-terminal-surface px-4 py-2">
        <div className="flex items-center justify-between text-sm font-mono">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
              <span>FSMC ONLINE</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
              <span>MOSL SYNCED</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-status-warning animate-pulse" />
              <span>GCT ANALYZING</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">Agent AX-2387-Delta</span>
            <Badge variant="terminal" className="text-xs">Level 7 Clearance</Badge>
          </div>
        </div>
      </div>
    </div>
  );
};