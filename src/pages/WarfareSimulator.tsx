import React, { useState } from 'react';
import { WarfareLayout } from '@/components/layout/WarfareLayout';
import { TerminalInterface } from '@/components/TerminalInterface';
import { TacticalMap } from '@/components/TacticalMap';
import { WorldWarClock } from '@/components/WorldWarClock';
import { FactionOverview } from '@/components/FactionOverview';

export const WarfareSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState('map');
  const [isCliMode, setIsCliMode] = useState(false);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'map':
        return <TacticalMap />;
      case 'terminal':
        return <TerminalInterface isCliMode={isCliMode} onModeToggle={() => setIsCliMode(!isCliMode)} />;
      case 'agents':
        return <div className="p-8 text-center text-muted-foreground">Agent management system coming soon...</div>;
      case 'intel':
        return <div className="p-8 text-center text-muted-foreground">Intelligence analysis dashboard coming soon...</div>;
      case 'pc':
        return <div className="p-8 text-center text-muted-foreground">Desktop emulation environment coming soon...</div>;
      case 'blackbag':
        return <div className="p-8 text-center text-muted-foreground">Equipment management coming soon...</div>;
      case 'mobile':
        return <div className="p-8 text-center text-muted-foreground">Mobile hacking suite coming soon...</div>;
      case 'tools':
        return <div className="p-8 text-center text-muted-foreground">Advanced tools interface coming soon...</div>;
      default:
        return <TacticalMap />;
    }
  };

  return (
    <WarfareLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderTabContent()}
    </WarfareLayout>
  );
};