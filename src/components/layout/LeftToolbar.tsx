import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Briefcase, 
  Smartphone, 
  MessageCircle,
  Users,
  Shield,
  Search,
  MapPin,
  Navigation,
  Satellite,
  X
} from 'lucide-react';
import { AgentDrawer } from '../drawers/AgentDrawer';
import { IntelDrawer } from '../drawers/IntelDrawer';
import { BlackbagDrawer } from '../drawers/BlackbagDrawer';
import { MobileDrawer } from '../drawers/MobileDrawer';

interface LeftToolbarProps {
  onDrawerOpen: (drawer: string) => void;
  activeDrawer: string | null;
  isDrawerOpen: boolean;
  onDrawerClose: () => void;
}

export const LeftToolbar: React.FC<LeftToolbarProps> = ({
  onDrawerOpen,
  activeDrawer,
  isDrawerOpen,
  onDrawerClose
}) => {
  const toolbarItems = [
    { id: 'agents', icon: Users, label: 'Agents', description: 'Manage field operatives' },
    { id: 'intel', icon: Shield, label: 'Intel', description: 'Classified information' },
    { id: 'blackbag', icon: Briefcase, label: 'Blackbag', description: 'Physical equipment' },
    { id: 'mobile', icon: Smartphone, label: 'Mobile', description: 'Communication device' },
    { id: 'navigation', icon: Navigation, label: 'Nav', description: 'Navigation systems' },
    { id: 'satellite', icon: Satellite, label: 'Satellite', description: 'Orbital assets' },
    { id: 'search', icon: Search, label: 'Search', description: 'Intelligence search' },
    { id: 'chat', icon: MessageCircle, label: 'AI Chat', description: 'Assistant AI' }
  ];

  const renderDrawerContent = () => {
    switch (activeDrawer) {
      case 'agents':
        return <AgentDrawer onClose={onDrawerClose} />;
      case 'intel':
        return <IntelDrawer onClose={onDrawerClose} />;
      case 'blackbag':
        return <BlackbagDrawer onClose={onDrawerClose} />;
      case 'mobile':
        return <MobileDrawer onClose={onDrawerClose} />;
      default:
        return (
          <div className="p-4">
            <h3 className="font-display font-bold mb-2">Feature Coming Soon</h3>
            <p className="text-sm text-muted-foreground">
              This advanced warfare tool is currently under development.
            </p>
          </div>
        );
    }
  };

  return (
    <>
      {/* Left Toolbar */}
      <div className="w-16 bg-terminal-surface border-r border-terminal-border flex flex-col">
        <div className="p-2 space-y-2">
          {toolbarItems.map(({ id, icon: Icon, label, description }) => (
            <Button
              key={id}
              variant="ghost"
              size="sm"
              onClick={() => onDrawerOpen(id)}
              className={`w-12 h-12 p-0 flex flex-col items-center justify-center group relative ${
                activeDrawer === id && isDrawerOpen 
                  ? 'bg-terminal-border text-glow-primary' 
                  : 'hover:bg-terminal-border/50'
              }`}
              title={`${label}: ${description}`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs mt-1 leading-none">{label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Left Drawer */}
      {isDrawerOpen && (
        <div className="w-80 bg-terminal-surface border-r border-terminal-border">
          <div className="p-4 border-b border-terminal-border flex items-center justify-between">
            <h2 className="font-display font-bold text-glow">
              {toolbarItems.find(item => item.id === activeDrawer)?.label}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onDrawerClose}
              className="w-8 h-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <ScrollArea className="h-[calc(100vh-8rem)]">
            {renderDrawerContent()}
          </ScrollArea>
        </div>
      )}
    </>
  );
};