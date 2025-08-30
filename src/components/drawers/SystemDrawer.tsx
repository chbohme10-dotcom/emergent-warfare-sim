import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Settings, 
  Cpu, 
  HardDrive, 
  MemoryStick,
  Network,
  Battery,
  Thermometer,
  Activity,
  Power,
  RefreshCw
} from 'lucide-react';

interface SystemDrawerProps {
  onClose: () => void;
}

export const SystemDrawer: React.FC<SystemDrawerProps> = ({ onClose }) => {
  const systemStats = {
    cpu: 34,
    memory: 67,
    disk: 23,
    network: 89,
    temperature: 42,
    uptime: '7d 14h 23m'
  };

  return (
    <div className="p-4 space-y-4">
      {/* System Overview */}
      <Card className="p-4 bg-terminal-bg border-terminal-border">
        <h3 className="font-display font-bold mb-3 flex items-center gap-2">
          <Activity className="w-4 h-4" />
          System Status
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-glow-primary" />
              <span className="text-sm">CPU Usage</span>
            </div>
            <div className="text-sm font-mono">{systemStats.cpu}%</div>
          </div>
          <Progress value={systemStats.cpu} className="h-2" />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MemoryStick className="w-4 h-4 text-glow-primary" />
              <span className="text-sm">Memory</span>
            </div>
            <div className="text-sm font-mono">{systemStats.memory}%</div>
          </div>
          <Progress value={systemStats.memory} className="h-2" />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-glow-primary" />
              <span className="text-sm">Storage</span>
            </div>
            <div className="text-sm font-mono">{systemStats.disk}%</div>
          </div>
          <Progress value={systemStats.disk} className="h-2" />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Network className="w-4 h-4 text-glow-primary" />
              <span className="text-sm">Network</span>
            </div>
            <div className="text-sm font-mono">{systemStats.network}%</div>
          </div>
          <Progress value={systemStats.network} className="h-2" />
        </div>
      </Card>

      {/* System Info */}
      <Card className="p-4 bg-terminal-bg border-terminal-border">
        <h3 className="font-display font-bold mb-3">Hardware Info</h3>
        <div className="space-y-2 text-sm font-mono">
          <div className="flex justify-between">
            <span>CPU:</span>
            <span>Intel i9-12900K</span>
          </div>
          <div className="flex justify-between">
            <span>RAM:</span>
            <span>32GB DDR4</span>
          </div>
          <div className="flex justify-between">
            <span>GPU:</span>
            <span>RTX 4080</span>
          </div>
          <div className="flex justify-between">
            <span>Storage:</span>
            <span>2TB NVMe SSD</span>
          </div>
          <div className="flex justify-between">
            <span>OS:</span>
            <span>Kali Linux 2024.1</span>
          </div>
          <div className="flex justify-between">
            <span>Uptime:</span>
            <span>{systemStats.uptime}</span>
          </div>
        </div>
      </Card>

      {/* Temperature & Power */}
      <Card className="p-4 bg-terminal-bg border-terminal-border">
        <h3 className="font-display font-bold mb-3">Thermal & Power</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <Thermometer className="w-6 h-6 text-glow-primary mx-auto mb-2" />
            <div className="text-lg font-mono font-bold">{systemStats.temperature}°C</div>
            <div className="text-xs text-muted-foreground">CPU Temp</div>
          </div>
          <div className="text-center">
            <Battery className="w-6 h-6 text-glow-primary mx-auto mb-2" />
            <div className="text-lg font-mono font-bold">AC</div>
            <div className="text-xs text-muted-foreground">Power</div>
          </div>
        </div>
      </Card>

      {/* System Controls */}
      <Card className="p-4 bg-terminal-bg border-terminal-border">
        <h3 className="font-display font-bold mb-3">Controls</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className="text-xs">
            <RefreshCw className="w-3 h-3 mr-1" />
            Restart
          </Button>
          <Button variant="critical" size="sm" className="text-xs">
            <Power className="w-3 h-3 mr-1" />
            Shutdown
          </Button>
          <Button variant="terminal" size="sm" className="text-xs">
            <Settings className="w-3 h-3 mr-1" />
            Settings
          </Button>
          <Button variant="warning" size="sm" className="text-xs">
            Emergency
          </Button>
        </div>
      </Card>

      {/* Active Processes */}
      <Card className="p-4 bg-terminal-bg border-terminal-border">
        <h3 className="font-display font-bold mb-3">Active Processes</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center p-2 bg-terminal-surface rounded">
            <span className="text-xs font-mono">firefox</span>
            <Badge variant="info" className="text-xs">12.3%</Badge>
          </div>
          <div className="flex justify-between items-center p-2 bg-terminal-surface rounded">
            <span className="text-xs font-mono">nmap</span>
            <Badge variant="warning" className="text-xs">8.7%</Badge>
          </div>
          <div className="flex justify-between items-center p-2 bg-terminal-surface rounded">
            <span className="text-xs font-mono">wireshark</span>
            <Badge variant="success" className="text-xs">5.2%</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
};