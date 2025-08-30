import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Globe, 
  Terminal, 
  Users, 
  Brain, 
  Monitor, 
  Briefcase, 
  Smartphone, 
  Wrench,
  MessageCircle,
  Settings,
  Shield,
  Zap,
  Satellite,
  Radar,
  Database,
  Network,
  Camera,
  Cpu,
  HardDrive,
  Wifi,
  Lock,
  Key,
  Search,
  Target,
  MapPin,
  Navigation
} from 'lucide-react';
import { LeftToolbar } from './LeftToolbar';
import { RightToolbar } from './RightToolbar';
import { TopNavigation } from './TopNavigation';

interface WarfareLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const WarfareLayout: React.FC<WarfareLayoutProps> = ({ 
  children, 
  activeTab, 
  onTabChange 
}) => {
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
  const [leftActiveDrawer, setLeftActiveDrawer] = useState<string | null>(null);
  const [rightActiveDrawer, setRightActiveDrawer] = useState<string | null>(null);

  const openLeftDrawer = (drawer: string) => {
    setLeftActiveDrawer(drawer);
    setLeftDrawerOpen(true);
  };

  const openRightDrawer = (drawer: string) => {
    setRightActiveDrawer(drawer);
    setRightDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      {/* Fixed Top Navigation */}
      <TopNavigation 
        activeTab={activeTab} 
        onTabChange={onTabChange} 
      />

      {/* Main Layout */}
      <div className="flex-1 flex relative">
        {/* Left Toolbar */}
        <LeftToolbar 
          onDrawerOpen={openLeftDrawer}
          activeDrawer={leftActiveDrawer}
          isDrawerOpen={leftDrawerOpen}
          onDrawerClose={() => setLeftDrawerOpen(false)}
        />

        {/* Main Content */}
        <main className="flex-1 relative overflow-hidden">
          {children}
        </main>

        {/* Right Toolbar */}
        <RightToolbar 
          onDrawerOpen={openRightDrawer}
          activeDrawer={rightActiveDrawer}
          isDrawerOpen={rightDrawerOpen}
          onDrawerClose={() => setRightDrawerOpen(false)}
        />
      </div>

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