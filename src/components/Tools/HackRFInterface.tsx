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
  Radio, 
  Signal, 
  Activity,
  Play,
  Pause,
  RotateCcw,
  Download,
  Upload,
  Settings,
  Power,
  Zap,
  Eye,
  Target,
  Scan,
  Database,
  Shield,
  Wifi,
  Bluetooth,
  Antenna,
  Volume2,
  VolumeX
} from 'lucide-react';

interface HackRFState {
  isOn: boolean;
  centerFreq: number;
  sampleRate: number;
  bandwidth: number;
  gainRx: number;
  gainTx: number;
  mode: 'rx' | 'tx' | 'spectrum';
  isRecording: boolean;
  isTransmitting: boolean;
}

interface SpectrumData {
  frequency: number;
  power: number;
  timestamp: Date;
}

interface RecordedSignal {
  id: string;
  frequency: number;
  duration: number;
  sampleRate: number;
  filename: string;
  size: number;
  timestamp: Date;
}

export const HackRFInterface: React.FC = () => {
  const [hackrfState, setHackrfState] = useState<HackRFState>({
    isOn: true,
    centerFreq: 915.0,
    sampleRate: 2.0,
    bandwidth: 1.75,
    gainRx: 32,
    gainTx: 0,
    mode: 'rx',
    isRecording: false,
    isTransmitting: false
  });

  const [spectrumData, setSpectrumData] = useState<SpectrumData[]>([]);
  const [recordings, setRecordings] = useState<RecordedSignal[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedRecording, setSelectedRecording] = useState<RecordedSignal | null>(null);

  // Simulate real-time spectrum data
  useEffect(() => {
    const interval = setInterval(() => {
      if (isScanning && hackrfState.isOn && hackrfState.mode === 'spectrum') {
        const newDataPoints: SpectrumData[] = [];
        const startFreq = hackrfState.centerFreq - (hackrfState.sampleRate / 2);
        
        for (let i = 0; i < 100; i++) {
          const freq = startFreq + (hackrfState.sampleRate * i / 100);
          const basePower = -80 + Math.random() * 20;
          
          // Add some peaks for realism
          let power = basePower;
          if (Math.abs(freq - 433.92) < 0.1) power += 40; // 433 MHz ISM band
          if (Math.abs(freq - 868.0) < 0.1) power += 30;  // 868 MHz ISM band
          if (Math.abs(freq - 915.0) < 0.1) power += 35;  // 915 MHz ISM band
          
          newDataPoints.push({
            frequency: freq,
            power: power + (Math.random() - 0.5) * 10,
            timestamp: new Date()
          });
        }
        
        setSpectrumData(newDataPoints);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [isScanning, hackrfState]);

  const startRecording = () => {
    if (hackrfState.isOn && hackrfState.mode === 'rx') {
      setHackrfState(prev => ({ ...prev, isRecording: true }));
      
      // Simulate recording completion after 5 seconds
      setTimeout(() => {
        const newRecording: RecordedSignal = {
          id: Date.now().toString(),
          frequency: hackrfState.centerFreq,
          duration: 5,
          sampleRate: hackrfState.sampleRate,
          filename: `capture_${hackrfState.centerFreq.toFixed(1)}MHz_${Date.now()}.iq`,
          size: Math.floor(hackrfState.sampleRate * 5 * 2 * 4), // Complex samples, 4 bytes each
          timestamp: new Date()
        };
        
        setRecordings(prev => [newRecording, ...prev]);
        setHackrfState(prev => ({ ...prev, isRecording: false }));
      }, 5000);
    }
  };

  const stopRecording = () => {
    setHackrfState(prev => ({ ...prev, isRecording: false }));
  };

  const transmitRecording = (recording: RecordedSignal) => {
    setHackrfState(prev => ({ 
      ...prev, 
      isTransmitting: true,
      centerFreq: recording.frequency,
      sampleRate: recording.sampleRate
    }));
    
    setTimeout(() => {
      setHackrfState(prev => ({ ...prev, isTransmitting: false }));
    }, recording.duration * 1000);
  };

  const ReceiverInterface = () => (
    <div className="space-y-4">
      <Card className="bg-terminal-bg border-terminal-border">
        <div className="p-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground">Center Frequency (MHz)</label>
              <Input
                type="number"
                value={hackrfState.centerFreq}
                onChange={(e) => setHackrfState(prev => ({ ...prev, centerFreq: parseFloat(e.target.value) || 915 }))}
                className="mt-1 bg-terminal-surface font-mono"
                step="0.1"
                min="1"
                max="6000"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Sample Rate (MHz)</label>
              <Input
                type="number"
                value={hackrfState.sampleRate}
                onChange={(e) => setHackrfState(prev => ({ ...prev, sampleRate: parseFloat(e.target.value) || 2 }))}
                className="mt-1 bg-terminal-surface font-mono"
                step="0.1"
                min="0.1"
                max="20"
              />
            </div>
          </div>
          
          <div className="mt-4">
            <label className="text-xs text-muted-foreground">RX Gain: {hackrfState.gainRx} dB</label>
            <Slider
              value={[hackrfState.gainRx]}
              onValueChange={(value) => setHackrfState(prev => ({ ...prev, gainRx: value[0] }))}
              min={0}
              max={62}
              step={2}
              className="mt-1"
            />
          </div>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button 
          onClick={startRecording} 
          disabled={!hackrfState.isOn || hackrfState.isRecording || hackrfState.mode !== 'rx'}
          className="flex-1"
          variant={hackrfState.isRecording ? 'destructive' : 'default'}
        >
          <Radio className="w-4 h-4 mr-2" />
          {hackrfState.isRecording ? 'Recording...' : 'Start Recording'}
        </Button>
        <Button onClick={stopRecording} disabled={!hackrfState.isRecording} variant="outline">
          <Pause className="w-4 h-4" />
        </Button>
      </div>

      <Card className="bg-terminal-bg border-terminal-border">
        <div className="p-3 border-b border-terminal-border">
          <h4 className="font-bold text-sm text-glow-primary">Recorded Signals</h4>
        </div>
        <ScrollArea className="h-64 p-3">
          {recordings.map((recording) => (
            <div 
              key={recording.id} 
              className={`mb-2 p-3 rounded cursor-pointer transition-colors ${
                selectedRecording?.id === recording.id 
                  ? 'bg-glow-primary/20 border border-glow-primary' 
                  : 'bg-terminal-surface hover:bg-terminal-surface/80'
              }`}
              onClick={() => setSelectedRecording(recording)}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-mono text-sm text-glow-primary">
                    {recording.frequency.toFixed(1)} MHz
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {recording.duration}s • {(recording.size / 1024 / 1024).toFixed(1)} MB
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {recording.sampleRate} MS/s
                </Badge>
              </div>
              
              <div className="text-xs text-muted-foreground mb-2">
                {recording.filename}
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="text-xs">
                  <Play className="w-3 h-3 mr-1" />
                  Analyze
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    transmitRecording(recording);
                  }}
                  disabled={hackrfState.isTransmitting}
                >
                  <Zap className="w-3 h-3 mr-1" />
                  Replay
                </Button>
                <Button size="sm" variant="outline" className="text-xs">
                  <Download className="w-3 h-3 mr-1" />
                  Export
                </Button>
              </div>
            </div>
          ))}
        </ScrollArea>
      </Card>
    </div>
  );

  const TransmitterInterface = () => (
    <div className="space-y-4">
      <Card className="bg-terminal-bg border-terminal-border">
        <div className="p-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground">TX Frequency (MHz)</label>
              <Input
                type="number"
                value={hackrfState.centerFreq}
                onChange={(e) => setHackrfState(prev => ({ ...prev, centerFreq: parseFloat(e.target.value) || 915 }))}
                className="mt-1 bg-terminal-surface font-mono"
                step="0.1"
                min="1"
                max="6000"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">TX Power</label>
              <Input
                type="number"
                value={hackrfState.gainTx}
                onChange={(e) => setHackrfState(prev => ({ ...prev, gainTx: parseInt(e.target.value) || 0 }))}
                className="mt-1 bg-terminal-surface font-mono"
                min="0"
                max="47"
              />
            </div>
          </div>
        </div>
      </Card>

      <Card className="bg-terminal-bg border-terminal-border">
        <div className="p-3 border-b border-terminal-border">
          <h4 className="font-bold text-sm text-glow-primary">Signal Generator</h4>
        </div>
        <div className="p-3 space-y-3">
          <div className="grid grid-cols-3 gap-2">
            <Button variant="outline" className="text-xs">
              CW Tone
            </Button>
            <Button variant="outline" className="text-xs">
              AM
            </Button>
            <Button variant="outline" className="text-xs">
              FM
            </Button>
            <Button variant="outline" className="text-xs">
              FSK
            </Button>
            <Button variant="outline" className="text-xs">
              ASK
            </Button>
            <Button variant="outline" className="text-xs">
              Custom
            </Button>
          </div>
          
          <div>
            <label className="text-xs text-muted-foreground">Modulation Parameters</label>
            <textarea 
              className="w-full mt-1 bg-terminal-surface border border-terminal-border rounded p-2 text-xs font-mono"
              rows={4}
              placeholder="Enter signal parameters or upload IQ file..."
            />
          </div>
          
          <Button 
            className="w-full"
            disabled={hackrfState.isTransmitting}
            onClick={() => setHackrfState(prev => ({ ...prev, isTransmitting: true }))}
          >
            <Zap className="w-4 h-4 mr-2" />
            {hackrfState.isTransmitting ? 'Transmitting...' : 'Start Transmission'}
          </Button>
        </div>
      </Card>
    </div>
  );

  const SpectrumAnalyzer = () => (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button 
          onClick={() => setIsScanning(!isScanning)} 
          disabled={!hackrfState.isOn}
          className="flex-1"
          variant={isScanning ? 'destructive' : 'default'}
        >
          <Activity className="w-4 h-4 mr-2" />
          {isScanning ? 'Stop Scan' : 'Start Spectrum Scan'}
        </Button>
        <Button variant="outline">
          <Settings className="w-4 h-4" />
        </Button>
      </div>

      <Card className="bg-terminal-bg border-terminal-border">
        <div className="p-3 border-b border-terminal-border">
          <h4 className="font-bold text-sm text-glow-primary">Spectrum Display</h4>
          <div className="text-xs text-muted-foreground">
            {hackrfState.centerFreq.toFixed(1)} MHz ± {(hackrfState.sampleRate/2).toFixed(1)} MHz
          </div>
        </div>
        <div className="p-3">
          {/* Simplified spectrum visualization */}
          <div className="h-48 bg-terminal-surface rounded relative">
            {isScanning ? (
              <div className="absolute inset-0 flex items-end justify-around p-2">
                {Array.from({length: 50}, (_, i) => {
                  const height = Math.random() * 80 + 10;
                  const isSignal = Math.random() > 0.8;
                  return (
                    <div 
                      key={i}
                      className={`w-1 rounded-t ${isSignal ? 'bg-glow-primary' : 'bg-status-info'}`}
                      style={{ height: `${height}%` }}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Activity className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <div className="text-xs text-muted-foreground">Start scan to view spectrum</div>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>{(hackrfState.centerFreq - hackrfState.sampleRate/2).toFixed(1)} MHz</span>
            <span>{hackrfState.centerFreq.toFixed(1)} MHz</span>
            <span>{(hackrfState.centerFreq + hackrfState.sampleRate/2).toFixed(1)} MHz</span>
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="h-full bg-terminal-bg p-4">
      {/* HackRF Header */}
      <Card className="mb-4 bg-terminal-surface border-terminal-border">
        <div className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Radio className={`w-6 h-6 ${hackrfState.isOn ? 'text-glow-primary' : 'text-muted-foreground'}`} />
                {(hackrfState.isRecording || hackrfState.isTransmitting) && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-status-critical rounded-full animate-pulse" />
                )}
              </div>
              <div>
                <h2 className="font-display font-bold text-glow-primary">HACKRF ONE</h2>
                <div className="text-xs text-muted-foreground">Software Defined Radio • 1 MHz - 6 GHz</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-xs font-mono">
                <div>Center: {hackrfState.centerFreq.toFixed(1)} MHz</div>
                <div>Rate: {hackrfState.sampleRate.toFixed(1)} MS/s</div>
              </div>
              <Badge variant={hackrfState.isOn ? 'default' : 'secondary'}>
                {hackrfState.isOn ? 'ONLINE' : 'OFFLINE'}
              </Badge>
              <Button 
                size="sm" 
                variant={hackrfState.isOn ? 'destructive' : 'default'}
                onClick={() => setHackrfState(prev => ({ ...prev, isOn: !prev.isOn }))}
              >
                <Power className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Main Interface */}
      <Tabs 
        value={hackrfState.mode} 
        onValueChange={(value) => setHackrfState(prev => ({ ...prev, mode: value as any }))}
        className="h-[calc(100%-8rem)]"
      >
        <TabsList className="grid w-full grid-cols-3 bg-terminal-surface">
          <TabsTrigger value="rx" className="flex items-center gap-2">
            <Radio className="w-4 h-4" />
            Receiver
          </TabsTrigger>
          <TabsTrigger value="tx" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Transmitter
          </TabsTrigger>
          <TabsTrigger value="spectrum" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Spectrum
          </TabsTrigger>
        </TabsList>

        <TabsContent value="rx" className="mt-4 h-full">
          <ReceiverInterface />
        </TabsContent>

        <TabsContent value="tx" className="mt-4 h-full">
          <TransmitterInterface />
        </TabsContent>

        <TabsContent value="spectrum" className="mt-4 h-full">
          <SpectrumAnalyzer />
        </TabsContent>
      </Tabs>
    </div>
  );
};