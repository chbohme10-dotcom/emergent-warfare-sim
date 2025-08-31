import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Smartphone, 
  Wifi, 
  Radio, 
  Antenna,
  Signal,
  Search,
  Shield,
  Zap,
  Eye,
  Target,
  Scan,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Download,
  Upload,
  Settings,
  Power,
  Battery,
  Network,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Camera,
  Mic,
  MicOff
} from 'lucide-react';

interface CellTower {
  id: string;
  operator: string;
  band: string;
  signal: number;
  location: string;
  encryption: string;
}

interface IMSITarget {
  imsi: string;
  operator: string;
  lastSeen: Date;
  location: { lat: number; lng: number };
  deviceType: string;
  confidence: number;
}

interface SignalData {
  frequency: number;
  strength: number;
  modulation: string;
  protocol?: string;
  timestamp: Date;
}

export const MobileHackingDevice: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanType, setScanType] = useState<'cellular' | 'wifi' | 'bluetooth' | 'rf'>('cellular');
  const [cellTowers, setCellTowers] = useState<CellTower[]>([]);
  const [imsiTargets, setImsiTargets] = useState<IMSITarget[]>([]);
  const [signalData, setSignalData] = useState<SignalData[]>([]);
  const [selectedFreq, setSelectedFreq] = useState(900);
  const [isRecording, setIsRecording] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(87);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (isScanning) {
        // Generate new cell tower data
        if (scanType === 'cellular') {
          const newTower: CellTower = {
            id: `tower_${Date.now()}`,
            operator: ['Verizon', 'AT&T', 'T-Mobile', 'Sprint'][Math.floor(Math.random() * 4)],
            band: ['850MHz', '1900MHz', '700MHz', '2100MHz'][Math.floor(Math.random() * 4)],
            signal: Math.floor(Math.random() * 100),
            location: `${(Math.random() * 180 - 90).toFixed(4)}, ${(Math.random() * 360 - 180).toFixed(4)}`,
            encryption: ['A5/1', 'A5/3', 'None', 'Unknown'][Math.floor(Math.random() * 4)]
          };
          setCellTowers(prev => [...prev.slice(-9), newTower]);
        }

        // Generate IMSI targets
        if (scanType === 'cellular' && Math.random() > 0.7) {
          const newTarget: IMSITarget = {
            imsi: `${Math.floor(Math.random() * 999)}${Math.floor(Math.random() * 99)}${Math.floor(Math.random() * 999999999)}`,
            operator: ['310-410', '310-260', '310-160'][Math.floor(Math.random() * 3)],
            lastSeen: new Date(),
            location: {
              lat: Math.random() * 180 - 90,
              lng: Math.random() * 360 - 180
            },
            deviceType: ['iPhone', 'Samsung', 'Android', 'Unknown'][Math.floor(Math.random() * 4)],
            confidence: Math.floor(Math.random() * 100)
          };
          setImsiTargets(prev => [...prev.slice(-19), newTarget]);
        }

        // Generate signal data
        const newSignal: SignalData = {
          frequency: selectedFreq + (Math.random() - 0.5) * 10,
          strength: Math.floor(Math.random() * 100),
          modulation: ['FM', 'AM', 'FSK', 'PSK', 'QAM'][Math.floor(Math.random() * 5)],
          protocol: Math.random() > 0.5 ? ['GSM', 'LTE', 'WiFi', 'Bluetooth'][Math.floor(Math.random() * 4)] : undefined,
          timestamp: new Date()
        };
        setSignalData(prev => [...prev.slice(-49), newSignal]);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isScanning, scanType, selectedFreq]);

  const startScan = () => {
    setIsScanning(true);
    setCellTowers([]);
    setImsiTargets([]);
    setSignalData([]);
  };

  const stopScan = () => {
    setIsScanning(false);
  };

  const CellularScanner = () => (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button 
          onClick={startScan} 
          disabled={isScanning}
          className="flex-1"
          variant={isScanning ? 'destructive' : 'default'}
        >
          <Antenna className="w-4 h-4 mr-2" />
          {isScanning ? 'Scanning...' : 'Start Cell Scan'}
        </Button>
        <Button onClick={stopScan} disabled={!isScanning} variant="outline">
          <Pause className="w-4 h-4" />
        </Button>
      </div>

      <Card className="bg-terminal-bg border-terminal-border">
        <div className="p-3 border-b border-terminal-border">
          <h4 className="font-bold text-sm text-glow-primary">Cell Tower Detection</h4>
        </div>
        <ScrollArea className="h-40 p-3">
          {cellTowers.map((tower) => (
            <div key={tower.id} className="mb-2 p-2 bg-terminal-surface rounded text-xs">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-mono text-glow-primary">{tower.operator}</div>
                  <div className="text-muted-foreground">{tower.band}</div>
                </div>
                <div className="text-right">
                  <div className="text-status-success">{tower.signal}%</div>
                  <Badge variant="outline" className="text-xs mt-1">
                    {tower.encryption}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </Card>

      <Card className="bg-terminal-bg border-terminal-border">
        <div className="p-3 border-b border-terminal-border">
          <h4 className="font-bold text-sm text-glow-primary">IMSI Catcher Results</h4>
        </div>
        <ScrollArea className="h-48 p-3">
          {imsiTargets.map((target) => (
            <div key={target.imsi} className="mb-2 p-2 bg-terminal-surface rounded text-xs">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-mono text-glow-primary">{target.imsi}</div>
                  <div className="text-muted-foreground">{target.operator}</div>
                  <div className="text-muted-foreground">{target.deviceType}</div>
                </div>
                <div className="text-right">
                  <div className="text-status-warning">{target.confidence}%</div>
                  <div className="text-xs text-muted-foreground">
                    {target.lastSeen.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </Card>
    </div>
  );

  const WiFiScanner = () => (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button 
          onClick={() => {setScanType('wifi'); startScan();}} 
          disabled={isScanning}
          className="flex-1"
        >
          <Wifi className="w-4 h-4 mr-2" />
          WiFi Scan
        </Button>
        <Button variant="outline" className="text-xs">
          Evil Twin
        </Button>
        <Button variant="outline" className="text-xs">
          Deauth
        </Button>
      </div>

      <Card className="bg-terminal-bg border-terminal-border">
        <div className="p-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground">Target SSID</label>
              <Input className="mt-1 bg-terminal-surface" placeholder="WiFi-Network" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Channel</label>
              <Input className="mt-1 bg-terminal-surface" placeholder="Auto" />
            </div>
          </div>
        </div>
      </Card>

      <Card className="bg-terminal-bg border-terminal-border">
        <div className="p-3 border-b border-terminal-border">
          <h4 className="font-bold text-sm text-glow-primary">WiFi Networks</h4>
        </div>
        <ScrollArea className="h-64 p-3">
          <div className="space-y-2 text-xs">
            <div className="p-2 bg-terminal-surface rounded">
              <div className="flex justify-between">
                <span className="font-mono">Home_Network_2.4GHz</span>
                <span className="text-status-success">-45 dBm</span>
              </div>
              <div className="text-muted-foreground">WPA2 • Channel 6 • 2.4GHz</div>
            </div>
            <div className="p-2 bg-terminal-surface rounded">
              <div className="flex justify-between">
                <span className="font-mono">Corporate_Guest</span>
                <span className="text-status-warning">-67 dBm</span>
              </div>
              <div className="text-muted-foreground">Open • Channel 11 • 2.4GHz</div>
            </div>
            <div className="p-2 bg-terminal-surface rounded">
              <div className="flex justify-between">
                <span className="font-mono">NETGEAR_5G</span>
                <span className="text-status-critical">-78 dBm</span>
              </div>
              <div className="text-muted-foreground">WPA3 • Channel 149 • 5GHz</div>
            </div>
          </div>
        </ScrollArea>
      </Card>
    </div>
  );

  const RFAnalyzer = () => (
    <div className="space-y-4">
      <Card className="bg-terminal-bg border-terminal-border">
        <div className="p-3">
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-xs text-muted-foreground">Start Freq (MHz)</label>
              <Input 
                type="number" 
                value={selectedFreq} 
                onChange={(e) => setSelectedFreq(Number(e.target.value))}
                className="mt-1 bg-terminal-surface" 
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">End Freq (MHz)</label>
              <Input className="mt-1 bg-terminal-surface" defaultValue="950" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Step (kHz)</label>
              <Input className="mt-1 bg-terminal-surface" defaultValue="25" />
            </div>
          </div>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={startScan} disabled={isScanning} className="flex-1">
          <Radio className="w-4 h-4 mr-2" />
          {isScanning ? 'Scanning RF...' : 'Start RF Scan'}
        </Button>
        <Button 
          onClick={() => setIsRecording(!isRecording)}
          variant={isRecording ? 'destructive' : 'outline'}
        >
          {isRecording ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
      </div>

      <Card className="bg-terminal-bg border-terminal-border">
        <div className="p-3 border-b border-terminal-border">
          <h4 className="font-bold text-sm text-glow-primary">Signal Analyzer</h4>
        </div>
        <div className="p-3">
          {/* Spectrum waterfall visualization */}
          <div className="h-32 bg-terminal-surface rounded mb-4 flex items-center justify-center">
            <div className="text-center">
              <Radio className="w-8 h-8 text-glow-primary mx-auto mb-2" />
              <div className="text-xs text-muted-foreground">RF Spectrum Waterfall</div>
            </div>
          </div>
          
          <ScrollArea className="h-40">
            {signalData.slice(-10).map((signal, index) => (
              <div key={index} className="mb-2 p-2 bg-terminal-surface rounded text-xs">
                <div className="flex justify-between">
                  <span className="font-mono">{signal.frequency.toFixed(2)} MHz</span>
                  <span className="text-status-success">{signal.strength} dBm</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>{signal.modulation}</span>
                  <span>{signal.protocol || 'Unknown'}</span>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>
      </Card>
    </div>
  );

  const BluetoothScanner = () => (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button onClick={startScan} disabled={isScanning} className="flex-1">
          <Signal className="w-4 h-4 mr-2" />
          BLE Scan
        </Button>
        <Button variant="outline" className="text-xs">
          Beacon
        </Button>
        <Button variant="outline" className="text-xs">
          Sniff
        </Button>
      </div>

      <Card className="bg-terminal-bg border-terminal-border">
        <div className="p-3 border-b border-terminal-border">
          <h4 className="font-bold text-sm text-glow-primary">Bluetooth Devices</h4>
        </div>
        <ScrollArea className="h-64 p-3">
          <div className="space-y-2 text-xs">
            <div className="p-2 bg-terminal-surface rounded">
              <div className="flex justify-between">
                <span className="font-mono">iPhone_12_Pro</span>
                <span className="text-status-success">-32 dBm</span>
              </div>
              <div className="text-muted-foreground">AA:BB:CC:DD:EE:FF • BLE 5.0</div>
            </div>
            <div className="p-2 bg-terminal-surface rounded">
              <div className="flex justify-between">
                <span className="font-mono">Samsung_Buds</span>
                <span className="text-status-warning">-58 dBm</span>
              </div>
              <div className="text-muted-foreground">11:22:33:44:55:66 • Audio</div>
            </div>
            <div className="p-2 bg-terminal-surface rounded">
              <div className="flex justify-between">
                <span className="font-mono">Apple_Watch</span>
                <span className="text-status-info">-45 dBm</span>
              </div>
              <div className="text-muted-foreground">AA:BB:CC:11:22:33 • Wearable</div>
            </div>
          </div>
        </ScrollArea>
      </Card>
    </div>
  );

  return (
    <div className="h-full bg-terminal-bg p-4">
      {/* Mobile Device Header */}
      <Card className="mb-4 bg-terminal-surface border-terminal-border">
        <div className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone className="w-6 h-6 text-glow-primary" />
              <div>
                <h2 className="font-display font-bold text-glow-primary">MOBILE HACKING SUITE</h2>
                <div className="text-xs text-muted-foreground">Advanced RF & Cellular Analysis</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Signal className="w-4 h-4 text-status-success" />
                <span className="text-xs">5G</span>
              </div>
              <div className="flex items-center gap-2">
                <Battery className="w-4 h-4 text-status-warning" />
                <span className="text-xs">{batteryLevel}%</span>
              </div>
              <div className="text-xs font-mono">
                {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Main Interface */}
      <Tabs defaultValue="cellular" className="h-[calc(100%-8rem)]">
        <TabsList className="grid w-full grid-cols-4 bg-terminal-surface">
          <TabsTrigger value="cellular" className="flex items-center gap-2">
            <Antenna className="w-4 h-4" />
            Cellular
          </TabsTrigger>
          <TabsTrigger value="wifi" className="flex items-center gap-2">
            <Wifi className="w-4 h-4" />
            WiFi
          </TabsTrigger>
          <TabsTrigger value="rf" className="flex items-center gap-2">
            <Radio className="w-4 h-4" />
            RF
          </TabsTrigger>
          <TabsTrigger value="bluetooth" className="flex items-center gap-2">
            <Signal className="w-4 h-4" />
            Bluetooth
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cellular" className="mt-4 h-full">
          <CellularScanner />
        </TabsContent>

        <TabsContent value="wifi" className="mt-4 h-full">
          <WiFiScanner />
        </TabsContent>

        <TabsContent value="rf" className="mt-4 h-full">
          <RFAnalyzer />
        </TabsContent>

        <TabsContent value="bluetooth" className="mt-4 h-full">
          <BluetoothScanner />
        </TabsContent>
      </Tabs>
    </div>
  );
};