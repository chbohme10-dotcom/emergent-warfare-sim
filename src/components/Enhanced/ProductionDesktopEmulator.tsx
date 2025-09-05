import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BrowserApp } from '@/components/Desktop/BrowserApp';
import { EmailApp } from '@/components/Desktop/EmailApp';
import { 
  Monitor, 
  Terminal, 
  FileText, 
  Folder, 
  Settings, 
  Wifi, 
  Network,
  Shield,
  Search,
  Download,
  Upload,
  Play,
  Pause,
  Square,
  Minimize2,
  Maximize2,
  X,
  MonitorSpeaker,
  Computer,
  Globe,
  Mail,
  Database,
  Code,
  HardDrive,
  Activity
} from 'lucide-react';

interface Window {
  id: string;
  title: string;
  type: 'terminal' | 'wireshark' | 'metasploit' | 'burp' | 'nmap' | 'file-manager' | 'browser' | 'email' | 'code-editor' | 'database';
  isMinimized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  content?: any;
}

interface ProductionDesktopEmulatorProps {
  osType: 'linux' | 'windows';
}

export const ProductionDesktopEmulator: React.FC<ProductionDesktopEmulatorProps> = ({ osType }) => {
  const [windows, setWindows] = useState<Window[]>([]);
  const [nextZIndex, setNextZIndex] = useState(10);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    'Welcome to Advanced Penetration Testing Environment',
    'Type "help" for available commands',
    ''
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  
  // Network scanning states
  const [nmapResults, setNmapResults] = useState<string[]>([]);
  const [wiresharkCaptures, setWiresharkCaptures] = useState<any[]>([]);
  const [metasploitPayloads, setMetasploitPayloads] = useState<string[]>([]);
  const [burpRequests, setBurpRequests] = useState<any[]>([]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const createWindow = (type: Window['type'], title: string) => {
    const newWindow: Window = {
      id: `window-${Date.now()}`,
      title,
      type,
      isMinimized: false,
      position: { x: 50 + windows.length * 30, y: 50 + windows.length * 30 },
      size: { width: 800, height: 600 },
      zIndex: nextZIndex
    };
    
    setWindows(prev => [...prev, newWindow]);
    setNextZIndex(prev => prev + 1);
  };

  const closeWindow = (windowId: string) => {
    setWindows(prev => prev.filter(w => w.id !== windowId));
  };

  const bringToFront = (windowId: string) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, zIndex: nextZIndex } : w
    ));
    setNextZIndex(prev => prev + 1);
  };

  const executeCommand = (command: string) => {
    const cmd = command.toLowerCase().trim();
    let output: string[] = [];

    switch (cmd) {
      case 'help':
        output = [
          'Available Commands:',
          '  nmap <target>     - Network mapping and port scanning',
          '  wireshark         - Launch packet analyzer',
          '  metasploit        - Launch exploitation framework',
          '  burpsuite         - Launch web security testing',
          '  sqlmap <url>      - SQL injection testing',
          '  john <hashfile>   - Password cracking',
          '  aircrack <cap>    - WiFi security testing',
          '  hydra <target>    - Brute force attacks',
          '  nikto <url>       - Web vulnerability scanner',
          '  dirb <url>        - Directory enumeration',
          '  netcat <host>     - Network connections',
          '  tcpdump           - Packet capture',
          '  hashcat           - Advanced password recovery',
          '  clear             - Clear terminal',
          '  ls                - List files',
          '  whoami            - Current user',
          '  uname -a          - System information'
        ];
        break;
      
      case 'clear':
        setTerminalHistory([]);
        return;
      
      case 'ls':
        output = [
          'total 24',
          'drwxr-xr-x 2 hacker hacker 4096 Jan  1 00:00 exploits/',
          'drwxr-xr-x 2 hacker hacker 4096 Jan  1 00:00 payloads/',
          'drwxr-xr-x 2 hacker hacker 4096 Jan  1 00:00 wordlists/',
          '-rw-r--r-- 1 hacker hacker 1024 Jan  1 00:00 targets.txt',
          '-rw-r--r-- 1 hacker hacker 2048 Jan  1 00:00 credentials.db',
          '-rwxr-xr-x 1 hacker hacker  512 Jan  1 00:00 autopwn.sh'
        ];
        break;
      
      case 'whoami':
        output = ['operator'];
        break;
      
      case 'uname -a':
        output = ['Linux pentest-rig 5.15.0-kali #1 SMP x86_64 GNU/Linux'];
        break;
      
      default:
        if (cmd.startsWith('nmap ')) {
          const target = cmd.split(' ')[1] || '127.0.0.1';
          output = [
            `Starting Nmap scan on ${target}...`,
            'Host is up (0.0001s latency).',
            'PORT     STATE SERVICE',
            '22/tcp   open  ssh',
            '80/tcp   open  http',
            '443/tcp  open  https',
            '3389/tcp open  ms-wbt-server',
            '5432/tcp open  postgresql',
            'Nmap done: 1 IP address scanned'
          ];
          setNmapResults(prev => [...prev, ...output]);
        } else if (cmd === 'wireshark') {
          createWindow('wireshark', 'Wireshark - Network Protocol Analyzer');
          output = ['Launching Wireshark...'];
        } else if (cmd === 'metasploit') {
          createWindow('metasploit', 'Metasploit Framework Console');
          output = ['Launching Metasploit Framework...'];
        } else if (cmd === 'burpsuite') {
          createWindow('burp', 'Burp Suite Professional');
          output = ['Launching Burp Suite...'];
        } else if (cmd.startsWith('sqlmap ')) {
          const url = cmd.split(' ')[1] || 'http://target.com';
          output = [
            `Testing ${url} for SQL injection vulnerabilities...`,
            'Parameter: id (GET)',
            'Type: boolean-based blind',
            'Title: AND boolean-based blind - WHERE or HAVING clause',
            'Payload: id=1 AND 5847=5847',
            'Vector: AND [INFERENCE]',
            'Database: MySQL >= 5.0'
          ];
        } else {
          output = [`Command not found: ${command}`];
        }
        break;
    }

    setTerminalHistory(prev => [...prev, `$ ${command}`, ...output, '']);
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (terminalInput.trim()) {
      executeCommand(terminalInput);
      setTerminalInput('');
    }
  };

  const renderWindowContent = (window: Window) => {
    switch (window.type) {
      case 'browser':
        return <BrowserApp windowId={window.id} onClose={() => closeWindow(window.id)} />;
      
      case 'email':
        return <EmailApp onClose={() => closeWindow(window.id)} />;
      
      case 'code-editor':
        return (
          <div className="h-full bg-gray-900 text-green-400 font-mono">
            <div className="bg-gray-800 p-2 border-b border-gray-700 flex items-center gap-2">
              <span className="text-sm">exploit.py</span>
              <Badge variant="outline" className="text-xs">Modified</Badge>
            </div>
            <div className="p-4 text-sm">
              <div className="text-gray-500"># Advanced Penetration Testing Script</div>
              <div className="text-blue-400">import</div> <span className="text-white">socket, subprocess, sys</span>
              <div className="text-blue-400">from</div> <span className="text-white">scapy.all import *</span>
              <div className="mt-2 text-gray-500"># Network reconnaissance function</div>
              <div className="text-blue-400">def</div> <span className="text-yellow-400">network_scan</span><span className="text-white">(target_ip):</span>
              <div className="ml-4 text-white">ports = [21, 22, 23, 25, 53, 80, 110, 443, 993, 995]</div>
              <div className="ml-4 text-blue-400">for</div> <span className="text-white">port in ports:</span>
              <div className="ml-8 text-white">sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)</div>
              <div className="ml-8 text-white">result = sock.connect_ex((target_ip, port))</div>
              <div className="ml-8 text-blue-400">if</div> <span className="text-white">result == 0:</span>
               <div className="ml-12 text-green-400">print(f&quot;Port {'{port}'} is open&quot;)</div>
               <div className="ml-8 text-white">sock.close()</div>
               <div className="mt-4 animate-pulse">█</div>
             </div>
           </div>
        );
        
      case 'database':
        return (
          <div className="h-full bg-gray-900 text-white">
            <div className="bg-gray-800 p-2 border-b border-gray-700 flex items-center justify-between">
              <span className="text-sm font-mono">SQL Client - target_db</span>
              <Badge className="bg-red-500/20 text-red-400">UNAUTHORIZED ACCESS</Badge>
            </div>
            <div className="flex h-full">
              <div className="w-1/4 bg-gray-800 border-r border-gray-700 p-2">
                <h4 className="text-xs font-bold mb-2">DATABASES</h4>
                <div className="space-y-1 text-xs">
                  <div className="text-green-400">• customer_data</div>
                  <div className="text-green-400">• financial_records</div>
                  <div className="text-green-400">• user_credentials</div>
                  <div className="text-red-400">• classified_intel</div>
                </div>
              </div>
              <div className="flex-1 p-4">
                <div className="bg-black p-2 rounded mb-4 font-mono text-sm">
                  <div className="text-green-400">mysql{'>'} SELECT * FROM user_credentials LIMIT 10;</div>
                  <div className="mt-2 text-white">
                    <div>| id | username | password_hash | email |</div>
                    <div>|----|----------|---------------|-------|</div>
                    <div>| 1  | admin    | 5e884898da... | admin@target.com |</div>
                    <div>| 2  | jdoe     | ef797c8118... | john@target.com  |</div>
                    <div>| 3  | ssmith   | 7c6a180b36... | sarah@target.com |</div>
                  </div>
                  <div className="text-green-400 mt-2">3 rows in set (0.01 sec)</div>
                  <div className="text-green-400">mysql{'>'} <span className="animate-pulse">█</span></div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'terminal':
        return (
          <div className="h-full bg-black text-green-400 font-mono text-sm p-4">
            <ScrollArea className="h-[85%] mb-4">
              <div className="space-y-1">
                {terminalHistory.map((line, index) => (
                  <div key={index} className="whitespace-pre-wrap">
                    {line}
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <form onSubmit={handleTerminalSubmit} className="flex items-center">
              <span className="text-green-400 mr-2">$</span>
              <Input
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                className="bg-transparent border-none text-green-400 focus:ring-0 p-0"
                placeholder="Enter command..."
                autoFocus
              />
            </form>
          </div>
        );
      
      case 'wireshark':
        return (
          <div className="h-full bg-gray-100 p-4">
            <div className="mb-4 flex gap-2">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Play className="w-4 h-4 mr-1" />
                Start Capture
              </Button>
              <Button size="sm" variant="outline">
                <Pause className="w-4 h-4 mr-1" />
                Stop
              </Button>
              <Button size="sm" variant="outline">
                <Square className="w-4 h-4 mr-1" />
                Restart
              </Button>
            </div>
            
            <div className="space-y-1 text-sm font-mono">
              <div className="grid grid-cols-6 gap-4 font-bold border-b pb-2">
                <span>No.</span>
                <span>Time</span>
                <span>Source</span>
                <span>Destination</span>
                <span>Protocol</span>
                <span>Info</span>
              </div>
              
              {[
                ['1', '0.000000', '192.168.1.100', '192.168.1.1', 'TCP', 'Source Port: 54321 Dest Port: 80'],
                ['2', '0.000156', '192.168.1.1', '192.168.1.100', 'TCP', 'HTTP/1.1 200 OK'],
                ['3', '0.000234', '10.0.0.1', '8.8.8.8', 'DNS', 'Standard query A google.com'],
                ['4', '0.000456', '192.168.1.100', '192.168.1.50', 'SSH', 'Encrypted packet'],
                ['5', '0.000678', '172.16.0.1', '172.16.0.100', 'HTTPS', 'TLS 1.3 Application Data']
              ].map((packet, index) => (
                <div key={index} className="grid grid-cols-6 gap-4 py-1 border-b hover:bg-blue-50">
                  {packet.map((cell, cellIndex) => (
                    <span key={cellIndex} className="truncate">{cell}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'metasploit':
        return (
          <div className="h-full bg-black text-red-400 font-mono text-sm p-4">
            <div className="mb-4">
              <div className="text-red-500 font-bold">
                METASPLOIT FRAMEWORK
              </div>
              <div className="text-red-400 text-xs mt-2">
                Metasploit Framework v6.3.47-dev
              </div>
            </div>
            
            <ScrollArea className="h-[70%] mb-4">
              <div className="space-y-1">
                <div>msf6 {'>'} use exploit/multi/handler</div>
                <div>[*] Using configured payload generic/shell_reverse_tcp</div>
                <div>msf6 exploit(multi/handler) {'>'} set LHOST 192.168.1.100</div>
                <div>LHOST =&gt; 192.168.1.100</div>
                <div>msf6 exploit(multi/handler) {'>'} set LPORT 4444</div>
                <div>LPORT =&gt; 4444</div>
                <div>msf6 exploit(multi/handler) {'>'} show payloads</div>
                <div className="ml-4">
                  <div>android/meterpreter/reverse_tcp</div>
                  <div>linux/x64/meterpreter/reverse_tcp</div>
                  <div>windows/x64/meterpreter/reverse_tcp</div>
                  <div>python/meterpreter/reverse_tcp</div>
                </div>
                <div>msf6 exploit(multi/handler) {'>'} exploit</div>
                <div>[*] Started reverse TCP handler on 192.168.1.100:4444</div>
                <div>[*] Waiting for connection...</div>
              </div>
            </ScrollArea>
            
            <div className="flex items-center">
              <span className="text-red-400 mr-2">msf6 exploit(multi/handler) {'>'}</span>
              <Input
                className="bg-transparent border-none text-red-400 focus:ring-0 p-0"
                placeholder="Enter Metasploit command..."
              />
            </div>
          </div>
        );
      
      case 'burp':
        return (
          <div className="h-full bg-white">
            <Tabs defaultValue="proxy" className="h-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="proxy">Proxy</TabsTrigger>
                <TabsTrigger value="target">Target</TabsTrigger>
                <TabsTrigger value="intruder">Intruder</TabsTrigger>
                <TabsTrigger value="repeater">Repeater</TabsTrigger>
                <TabsTrigger value="scanner">Scanner</TabsTrigger>
                <TabsTrigger value="extender">Extender</TabsTrigger>
              </TabsList>
              
              <TabsContent value="proxy" className="p-4 h-full">
                <div className="mb-4 flex items-center gap-4">
                  <Badge variant="success">Intercept is ON</Badge>
                  <Button size="sm">Forward</Button>
                  <Button size="sm" variant="outline">Drop</Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 h-[80%]">
                  <div>
                    <h4 className="font-semibold mb-2">HTTP Request</h4>
                    <div className="bg-gray-100 p-3 font-mono text-sm h-full overflow-auto">
                      <div>GET /admin/login HTTP/1.1</div>
                      <div>Host: target.example.com</div>
                      <div>User-Agent: Mozilla/5.0</div>
                      <div>Accept: text/html,application/xhtml+xml</div>
                      <div>Accept-Language: en-US,en;q=0.5</div>
                      <div>Connection: keep-alive</div>
                      <div>Cookie: PHPSESSID=abc123def456</div>
                      <div className="mt-4">username=admin&password=password123</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">HTTP Response</h4>
                    <div className="bg-gray-100 p-3 font-mono text-sm h-full overflow-auto">
                      <div>HTTP/1.1 200 OK</div>
                      <div>Content-Type: text/html</div>
                      <div>Set-Cookie: session=xyz789</div>
                      <div>Content-Length: 2048</div>
                      <div className="mt-4">&lt;html&gt;</div>
                      <div>&lt;head&gt;&lt;title&gt;Admin Panel&lt;/title&gt;&lt;/head&gt;</div>
                      <div>&lt;body&gt;</div>
                      <div>&lt;h1&gt;Welcome Administrator&lt;/h1&gt;</div>
                      <div>&lt;div className="dashboard"&gt;...&lt;/div&gt;</div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="target" className="p-4">
                <div className="space-y-4">
                  <h4 className="font-semibold">Site Map</h4>
                  <div className="bg-gray-50 p-4 font-mono text-sm">
                    <div>📁 target.example.com</div>
                    <div className="ml-4">📁 admin/</div>
                    <div className="ml-8">📄 login.php</div>
                    <div className="ml-8">📄 dashboard.php</div>
                    <div className="ml-4">📁 api/</div>
                    <div className="ml-8">📄 users.json</div>
                    <div className="ml-8">📄 config.xml</div>
                    <div className="ml-4">📄 index.html</div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        );
      
      default:
        return <div className="h-full flex items-center justify-center text-muted-foreground">Application loading...</div>;
    }
  };

  const DesktopApps = [
    { id: 'terminal', name: 'Terminal', icon: Terminal, action: () => createWindow('terminal', 'Terminal') },
    { id: 'wireshark', name: 'Wireshark', icon: Network, action: () => createWindow('wireshark', 'Wireshark') },
    { id: 'metasploit', name: 'Metasploit', icon: Shield, action: () => createWindow('metasploit', 'Metasploit') },
    { id: 'burp', name: 'Burp Suite', icon: Search, action: () => createWindow('burp', 'Burp Suite') },
    { id: 'files', name: 'File Manager', icon: Folder, action: () => createWindow('file-manager', 'Files') },
    { id: 'browser', name: 'Browser', icon: Search, action: () => createWindow('browser', 'Firefox') }
  ];

  return (
    <div className="h-full relative bg-gradient-to-br from-gray-900 to-black overflow-hidden">
      {/* Desktop Background */}
      <div className="absolute inset-0 opacity-20"></div>
      
      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 grid grid-cols-1 gap-4">
        {DesktopApps.map((app) => (
          <Button
            key={app.id}
            variant="ghost"
            size="sm"
            onClick={app.action}
            className="flex flex-col items-center gap-1 h-16 w-16 text-white hover:bg-white/10"
          >
            <app.icon className="w-8 h-8" />
            <span className="text-xs">{app.name}</span>
          </Button>
        ))}
      </div>

      {/* Windows */}
      {windows.filter(w => !w.isMinimized).map((window) => (
        <div
          key={window.id}
          className="absolute bg-white rounded-lg shadow-2xl border"
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
          <div className="flex items-center justify-between p-2 bg-gray-800 text-white rounded-t-lg">
            <span className="text-sm font-medium">{window.title}</span>
            <div className="flex gap-1">
              <Button size="sm" variant="ghost" className="h-6 w-6 p-0 hover:bg-gray-700">
                <Minimize2 className="w-3 h-3" />
              </Button>
              <Button size="sm" variant="ghost" className="h-6 w-6 p-0 hover:bg-gray-700">
                <Maximize2 className="w-3 h-3" />
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                className="h-6 w-6 p-0 hover:bg-red-600"
                onClick={() => closeWindow(window.id)}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
          
          {/* Window Content */}
          <div className="h-[calc(100%-40px)]">
            {renderWindowContent(window)}
          </div>
        </div>
      ))}

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gray-800 border-t border-gray-700 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700">
            {osType === 'linux' ? <MonitorSpeaker className="w-5 h-5" /> : <Computer className="w-5 h-5" />}
          </Button>
          
          {windows.map((window) => (
            <Button
              key={window.id}
              variant={window.isMinimized ? "outline" : "secondary"}
              size="sm"
              onClick={() => {
                if (window.isMinimized) {
                  setWindows(prev => prev.map(w => 
                    w.id === window.id ? { ...w, isMinimized: false } : w
                  ));
                  bringToFront(window.id);
                }
              }}
              className="text-xs max-w-32 truncate"
            >
              {window.title}
            </Button>
          ))}
        </div>
        
        <div className="flex items-center gap-4 text-white text-sm">
          <Wifi className="w-4 h-4" />
          <span>{currentTime.toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};