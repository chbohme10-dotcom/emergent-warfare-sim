import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Wrench, 
  Zap, 
  Radio, 
  Wifi,
  Cpu,
  HardDrive,
  Usb,
  Camera,
  Lock,
  Network,
  Radar,
  Power
} from 'lucide-react';

interface ToolsDrawerProps {
  onClose: () => void;
}

export const ToolsDrawer: React.FC<ToolsDrawerProps> = ({ onClose }) => {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const tools = [
    {
      id: 'flipper-zero',
      name: 'Flipper Zero',
      icon: Zap,
      status: 'connected',
      description: 'Multi-tool for pentesters',
      capabilities: ['RFID', 'NFC', 'Sub-GHz', 'Infrared', 'GPIO']
    },
    {
      id: 'hacker-rf',
      name: 'HackRF One',
      icon: Radio,
      status: 'available', 
      description: 'Software Defined Radio',
      capabilities: ['1MHz-6GHz', 'Half-duplex', '20MHz bandwidth']
    },
    {
      id: 'wifi-pineapple',
      name: 'WiFi Pineapple',
      icon: Wifi,
      status: 'deployed',
      description: 'Wireless auditing platform',
      capabilities: ['Evil Twin', 'Deauth', 'Packet Capture']
    },
    {
      id: 'rubber-ducky',
      name: 'USB Rubber Ducky',
      icon: Usb,
      status: 'connected',
      description: 'Keystroke injection tool',
      capabilities: ['HID Attack', 'Payload Delivery', 'Social Engineering']
    },
    {
      id: 'alfa-adapter',
      name: 'Alfa AWUS036ACS',
      icon: Network,
      status: 'connected',
      description: 'High-gain USB WiFi adapter',
      capabilities: ['Monitor Mode', 'Packet Injection', 'Long Range']
    },
    {
      id: 'proxmark',
      name: 'Proxmark3',
      icon: Lock,
      status: 'available',
      description: 'RFID research tool',
      capabilities: ['LF/HF RFID', 'Card Cloning', 'Badge Analysis']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'success';
      case 'deployed': return 'warning';
      case 'available': return 'info';
      case 'offline': return 'critical';
      default: return 'secondary';
    }
  };

  const renderToolInterface = (toolId: string) => {
    switch (toolId) {
      case 'flipper-zero':
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="text-xs">
                <Lock className="w-3 h-3 mr-1" />
                RFID
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                <Camera className="w-3 h-3 mr-1" />
                NFC
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                <Radio className="w-3 h-3 mr-1" />
                Sub-GHz
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                <Zap className="w-3 h-3 mr-1" />
                GPIO
              </Button>
            </div>
            <div className="p-3 bg-terminal-surface rounded">
              <div className="text-xs font-mono">
                <div>Firmware: 0.95.1</div>
                <div>Battery: 89%</div>
                <div>Storage: 64MB</div>
              </div>
            </div>
          </div>
        );
      
      case 'hacker-rf':
        return (
          <div className="space-y-3">
            <div className="p-3 bg-terminal-surface rounded">
              <div className="text-xs font-mono mb-2">FREQUENCY SCANNER</div>
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
            <div className="grid grid-cols-2 gap-2">
              <Button variant="terminal" size="sm" className="text-xs">
                Start Scan
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                Record
              </Button>
            </div>
          </div>
        );
      
      case 'wifi-pineapple':
        return (
          <div className="space-y-3">
            <div className="p-3 bg-terminal-surface rounded">
              <div className="text-xs font-mono">
                <div>Evil Twin APs: 3 active</div>
                <div>Clients Connected: 7</div>
                <div>Data Captured: 2.4MB</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="warning" size="sm" className="text-xs">
                Deauth Attack
              </Button>
              <Button variant="terminal" size="sm" className="text-xs">
                Portal Capture
              </Button>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="text-center py-4 text-sm text-muted-foreground">
            Tool interface loading...
          </div>
        );
    }
  };

  return (
    <div className="p-4 space-y-4">
      <Tabs defaultValue="hardware" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-terminal-bg">
          <TabsTrigger value="hardware">Hardware</TabsTrigger>
          <TabsTrigger value="software">Software</TabsTrigger>
          <TabsTrigger value="payloads">Payloads</TabsTrigger>
        </TabsList>

        <TabsContent value="hardware" className="space-y-3 mt-4">
          {tools.map((tool) => {
            const IconComponent = tool.icon;
            return (
              <Card key={tool.id} className="bg-terminal-bg border-terminal-border">
                <div className="p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <IconComponent className="w-4 h-4 text-glow-primary" />
                      <div>
                        <div className="font-mono font-bold text-sm">{tool.name}</div>
                        <div className="text-xs text-muted-foreground">{tool.description}</div>
                      </div>
                    </div>
                    <Badge variant={getStatusColor(tool.status) as any} className="text-xs">
                      {tool.status.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {tool.capabilities.map((cap, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {cap}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 text-xs"
                      onClick={() => setActiveTool(activeTool === tool.id ? null : tool.id)}
                    >
                      {activeTool === tool.id ? 'Hide' : 'Interface'}
                    </Button>
                    <Button 
                      size="sm" 
                      variant="terminal" 
                      className="flex-1 text-xs"
                      disabled={tool.status === 'offline'}
                    >
                      {tool.status === 'connected' ? 'Launch' : 'Connect'}
                    </Button>
                  </div>
                </div>
                
                {activeTool === tool.id && (
                  <div className="border-t border-terminal-border p-3">
                    {renderToolInterface(tool.id)}
                  </div>
                )}
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="software" className="space-y-3 mt-4">
          <Card className="p-4 bg-terminal-bg border-terminal-border">
            <h3 className="font-display font-bold mb-3">Software Arsenal</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="text-xs">Nmap</Button>
              <Button variant="outline" size="sm" className="text-xs">Wireshark</Button>
              <Button variant="outline" size="sm" className="text-xs">Metasploit</Button>
              <Button variant="outline" size="sm" className="text-xs">Burp Suite</Button>
              <Button variant="outline" size="sm" className="text-xs">John</Button>
              <Button variant="outline" size="sm" className="text-xs">Hashcat</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="payloads" className="space-y-3 mt-4">
          <Card className="p-4 bg-terminal-bg border-terminal-border">
            <h3 className="font-display font-bold mb-3">Payload Library</h3>
            <div className="space-y-2">
              <div className="p-2 bg-terminal-surface rounded flex justify-between items-center">
                <span className="text-xs font-mono">Windows_Reverse_Shell.ps1</span>
                <Button size="sm" variant="terminal" className="text-xs">Deploy</Button>
              </div>
              <div className="p-2 bg-terminal-surface rounded flex justify-between items-center">
                <span className="text-xs font-mono">Linux_Persistence.sh</span>
                <Button size="sm" variant="terminal" className="text-xs">Deploy</Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};