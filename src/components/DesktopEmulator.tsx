import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Monitor, 
  Terminal, 
  Folder, 
  FileText, 
  Globe, 
  Settings,
  Minimize2,
  Maximize2,
  X,
  Search,
  Wifi,
  Battery,
  Volume2,
  Download,
  Upload,
  Shield,
  Lock,
  Unlock,
  Database,
  Network,
  Cpu,
  HardDrive,
  Activity
} from 'lucide-react';

interface Window {
  id: string;
  title: string;
  content: React.ReactNode;
  isMinimized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

interface DesktopEmulatorProps {
  osType: 'linux' | 'windows';
}

export const DesktopEmulator: React.FC<DesktopEmulatorProps> = ({ osType }) => {
  const [windows, setWindows] = useState<Window[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    'Welcome to WARFARE OS v2.47.1',
    'Classified System - Level 7 Clearance Required',
    'All activities are monitored and logged.',
    '',
    'Available systems: nmap, wireshark, metasploit, burpsuite',
    'Type "help" for available commands',
    ''
  ]);
  const [maxZIndex, setMaxZIndex] = useState(1000);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const createWindow = (title: string, content: React.ReactNode) => {
    const newWindow: Window = {
      id: Date.now().toString(),
      title,
      content,
      isMinimized: false,
      position: { x: Math.random() * 200 + 100, y: Math.random() * 100 + 100 },
      size: { width: 600, height: 400 },
      zIndex: maxZIndex + 1
    };
    
    setWindows(prev => [...prev, newWindow]);
    setMaxZIndex(prev => prev + 1);
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  };

