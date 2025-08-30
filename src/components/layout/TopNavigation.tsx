import React from 'react';
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

interface TopNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({ 
  activeTab, 
  onTabChange 
}) => {
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
    <div className="bg-terminal-surface border-b border-terminal-border sticky top-0 z-50">
      {/* Header */}
      <div className="px-6 py-3 border-b border-terminal-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-terminal-bg terminal-glow">
              <Globe className="w-6 h-6 text-glow-primary" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-glow">WARFARE NEXUS</h1>
              <p className="text-sm text-muted-foreground font-mono">Emergent Warfare Framework v2.387</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="critical" className="pulse-glow">LIVE</Badge>
            <div className="text-sm font-mono text-right">
              <div className="text-glow-primary">23:47:32</div>
              <div className="text-xs text-muted-foreground">WAR CLOCK</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-6 py-2">
        <div className="flex items-center gap-2 overflow-x-auto">
          {tabs.map(({ id, label, icon: Icon }) => (
            <Button
              key={id}
              variant={activeTab === id ? "terminal" : "ghost"}
              size="sm"
              onClick={() => onTabChange(id)}
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
    </div>
  );
};