import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Wrench, 
  Settings,
  Zap,
  Radar,
  Database,
  Network,
  Camera,
  Cpu,
  HardDrive,
  Wifi,
  Lock,
  Key,
  Target,
  X
} from 'lucide-react';
import { ToolsDrawer } from '../drawers/ToolsDrawer';
import { SystemDrawer } from '../drawers/SystemDrawer';
import { NetworkDrawer } from '../drawers/NetworkDrawer';
import { SecurityDrawer } from '../drawers/SecurityDrawer';

interface RightToolbarProps {
  onDrawerOpen: (drawer: string) => void;
  activeDrawer: string | null;
  isDrawerOpen: boolean;
  onDrawerClose: () => void;
}

export const RightToolbar: React.FC<RightToolbarProps> = ({
  onDrawerOpen,
  activeDrawer,
  isDrawerOpen,
  onDrawerClose
}) => {
  const toolbarItems = [
    { id: 'tools', icon: Wrench, label: 'Tools', description: 'Hacking hardware' },
    { id: 'system', icon: Settings, label: 'System', description: 'System controls' },
    { id: 'network', icon: Network, label: 'Network', description: 'Network analysis' },
    { id: 'security', icon: Lock, label: 'Security', description: 'Security tools' },
    { id: 'surveillance', icon: Camera, label: 'Surveillance', description: 'CCTV access' },
    { id: 'signals', icon: Radar, label: 'SIGINT', description: 'Signal intelligence' },
    { id: 'database', icon: Database, label: 'Database', description: 'Data mining' },
    { id: 'targets', icon: Target, label: 'Targets', description: 'Target tracking' }
  ];

  const renderDrawerContent = () => {
    switch (activeDrawer) {
      case 'tools':
        return <ToolsDrawer onClose={onDrawerClose} />;
      case 'system':
        return <SystemDrawer onClose={onDrawerClose} />;
      case 'network':
        return <NetworkDrawer onClose={onDrawerClose} />;
      case 'security':
        return <SecurityDrawer onClose={onDrawerClose} />;
      default:
        return (
          <div className="p-4">
            <h3 className="font-display font-bold mb-2">Advanced Tool</h3>
            <p className="text-sm text-muted-foreground">
              This sophisticated warfare capability is being deployed.
            </p>
          </div>
        );
    }
  };

  return (
    <>
      {/* Right Drawer */}
      {isDrawerOpen && (
        <div className="w-80 bg-terminal-surface border-l border-terminal-border">
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

      {/* Right Toolbar */}
      <div className="w-16 bg-terminal-surface border-l border-terminal-border flex flex-col">
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
    </>
  );
};