  const minimizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMinimized: !w.isMinimized } : w
    ));
  };

  const bringToFront = (id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, zIndex: maxZIndex + 1 } : w
    ));
    setMaxZIndex(prev => prev + 1);
  };

  const executeCommand = (command: string) => {
    const cmd = command.toLowerCase().trim();
    const output: string[] = [];
    
    switch (cmd) {
      case 'help':
        output.push('Available Commands:');
        output.push('  nmap <target>     - Network discovery and security auditing');
        output.push('  wireshark         - Network protocol analyzer');
        output.push('  metasploit        - Penetration testing framework');
        output.push('  burpsuite         - Web vulnerability scanner');
        output.push('  social-mapper     - Social media reconnaissance');
        output.push('  sherlock          - Hunt usernames across social networks');
        output.push('  theHarvester      - E-mail, subdomain and people names harvester');
        output.push('  clear             - Clear terminal');
        output.push('  exit              - Close terminal');
        break;
        
      case 'clear':
        setTerminalHistory([]);
        return;
        
      case 'exit':
        return;
        
      case 'ls':
        output.push('classified/    tools/    missions/    intel/    logs/');
        break;
        
      case 'whoami':
        output.push('agent-ax2387-delta');
        break;
        
      case 'pwd':
        output.push('/home/agent/warfare-terminal');
        break;
        
      case 'nmap':
        output.push('Usage: nmap <target>');
        output.push('Example: nmap 192.168.1.1');
        break;
        
      case 'wireshark':
        output.push('[WIRESHARK] Launching network analysis interface...');
        createWindow('Wireshark - Network Protocol Analyzer', <WiresharkInterface />);
        break;
        
      case 'metasploit':
        output.push('[METASPLOIT] Initializing penetration testing framework...');
        createWindow('Metasploit Framework', <MetasploitInterface />);
        break;
        
      case 'burpsuite':
        output.push('[BURP SUITE] Starting web vulnerability scanner...');
        createWindow('Burp Suite Professional', <BurpSuiteInterface />);
        break;
        
      default:
        if (cmd.startsWith('nmap ')) {
          const target = cmd.split(' ')[1];
          output.push(`[NMAP] Scanning ${target}...`);
          output.push(`22/tcp   open  ssh`);
          output.push(`80/tcp   open  http`);
          output.push(`443/tcp  open  https`);
          output.push(`3389/tcp open  ms-wbt-server`);
          output.push(`Scan completed in 2.34 seconds`);
        } else {
          output.push(`Command not found: ${command}`);
          output.push('Type "help" for available commands');
        }
        break;
    }
    
    setTerminalHistory(prev => [
      ...prev,
      `$ ${command}`,
      ...output,
      ''
    ]);
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (terminalInput.trim()) {
      executeCommand(terminalInput);
      setTerminalInput('');
    }
  };

  const TerminalWindow = () => (
    <div className="bg-terminal-bg text-glow-primary font-mono h-full flex flex-col">
      <ScrollArea className="flex-1 p-4">
        {terminalHistory.map((line, index) => (
          <div key={index} className="text-sm mb-1">
            {line.startsWith('$') ? (
              <span className="text-glow-primary">{line}</span>
            ) : line.startsWith('[') ? (
              <span className="text-status-warning">{line}</span>
            ) : (
              <span className="text-foreground">{line}</span>
            )}
          </div>
        ))}
      </ScrollArea>
      <form onSubmit={handleTerminalSubmit} className="p-4 border-t border-terminal-border">
        <div className="flex items-center gap-2">
          <span className="text-glow-primary">$</span>
          <Input
            value={terminalInput}
            onChange={(e) => setTerminalInput(e.target.value)}
            className="bg-transparent border-none text-glow-primary font-mono"
            placeholder="Enter command..."
            autoFocus
          />
        </div>
      </form>
    </div>
  );

  const WiresharkInterface = () => (
    <div className="bg-terminal-bg h-full p-4">
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button size="sm" variant="outline">Start Capture</Button>
          <Button size="sm" variant="outline">Stop</Button>
          <Button size="sm" variant="outline">Restart</Button>
        </div>
        <div className="bg-terminal-surface p-3 rounded">
          <div className="text-xs font-mono space-y-1">
            <div className="text-status-info">192.168.1.105 → 8.8.8.8 DNS Standard query A google.com</div>
            <div className="text-status-success">192.168.1.1 → 192.168.1.105 TCP 443 → 52847 [PSH, ACK]</div>
            <div className="text-status-warning">192.168.1.105 → 192.168.1.1 HTTP GET /api/v1/data</div>
            <div className="text-status-critical">UNKNOWN → 192.168.1.105 TCP SYN scan detected</div>
          </div>
        </div>
      </div>
    </div>
  );

  const MetasploitInterface = () => (
    <div className="bg-terminal-bg h-full p-4 font-mono">
      <div className="space-y-2 text-sm">
        <div className="text-glow-primary">msf6 &gt; show exploits</div>
        <div className="space-y-1 text-xs">
          <div>exploit/multi/handler</div>
          <div>exploit/windows/smb/ms17_010_eternalblue</div>
          <div>exploit/linux/http/apache_struts_rce</div>
          <div>exploit/multi/http/struts2_content_type_ognl</div>
        </div>
        <div className="text-glow-primary">msf6 &gt; use exploit/multi/handler</div>
        <div className="text-status-success">msf6 exploit(multi/handler) &gt; set payload windows/meterpreter/reverse_tcp</div>
        <div className="text-status-info">payload =&gt; windows/meterpreter/reverse_tcp</div>
      </div>
    </div>
  );

  const BurpSuiteInterface = () => (
    <div className="bg-terminal-bg h-full p-4">
      <div className="grid grid-cols-3 gap-4 h-full">
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-glow-primary">Target</h3>
          <div className="bg-terminal-surface p-2 rounded text-xs">
            <div>https://target.example.com</div>
            <div className="text-status-warning">Scope: In scope</div>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-glow-primary">Vulnerabilities</h3>
          <div className="space-y-1 text-xs">
            <div className="text-status-critical">SQL Injection - HIGH</div>
            <div className="text-status-warning">XSS Reflected - MEDIUM</div>
            <div className="text-status-info">Missing HTTPS - LOW</div>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-glow-primary">Scanner</h3>
          <Button size="sm" className="w-full">Start Active Scan</Button>
        </div>
      </div>
    </div>
  );

  const desktopApps = [
    { name: 'Terminal', icon: Terminal, action: () => createWindow('Terminal', <TerminalWindow />) },
    { name: 'File Manager', icon: Folder, action: () => createWindow('File Manager', <div className="p-4">File system browser coming soon...</div>) },
    { name: 'Browser', icon: Globe, action: () => createWindow('Secure Browser', <div className="p-4">Tor-enabled browser coming soon...</div>) },
    { name: 'Settings', icon: Settings, action: () => createWindow('System Settings', <div className="p-4">System configuration panel coming soon...</div>) },
    { name: 'Network Monitor', icon: Activity, action: () => createWindow('Network Monitor', <div className="p-4">Real-time network monitoring coming soon...</div>) },
    { name: 'Database', icon: Database, action: () => createWindow('Database Manager', <div className="p-4">Classified database access coming soon...</div>) }
  ];

  return (
    <div className="h-full bg-gradient-to-br from-terminal-bg to-terminal-surface relative overflow-hidden">
      {/* Desktop Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="text-9xl font-display text-glow-primary/10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          WARFARE OS
        </div>
      </div>

      {/* Desktop Icons */}
      <div className="absolute top-8 left-8 grid grid-cols-2 gap-4">
        {desktopApps.map((app, index) => (
          <Button
            key={index}
            variant="ghost"
            className="w-16 h-16 flex flex-col items-center justify-center p-2 hover:bg-terminal-surface/50"
            onClick={app.action}
          >
            <app.icon className="w-6 h-6 mb-1" />
            <span className="text-xs">{app.name}</span>
          </Button>
        ))}
      </div>

      {/* Windows */}
      {windows.map((window) => (
        <Card
          key={window.id}
          className={`absolute bg-terminal-surface border-terminal-border ${
            window.isMinimized ? 'hidden' : ''
          }`}
          style={{
            left: window.position.x,
            top: window.position.y,
            width: window.size.width,
            height: window.size.height,
            zIndex: window.zIndex
          }}
          onClick={() => bringToFront(window.id)}
        >
          {/* Window Title Bar */}
          <div className="flex items-center justify-between p-2 bg-terminal-bg border-b border-terminal-border">
            <span className="text-sm font-mono text-glow-primary">{window.title}</span>
            <div className="flex gap-1">
              <Button size="sm" variant="ghost" className="w-6 h-6 p-0" onClick={() => minimizeWindow(window.id)}>
                <Minimize2 className="w-3 h-3" />
              </Button>
              <Button size="sm" variant="ghost" className="w-6 h-6 p-0" onClick={() => closeWindow(window.id)}>
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
          
          {/* Window Content */}
          <div className="h-[calc(100%-2.5rem)] overflow-hidden">
            {window.content}
          </div>
        </Card>
      ))}

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-terminal-bg border-t border-terminal-border flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Monitor className="w-4 h-4 text-glow-primary" />
            <span className="text-sm font-display text-glow-primary">WARFARE OS</span>
          </div>
          
          {/* Minimized Windows */}
          <div className="flex gap-2">
            {windows.filter(w => w.isMinimized).map((window) => (
              <Button
                key={window.id}
                size="sm"
                variant="outline"
                className="text-xs"
                onClick={() => minimizeWindow(window.id)}
              >
                {window.title}
              </Button>
            ))}
          </div>
        </div>
        
        {/* System Tray */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-status-success" />
            <Battery className="w-4 h-4 text-status-warning" />
            <Volume2 className="w-4 h-4" />
          </div>
          <div className="font-mono text-glow-primary">
            {currentTime.toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
};