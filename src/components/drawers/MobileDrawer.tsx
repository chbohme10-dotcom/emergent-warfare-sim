import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Smartphone, 
  Phone, 
  MessageSquare, 
  Wifi, 
  Signal,
  Battery,
  Camera,
  Bluetooth,
  Shield,
  Zap,
  Network,
  Radio
} from 'lucide-react';

interface MobileDrawerProps {
  onClose: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ onClose }) => {
  const [activeApp, setActiveApp] = useState('home');

  const phoneStats = {
    battery: 87,
    signal: 4,
    wifi: true,
    bluetooth: true,
    encrypted: true
  };

  const apps = [
    { id: 'sigint', name: 'SIGINT', icon: Radio, description: 'Signal Intelligence' },
    { id: 'imsi', name: 'IMSI Catcher', icon: Network, description: 'Cell Tower Simulator' },
    { id: 'scanner', name: 'RF Scanner', icon: Signal, description: 'Radio Frequency Analysis' },
    { id: 'camera', name: 'OpCam', icon: Camera, description: 'Operational Camera' },
    { id: 'messages', name: 'SecMsg', icon: MessageSquare, description: 'Encrypted Messaging' },
    { id: 'phone', name: 'SpoofCall', icon: Phone, description: 'Voice Manipulation' }
  ];

  const renderPhoneScreen = () => {
    if (activeApp === 'home') {
      return (
        <div className="p-4">
          <div className="grid grid-cols-2 gap-3">
            {apps.map((app) => {
              const IconComponent = app.icon;
              return (
                <Button
                  key={app.id}
                  variant="ghost"
                  onClick={() => setActiveApp(app.id)}
                  className="h-20 flex flex-col items-center justify-center gap-2 bg-terminal-surface/50 hover:bg-terminal-border/50"
                >
                  <IconComponent className="w-6 h-6 text-glow-primary" />
                  <span className="text-xs">{app.name}</span>
                </Button>
              );
            })}
          </div>
        </div>
      );
    }

    const currentApp = apps.find(app => app.id === activeApp);
    return (
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveApp('home')}
            className="text-xs"
          >
            ← Back
          </Button>
          <span className="font-mono font-bold">{currentApp?.name}</span>
        </div>
        
        <div className="space-y-3">
          {activeApp === 'sigint' && (
            <>
              <div className="p-3 bg-terminal-surface rounded">
                <div className="text-xs font-bold mb-2">FREQUENCY SCAN</div>
                <div className="space-y-1 text-xs">
                  <div>433.92 MHz - IoT Device Traffic</div>
                  <div>915.00 MHz - Industrial Sensors</div>
                  <div>2.4 GHz - WiFi Networks: 47 detected</div>
                </div>
              </div>
              <Button className="w-full" variant="terminal" size="sm">
                Start Deep Scan
              </Button>
            </>
          )}
          
          {activeApp === 'imsi' && (
            <>
              <div className="p-3 bg-terminal-surface rounded">
                <div className="text-xs font-bold mb-2">CELL TOWER SIMULATION</div>
                <div className="space-y-1 text-xs">
                  <div>Status: Standby</div>
                  <div>Range: 500m radius</div>
                  <div>Targets: 0 connected</div>
                </div>
              </div>
              <Button className="w-full" variant="terminal" size="sm">
                <Zap className="w-4 h-4 mr-2" />
                Activate IMSI Catcher
              </Button>
            </>
          )}
          
          {activeApp === 'scanner' && (
            <>
              <div className="p-3 bg-terminal-surface rounded">
                <div className="text-xs font-bold mb-2">RF SPECTRUM ANALYSIS</div>
                <div className="h-16 bg-terminal-bg rounded flex items-end gap-1 p-2">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-glow-primary flex-1"
                      style={{ height: `${Math.random() * 100}%` }}
                    />
                  ))}
                </div>
              </div>
              <Button className="w-full" variant="terminal" size="sm">
                Record Signature
              </Button>
            </>
          )}
          
          {activeApp === 'camera' && (
            <div className="space-y-3">
              <div className="aspect-square bg-terminal-bg rounded border border-terminal-border flex items-center justify-center">
                <Camera className="w-12 h-12 text-muted-foreground" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">Photo</Button>
                <Button variant="outline" size="sm" className="flex-1">Video</Button>
                <Button variant="terminal" size="sm" className="flex-1">IR</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 space-y-4">
      <Tabs defaultValue="device" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-terminal-bg">
          <TabsTrigger value="device">Device</TabsTrigger>
          <TabsTrigger value="network">Network</TabsTrigger>
        </TabsList>

        <TabsContent value="device" className="mt-4">
          {/* Phone Status */}
          <Card className="p-3 bg-terminal-bg border-terminal-border mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-glow-primary" />
                <span className="font-mono font-bold text-sm">Tactical Phone</span>
              </div>
              <Badge variant="success" className="text-xs">SECURE</Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1">
                <Battery className="w-3 h-3" />
                <span>{phoneStats.battery}%</span>
              </div>
              <div className="flex items-center gap-1">
                <Signal className="w-3 h-3" />
                <span>{phoneStats.signal}/5</span>
              </div>
              <div className="flex items-center gap-1">
                <Wifi className="w-3 h-3" />
                <span>{phoneStats.wifi ? 'Connected' : 'Off'}</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                <span>Encrypted</span>
              </div>
            </div>
          </Card>

          {/* Phone Interface */}
          <Card className="bg-terminal-bg border-terminal-border">
            <div className="bg-terminal-surface p-2 flex items-center justify-between text-xs border-b border-terminal-border">
              <div className="flex items-center gap-1">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <Bluetooth className="w-3 h-3" />
              </div>
              <div>14:32</div>
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                <Battery className="w-3 h-3" />
              </div>
            </div>
            
            <div className="h-80 overflow-y-auto">
              {renderPhoneScreen()}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="network" className="mt-4">
          <Card className="p-4 bg-terminal-bg border-terminal-border">
            <h3 className="font-display font-bold mb-3 flex items-center gap-2">
              <Network className="w-4 h-4" />
              Network Analysis
            </h3>
            <div className="space-y-2 text-sm">
              <div className="p-2 bg-terminal-surface rounded">
                <div className="font-mono text-xs">WiFi Networks: 47 visible</div>
                <div className="font-mono text-xs">Cellular Towers: 3 in range</div>
                <div className="font-mono text-xs">Bluetooth Devices: 12 discovered</div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};