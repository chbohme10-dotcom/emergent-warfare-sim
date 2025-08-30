import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Network, 
  Wifi, 
  Globe, 
  Shield,
  Activity,
  Search,
  Zap,
  Lock,
  Unlock,
  Signal,
  Router,
  Smartphone
} from 'lucide-react';

interface NetworkDrawerProps {
  onClose: () => void;
}

export const NetworkDrawer: React.FC<NetworkDrawerProps> = ({ onClose }) => {
  const [scanTarget, setScanTarget] = useState('');
  const [scanning, setScanning] = useState(false);

  const networkDevices = [
    {
      ip: '192.168.1.1',
      hostname: 'router.local',
      mac: '00:1A:2B:3C:4D:5E',
      type: 'Router',
      status: 'active',
      ports: ['22', '80', '443']
    },
    {
      ip: '192.168.1.15',
      hostname: 'desktop-pc',
      mac: 'AA:BB:CC:DD:EE:FF',
      type: 'Computer',
      status: 'active',
      ports: ['135', '445', '3389']
    },
    {
      ip: '192.168.1.23',
      hostname: 'smart-tv',
      mac: '11:22:33:44:55:66',
      type: 'IoT Device',
      status: 'vulnerable',
      ports: ['8080', '9999']
    }
  ];

  const wifiNetworks = [
    {
      ssid: 'CorpWiFi_Secure',
      bssid: 'A1:B2:C3:D4:E5:F6',
      security: 'WPA3',
      signal: -32,
      channel: 6,
      clients: 47
    },
    {
      ssid: 'Guest_Network',
      bssid: 'B2:C3:D4:E5:F6:A1',
      security: 'WPA2',
      signal: -45,
      channel: 11,
      clients: 12
    },
    {
      ssid: 'IoT_Devices',
      bssid: 'C3:D4:E5:F6:A1:B2',
      security: 'Open',
      signal: -28,
      channel: 1,
      clients: 23
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'vulnerable': return 'warning';
      case 'compromised': return 'critical';
      default: return 'secondary';
    }
  };

  const getSecurityColor = (security: string) => {
    switch (security) {
      case 'WPA3': return 'success';
      case 'WPA2': return 'info';
      case 'WEP': return 'warning';
      case 'Open': return 'critical';
      default: return 'secondary';
    }
  };

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => setScanning(false), 3000);
  };

  return (
    <div className="p-4 space-y-4">
      <Tabs defaultValue="discovery" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-terminal-bg">
          <TabsTrigger value="discovery">Discovery</TabsTrigger>
          <TabsTrigger value="wifi">WiFi</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="discovery" className="space-y-3 mt-4">
          {/* Network Scanner */}
          <Card className="p-4 bg-terminal-bg border-terminal-border">
            <h3 className="font-display font-bold mb-3 flex items-center gap-2">
              <Search className="w-4 h-4" />
              Network Scanner
            </h3>
            <div className="flex gap-2 mb-3">
              <Input
                placeholder="192.168.1.0/24"
                value={scanTarget}
                onChange={(e) => setScanTarget(e.target.value)}
                className="bg-terminal-surface border-terminal-border"
              />
              <Button 
                onClick={handleScan}
                disabled={scanning}
                variant="terminal"
                className="min-w-20"
              >
                {scanning ? <Activity className="w-4 h-4 animate-spin" /> : 'Scan'}
              </Button>
            </div>
            {scanning && (
              <div className="text-xs text-glow-primary font-mono">
                Scanning network... Discovering hosts...
              </div>
            )}
          </Card>

          {/* Discovered Devices */}
          <div className="space-y-2">
            {networkDevices.map((device, idx) => (
              <Card key={idx} className="p-3 bg-terminal-bg border-terminal-border">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-mono font-bold">{device.ip}</div>
                      <Badge variant={getStatusColor(device.status) as any} className="text-xs">
                        {device.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">{device.hostname}</div>
                  </div>
                  <div className="text-xs text-right">
                    <div className="font-mono">{device.type}</div>
                    <div className="text-muted-foreground">{device.mac}</div>
                  </div>
                </div>
                
                <div className="text-xs mb-2">
                  <span className="text-muted-foreground">Open Ports: </span>
                  {device.ports.map((port, portIdx) => (
                    <Badge key={portIdx} variant="outline" className="text-xs mr-1">
                      {port}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 text-xs">
                    <Shield className="w-3 h-3 mr-1" />
                    Scan
                  </Button>
                  <Button size="sm" variant="terminal" className="flex-1 text-xs">
                    <Zap className="w-3 h-3 mr-1" />
                    Exploit
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="wifi" className="space-y-3 mt-4">
          {/* WiFi Scanner Controls */}
          <Card className="p-4 bg-terminal-bg border-terminal-border">
            <h3 className="font-display font-bold mb-3 flex items-center gap-2">
              <Wifi className="w-4 h-4" />
              WiFi Analysis
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <Button variant="terminal" size="sm" className="text-xs">
                Monitor Mode
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                Capture
              </Button>
              <Button variant="warning" size="sm" className="text-xs">
                Deauth
              </Button>
            </div>
          </Card>

          {/* WiFi Networks */}
          <div className="space-y-2">
            {wifiNetworks.map((network, idx) => (
              <Card key={idx} className="p-3 bg-terminal-bg border-terminal-border">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-mono font-bold">{network.ssid}</div>
                      <Badge variant={getSecurityColor(network.security) as any} className="text-xs">
                        {network.security}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">{network.bssid}</div>
                  </div>
                  <div className="text-xs text-right">
                    <div className="flex items-center gap-1">
                      <Signal className="w-3 h-3" />
                      <span>{network.signal} dBm</span>
                    </div>
                    <div className="text-muted-foreground">Ch {network.channel}</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-muted-foreground">Clients: {network.clients}</span>
                  <div className="flex items-center gap-1">
                    {network.security === 'Open' ? (
                      <Unlock className="w-3 h-3 text-status-critical" />
                    ) : (
                      <Lock className="w-3 h-3 text-status-success" />
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 text-xs">
                    Attack
                  </Button>
                  <Button size="sm" variant="terminal" className="flex-1 text-xs">
                    Clone
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-3 mt-4">
          <Card className="p-4 bg-terminal-bg border-terminal-border">
            <h3 className="font-display font-bold mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Traffic Analysis
            </h3>
            <div className="space-y-2 text-sm">
              <div className="p-2 bg-terminal-surface rounded">
                <div className="font-mono text-xs">Packets Captured: 47,293</div>
                <div className="font-mono text-xs">Protocols: HTTP, HTTPS, DNS, SSH</div>
                <div className="font-mono text-xs">Suspicious Activity: 3 alerts</div>
              </div>
              <Button className="w-full" variant="terminal" size="sm">
                <Globe className="w-4 h-4 mr-2" />
                Open Wireshark
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};