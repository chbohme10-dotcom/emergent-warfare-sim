import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { 
  Zap, 
  Radio, 
  Wifi, 
  Bluetooth,
  Nfc,
  Play,
  Pause,
  RotateCcw,
  Download,
  Upload,
  Settings,
  Power,
  Signal,
  Volume2,
  Eye,
  Target,
  Scan,
  Database,
  Shield,
  Lock,
  Unlock,
  Activity,
  HardDrive,
  Smartphone
} from 'lucide-react';

interface FlipperState {
  isOn: boolean;
  frequency: number;
  power: number;
  mode: 'sub1ghz' | 'nfc' | 'rfid' | 'infrared' | 'badusb' | 'ibutton' | 'gpio';
  isTransmitting: boolean;
  batteryLevel: number;
}

interface RFSignal {
  frequency: number;
  protocol: string;
  data: string;
  timestamp: Date;
  strength: number;
}

interface NFCCard {
  uid: string;
  type: string;
  data?: string;
  writable: boolean;
}

export const FlipperZeroInterface: React.FC = () => {
  const [flipperState, setFlipperState] = useState<FlipperState>({
    isOn: true,
    frequency: 433.92,
    power: 50,
    mode: 'sub1ghz',
    isTransmitting: false,
    batteryLevel: 73
  });

  const [capturedSignals, setCapturedSignals] = useState<RFSignal[]>([]);
  const [nfcCards, setNfcCards] = useState<NFCCard[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedSignal, setSelectedSignal] = useState<RFSignal | null>(null);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (isScanning && flipperState.isOn) {
        // Generate random signals based on mode
        if (flipperState.mode === 'sub1ghz' && Math.random() > 0.7) {
          const protocols = ['RAW', 'Princeton', 'KeeLoq', 'Star Line', 'Nice FLO'];
          const newSignal: RFSignal = {
            frequency: flipperState.frequency + (Math.random() - 0.5) * 2,
            protocol: protocols[Math.floor(Math.random() * protocols.length)],
            data: Array.from({length: 16}, () => Math.floor(Math.random() * 16).toString(16)).join(''),
            timestamp: new Date(),
            strength: Math.floor(Math.random() * 100)
          };
          setCapturedSignals(prev => [...prev.slice(-19), newSignal]);
        }
        
        if (flipperState.mode === 'nfc' && Math.random() > 0.8) {
          const cardTypes = ['MIFARE Classic', 'MIFARE Ultralight', 'NTAG213', 'ISO14443A'];
          const newCard: NFCCard = {
            uid: Array.from({length: 8}, () => Math.floor(Math.random() * 16).toString(16)).join(':'),
            type: cardTypes[Math.floor(Math.random() * cardTypes.length)],
            writable: Math.random() > 0.5,
            data: Math.random() > 0.5 ? 'Access Card Data' : undefined
          };
          setNfcCards(prev => [...prev.slice(-9), newCard]);
        }
      }
      
      // Simulate battery drain
      setFlipperState(prev => ({
        ...prev,
        batteryLevel: Math.max(0, prev.batteryLevel - (prev.isOn ? 0.01 : 0))
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [isScanning, flipperState.isOn, flipperState.mode, flipperState.frequency]);

  const togglePower = () => {
    setFlipperState(prev => ({ ...prev, isOn: !prev.isOn }));
    if (flipperState.isOn) {
      setIsScanning(false);
    }
  };

  const startScan = () => {
    if (flipperState.isOn) {
      setIsScanning(true);
      setCapturedSignals([]);
      setNfcCards([]);
    }
  };

  const stopScan = () => {
    setIsScanning(false);
  };

  const transmitSignal = (signal: RFSignal) => {
    setFlipperState(prev => ({ ...prev, isTransmitting: true }));
    setTimeout(() => {
      setFlipperState(prev => ({ ...prev, isTransmitting: false }));
    }, 2000);
  };

  const Sub1GHzInterface = () => (
    <div className="space-y-4">
      <Card className="bg-terminal-bg border-terminal-border">
        <div className="p-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground">Frequency (MHz)</label>
              <div className="mt-1">
                <Slider
                  value={[flipperState.frequency]}
                  onValueChange={(value) => setFlipperState(prev => ({ ...prev, frequency: value[0] }))}
                  min={300}
                  max={928}
                  step={0.01}
                  className="w-full"
                />
                <div className="text-xs text-center mt-1 font-mono">
                  {flipperState.frequency.toFixed(2)} MHz
                </div>
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">TX Power</label>
              <div className="mt-1">
                <Slider
                  value={[flipperState.power]}
                  onValueChange={(value) => setFlipperState(prev => ({ ...prev, power: value[0] }))}
                  min={0}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="text-xs text-center mt-1">{flipperState.power}%</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button 
          onClick={startScan} 
          disabled={!flipperState.isOn || isScanning}
          className="flex-1"
        >
          <Scan className="w-4 h-4 mr-2" />
          {isScanning ? 'Scanning...' : 'Start Scan'}
        </Button>
        <Button onClick={stopScan} disabled={!isScanning} variant="outline">
          <Pause className="w-4 h-4" />
        </Button>
        <Button variant="outline">
          <Download className="w-4 h-4" />
        </Button>
      </div>

      <Card className="bg-terminal-bg border-terminal-border">
        <div className="p-3 border-b border-terminal-border">
          <h4 className="font-bold text-sm text-glow-primary">Captured Signals</h4>
        </div>
        <ScrollArea className="h-64 p-3">
          {capturedSignals.map((signal, index) => (
            <div 
              key={index} 
              className={`mb-2 p-2 rounded cursor-pointer transition-colors ${
                selectedSignal === signal 
                  ? 'bg-glow-primary/20 border border-glow-primary' 
                  : 'bg-terminal-surface hover:bg-terminal-surface/80'
              }`}
              onClick={() => setSelectedSignal(signal)}
            >
              <div className="text-xs">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-mono text-glow-primary">{signal.frequency.toFixed(2)} MHz</span>
                  <span className="text-status-success">{signal.strength} dBm</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">{signal.protocol}</span>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="h-6 text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      transmitSignal(signal);
                    }}
                    disabled={flipperState.isTransmitting}
                  >
                    <Zap className="w-3 h-3 mr-1" />
                    TX
                  </Button>
                </div>
                <div className="font-mono text-xs text-muted-foreground mt-1 break-all">
                  {signal.data}
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </Card>
    </div>
  );

  const NFCInterface = () => (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button 
          onClick={() => {
            setFlipperState(prev => ({ ...prev, mode: 'nfc' }));
            startScan();
          }} 
          disabled={!flipperState.isOn || isScanning}
          className="flex-1"
        >
          <Nfc className="w-4 h-4 mr-2" />
          {isScanning ? 'Reading NFC...' : 'Read NFC'}
        </Button>
        <Button variant="outline">
          <Upload className="w-4 h-4" />
          Write
        </Button>
        <Button variant="outline">
          <RotateCcw className="w-4 h-4" />
          Clone
        </Button>
      </div>

      <Card className="bg-terminal-bg border-terminal-border">
        <div className="p-3 border-b border-terminal-border">
          <h4 className="font-bold text-sm text-glow-primary">NFC Cards</h4>
        </div>
        <ScrollArea className="h-64 p-3">
          {nfcCards.map((card, index) => (
            <div key={index} className="mb-3 p-3 bg-terminal-surface rounded">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-mono text-sm text-glow-primary">{card.uid}</div>
                  <div className="text-xs text-muted-foreground">{card.type}</div>
                </div>
                <div className="flex gap-1">
                  <Badge variant={card.writable ? 'default' : 'secondary'} className="text-xs">
                    {card.writable ? 'Writable' : 'Read Only'}
                  </Badge>
                </div>
              </div>
              {card.data && (
                <div className="text-xs bg-terminal-bg p-2 rounded font-mono">
                  {card.data}
                </div>
              )}
              <div className="flex gap-2 mt-2">
                <Button size="sm" variant="outline" className="text-xs">
                  <Download className="w-3 h-3 mr-1" />
                  Save
                </Button>
                <Button size="sm" variant="outline" className="text-xs">
                  <RotateCcw className="w-3 h-3 mr-1" />
                  Clone
                </Button>
              </div>
            </div>
          ))}
        </ScrollArea>
      </Card>
    </div>
  );

  const BadUSBInterface = () => (
    <div className="space-y-4">
      <Card className="bg-terminal-bg border-terminal-border">
        <div className="p-3 border-b border-terminal-border">
          <h4 className="font-bold text-sm text-glow-primary">BadUSB Payloads</h4>
        </div>
        <div className="p-3 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="text-xs">
              <Smartphone className="w-3 h-3 mr-1" />
              WiFi Grabber
            </Button>
            <Button variant="outline" className="text-xs">
              <Shield className="w-3 h-3 mr-1" />
              Disable AV
            </Button>
            <Button variant="outline" className="text-xs">
              <Database className="w-3 h-3 mr-1" />
              Exfiltrate Data
            </Button>
            <Button variant="outline" className="text-xs">
              <Lock className="w-3 h-3 mr-1" />
              Lock Screen
            </Button>
          </div>
          
          <div className="border border-terminal-border rounded p-3">
            <label className="text-xs text-muted-foreground">Custom Payload</label>
            <textarea 
              className="w-full mt-1 bg-terminal-surface border border-terminal-border rounded p-2 text-xs font-mono"
              rows={6}
              placeholder="DELAY 1000&#10;GUI r&#10;DELAY 500&#10;STRING cmd&#10;ENTER&#10;DELAY 750&#10;STRING echo Hello World&#10;ENTER"
            />
          </div>
          
          <Button className="w-full">
            <Zap className="w-4 h-4 mr-2" />
            Execute Payload
          </Button>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="h-full bg-terminal-bg p-4">
      {/* Flipper Zero Header */}
      <Card className="mb-4 bg-terminal-surface border-terminal-border">
        <div className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Zap className={`w-6 h-6 ${flipperState.isOn ? 'text-glow-primary' : 'text-muted-foreground'}`} />
                {flipperState.isTransmitting && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-status-critical rounded-full animate-pulse" />
                )}
              </div>
              <div>
                <h2 className="font-display font-bold text-glow-primary">FLIPPER ZERO</h2>
                <div className="text-xs text-muted-foreground">Multi-tool for pentesters & geeks</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Signal className={`w-4 h-4 ${flipperState.isOn ? 'text-status-success' : 'text-muted-foreground'}`} />
                <span className="text-xs">{flipperState.mode.toUpperCase()}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-4 h-2 rounded ${
                  flipperState.batteryLevel > 50 ? 'bg-status-success' : 
                  flipperState.batteryLevel > 20 ? 'bg-status-warning' : 'bg-status-critical'
                }`} />
                <span className="text-xs">{flipperState.batteryLevel.toFixed(0)}%</span>
              </div>
              <Button 
                size="sm" 
                variant={flipperState.isOn ? 'destructive' : 'default'}
                onClick={togglePower}
              >
                <Power className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Main Interface */}
      <Tabs 
        value={flipperState.mode} 
        onValueChange={(value) => setFlipperState(prev => ({ ...prev, mode: value as any }))}
        className="h-[calc(100%-8rem)]"
      >
        <TabsList className="grid w-full grid-cols-6 bg-terminal-surface">
          <TabsTrigger value="sub1ghz" className="text-xs">
            <Radio className="w-3 h-3 mr-1" />
            Sub-1GHz
          </TabsTrigger>
          <TabsTrigger value="nfc" className="text-xs">
            <Nfc className="w-3 h-3 mr-1" />
            NFC
          </TabsTrigger>
          <TabsTrigger value="rfid" className="text-xs">
            <Shield className="w-3 h-3 mr-1" />
            RFID
          </TabsTrigger>
          <TabsTrigger value="infrared" className="text-xs">
            <Eye className="w-3 h-3 mr-1" />
            Infrared
          </TabsTrigger>
          <TabsTrigger value="badusb" className="text-xs">
            <Smartphone className="w-3 h-3 mr-1" />
            BadUSB
          </TabsTrigger>
          <TabsTrigger value="gpio" className="text-xs">
            <Activity className="w-3 h-3 mr-1" />
            GPIO
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sub1ghz" className="mt-4 h-full">
          <Sub1GHzInterface />
        </TabsContent>

        <TabsContent value="nfc" className="mt-4 h-full">
          <NFCInterface />
        </TabsContent>

        <TabsContent value="rfid" className="mt-4 h-full">
          <div className="p-8 text-center text-muted-foreground">
            RFID interface coming soon...
          </div>
        </TabsContent>

        <TabsContent value="infrared" className="mt-4 h-full">
          <div className="p-8 text-center text-muted-foreground">
            Infrared interface coming soon...
          </div>
        </TabsContent>

        <TabsContent value="badusb" className="mt-4 h-full">
          <BadUSBInterface />
        </TabsContent>

        <TabsContent value="gpio" className="mt-4 h-full">
          <div className="p-8 text-center text-muted-foreground">
            GPIO interface coming soon...
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};