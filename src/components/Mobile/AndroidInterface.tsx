import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Smartphone, 
  Wifi, 
  Battery, 
  Signal, 
  Phone, 
  MessageCircle, 
  Camera,
  Mail,
  Settings,
  Search,
  Globe,
  Shield,
  Zap,
  Target,
  Radio,
  Scan,
  Eye,
  Network,
  FileText,
  Download,
  Upload,
  Lock,
  Key,
  Crosshair,
  Activity,
  MapPin,
  Clock,
  Home,
  Grid3X3,
  ArrowLeft,
  Volume2,
  Bluetooth,
  VolumeX,
  Terminal,
  Database
} from 'lucide-react';

interface AndroidApp {
  id: string;
  name: string;
  icon: any;
  category: 'system' | 'social' | 'hacking' | 'tools' | 'security';
  description: string;
  isInstalled: boolean;
}

interface AndroidInterfaceProps {
  onClose: () => void;
}

export const AndroidInterface: React.FC<AndroidInterfaceProps> = ({ onClose }) => {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'app' | 'settings'>('home');
  const [activeApp, setActiveApp] = useState<AndroidApp | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [batteryLevel, setBatteryLevel] = useState(84);
  const [signalStrength, setSignalStrength] = useState(4);
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hackingApps: AndroidApp[] = [
    {
      id: 'termux',
      name: 'Termux',
      icon: Terminal,
      category: 'hacking',
      description: 'Advanced Linux terminal emulator',
      isInstalled: true
    },
    {
      id: 'wireshark',
      name: 'Wireshark',
      icon: Network,
      category: 'hacking',
      description: 'Network protocol analyzer',
      isInstalled: true
    },
    {
      id: 'nmap',
      name: 'Nmap Scanner',
      icon: Scan,
      category: 'hacking',
      description: 'Network discovery and security auditing',
      isInstalled: true
    },
    {
      id: 'metasploit',
      name: 'Metasploit',
      icon: Target,
      category: 'hacking',
      description: 'Penetration testing framework',
      isInstalled: true
    },
    {
      id: 'burpsuite',
      name: 'Burp Suite',
      icon: Shield,
      category: 'hacking',
      description: 'Web application security testing',
      isInstalled: true
    },
    {
      id: 'sqlmap',
      name: 'SQLMap',
      icon: Database,
      category: 'hacking',
      description: 'SQL injection testing tool',
      isInstalled: true
    },
    {
      id: 'aircrack',
      name: 'Aircrack-ng',
      icon: Wifi,
      category: 'hacking',
      description: 'WiFi security assessment',
      isInstalled: true
    },
    {
      id: 'hydra',
      name: 'Hydra',
      icon: Key,
      category: 'hacking',
      description: 'Password cracking tool',
      isInstalled: true
    }
  ];

  const systemApps: AndroidApp[] = [
    {
      id: 'phone',
      name: 'Phone',
      icon: Phone,
      category: 'system',
      description: 'Make calls and manage contacts',
      isInstalled: true
    },
    {
      id: 'messages',
      name: 'Messages',
      icon: MessageCircle,
      category: 'system',
      description: 'Send and receive text messages',
      isInstalled: true
    },
    {
      id: 'camera',
      name: 'Camera',
      icon: Camera,
      category: 'system',
      description: 'Take photos and videos',
      isInstalled: true
    },
    {
      id: 'browser',
      name: 'Tor Browser',
      icon: Globe,
      category: 'security',
      description: 'Anonymous web browsing',
      isInstalled: true
    },
    {
      id: 'email',
      name: 'ProtonMail',
      icon: Mail,
      category: 'security',
      description: 'Encrypted email client',
      isInstalled: true
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: Settings,
      category: 'system',
      description: 'Device settings and configuration',
      isInstalled: true
    }
  ];

  const allApps = [...systemApps, ...hackingApps];

  const renderStatusBar = () => (
    <div className="bg-black text-white px-4 py-1 flex items-center justify-between text-xs">
      <div className="flex items-center gap-1">
        <span>{currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
      
      <div className="flex items-center gap-1">
        {/* Signal bars */}
        <div className="flex items-end gap-px">
          {[1, 2, 3, 4].map(bar => (
            <div
              key={bar}
              className={`w-1 ${bar <= signalStrength ? 'bg-white' : 'bg-gray-600'}`}
              style={{ height: `${bar * 2 + 2}px` }}
            />
          ))}
        </div>
        
        {wifiEnabled && <Wifi className="w-3 h-3" />}
        {bluetoothEnabled && <Bluetooth className="w-3 h-3" />}
        
        <div className="flex items-center gap-1">
          <Battery className="w-3 h-3" />
          <span>{batteryLevel}%</span>
        </div>
      </div>
    </div>
  );

  const renderHomeScreen = () => (
    <div className="flex-1 bg-gradient-to-br from-gray-900 via-blue-900 to-black p-4">
      {/* Quick Access Widgets */}
      <div className="mb-6">
        <Card className="bg-black/50 border-green-500/30 p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-green-400 font-bold">TACTICAL STATUS</h3>
            <Badge className="bg-green-500/20 text-green-400 border-green-500">OPERATIONAL</Badge>
          </div>
          <div className="grid grid-cols-3 gap-4 text-xs">
            <div className="text-center">
              <Activity className="w-4 h-4 mx-auto mb-1 text-green-400" />
              <div>Network</div>
              <div className="text-green-400">SECURE</div>
            </div>
            <div className="text-center">
              <Shield className="w-4 h-4 mx-auto mb-1 text-blue-400" />
              <div>Encryption</div>
              <div className="text-blue-400">AES-256</div>
            </div>
            <div className="text-center">
              <MapPin className="w-4 h-4 mx-auto mb-1 text-yellow-400" />
              <div>Location</div>
              <div className="text-yellow-400">MASKED</div>
            </div>
          </div>
        </Card>
        
        <Card className="bg-black/50 border-red-500/30 p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-red-400 font-bold">ACTIVE OPERATIONS</h3>
            <Badge className="bg-red-500/20 text-red-400 border-red-500">3 RUNNING</Badge>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span>WiFi Reconnaissance</span>
              <span className="text-green-400">ACTIVE</span>
            </div>
            <div className="flex justify-between">
              <span>Network Monitoring</span>
              <span className="text-green-400">ACTIVE</span>
            </div>
            <div className="flex justify-between">
              <span>Signal Intelligence</span>
              <span className="text-yellow-400">STANDBY</span>
            </div>
          </div>
        </Card>
      </div>

      {/* App Grid */}
      <div className="grid grid-cols-4 gap-6">
        {allApps.slice(0, 16).map(app => (
          <div
            key={app.id}
            className="flex flex-col items-center cursor-pointer group"
            onClick={() => {
              setActiveApp(app);
              setCurrentScreen('app');
            }}
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform border border-gray-600">
              <app.icon className={`w-6 h-6 ${
                app.category === 'hacking' ? 'text-red-400' : 
                app.category === 'security' ? 'text-green-400' : 
                'text-blue-400'
              }`} />
            </div>
            <span className="text-xs text-white text-center font-medium">
              {app.name}
            </span>
          </div>
        ))}
      </div>

      {/* Navigation Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-4">
        <div className="flex justify-center space-x-12">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentScreen('home')}
            className="p-2"
          >
            <Home className="w-6 h-6 text-white" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentScreen('app')}
            className="p-2"
          >
            <Grid3X3 className="w-6 h-6 text-white" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </Button>
        </div>
      </div>
    </div>
  );

  const renderAppScreen = () => {
    if (!activeApp) return null;

    const appContent = {
      termux: (
        <div className="bg-black text-green-400 font-mono text-sm p-4 h-full overflow-auto">
          <div className="mb-2">Termux v0.118.0 - Advanced Terminal</div>
          <div className="mb-2">~ $ whoami</div>
          <div className="mb-2 text-white">tactical-operator</div>
          <div className="mb-2">~ $ uname -a</div>
          <div className="mb-4 text-white">Linux localhost 5.4.0 #1 SMP PREEMPT aarch64 Android</div>
          
          <div className="mb-2">Available packages:</div>
          <div className="text-white space-y-1 text-xs">
            <div>• nmap - Network mapping and security scanner</div>
            <div>• python - Python programming language</div>
            <div>• nodejs - JavaScript runtime</div>
            <div>• git - Version control system</div>
            <div>• curl - Command line HTTP client</div>
            <div>• wget - Network file retriever</div>
            <div>• openssh - Secure shell client/server</div>
            <div>• hydra - Password cracking tool</div>
          </div>
          
          <div className="mt-4 mb-2">~ $ nmap -sS -O 192.168.1.1/24</div>
          <div className="text-white text-xs">
            <div>Starting Nmap scan...</div>
            <div>Host 192.168.1.1 is up (0.001s latency)</div>
            <div>22/tcp open ssh</div>
            <div>80/tcp open http</div>
            <div>443/tcp open https</div>
          </div>
          
          <div className="mt-4">
            <span>~ $ </span>
            <span className="animate-pulse">█</span>
          </div>
        </div>
      ),
      
      nmap: (
        <div className="bg-gray-900 text-green-400 p-4 h-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Network Scanner</h2>
            <Badge className="bg-green-500/20 text-green-400">SCANNING</Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Card className="bg-black/50 p-3">
              <div className="text-xs text-gray-400 mb-1">Target Network</div>
              <div className="text-white">192.168.1.0/24</div>
            </Card>
            <Card className="bg-black/50 p-3">
              <div className="text-xs text-gray-400 mb-1">Scan Type</div>
              <div className="text-white">SYN Stealth</div>
            </Card>
          </div>
          
          <ScrollArea className="h-64">
            <div className="space-y-2 text-xs">
              {[
                { ip: '192.168.1.1', status: 'up', ports: ['22/tcp ssh', '80/tcp http', '443/tcp https'] },
                { ip: '192.168.1.105', status: 'up', ports: ['135/tcp msrpc', '445/tcp microsoft-ds'] },
                { ip: '192.168.1.110', status: 'up', ports: ['22/tcp ssh', '3389/tcp rdp'] }
              ].map((host, index) => (
                <Card key={index} className="bg-black/30 p-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white font-mono">{host.ip}</span>
                    <Badge className="bg-green-500/20 text-green-400">{host.status}</Badge>
                  </div>
                  <div className="space-y-1">
                    {host.ports.map((port, portIndex) => (
                      <div key={portIndex} className="text-gray-300">{port}</div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      ),
      
      browser: (
        <div className="bg-gray-900 text-white h-full">
          <div className="bg-purple-900 p-2 flex items-center gap-2">
            <Shield className="w-4 h-4 text-purple-400" />
            <span className="text-sm">Tor Browser - Anonymous Mode</span>
          </div>
          
          <div className="p-4">
            <div className="bg-black p-4 rounded mb-4">
              <h2 className="text-purple-400 text-lg mb-2">🧅 Welcome to Tor</h2>
              <p className="text-sm mb-4">You are now browsing anonymously</p>
              
              <div className="grid grid-cols-1 gap-2 text-xs">
                <div className="bg-purple-900/30 p-2 rounded">
                  <strong>Current Circuit:</strong> USA → Germany → Netherlands
                </div>
                <div className="bg-green-900/30 p-2 rounded">
                  <strong>IP Address:</strong> 185.220.101.32 (Masked)
                </div>
                <div className="bg-blue-900/30 p-2 rounded">
                  <strong>Security Level:</strong> Safest
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start text-sm">
                🔍 DuckDuckGo Onion Service
              </Button>
              <Button variant="outline" className="w-full justify-start text-sm">
                📧 ProtonMail Onion Service
              </Button>
              <Button variant="outline" className="w-full justify-start text-sm">
                📰 BBC News Onion Service
              </Button>
            </div>
          </div>
        </div>
      )
    };

    return (
      <div className="flex-1 flex flex-col">
        <div className="bg-gray-800 p-2 flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentScreen('home')}
            className="p-1"
          >
            <ArrowLeft className="w-4 h-4 text-white" />
          </Button>
          <activeApp.icon className="w-5 h-5 text-white" />
          <span className="text-white font-medium">{activeApp.name}</span>
        </div>
        
        <div className="flex-1">
          {appContent[activeApp.id as keyof typeof appContent] || (
            <div className="flex items-center justify-center h-full text-gray-400">
              <div className="text-center">
                <activeApp.icon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">{activeApp.name}</h3>
                <p className="text-sm">{activeApp.description}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-80 h-[600px] bg-black rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-800 mx-auto">
      {renderStatusBar()}
      
      {currentScreen === 'home' && renderHomeScreen()}
      {currentScreen === 'app' && renderAppScreen()}
    </div>
  );
};