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
  );
};