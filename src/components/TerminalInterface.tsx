import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Terminal, Monitor, Activity, Shield, AlertTriangle, Zap } from 'lucide-react';

interface TerminalProps {
  isCliMode: boolean;
  onModeToggle: () => void;
}

interface TerminalCommand {
  timestamp: string;
  command: string;
  output: string[];
  type: 'success' | 'error' | 'warning' | 'info';
}

export const TerminalInterface: React.FC<TerminalProps> = ({ isCliMode, onModeToggle }) => {
  const [command, setCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<TerminalCommand[]>([
    {
      timestamp: '2387.152.14:32:07',
      command: 'sys.init --warfare-engine',
      output: [
        'FACTION STATE MEMORY CORE [ONLINE]',
        'MULTIPLAYER OPS SYNCHRO LAYER [ACTIVE]',
        'STORYSYNC WARFARE ENGINE [INITIALIZED]',
        'GLOBAL CONFLICT TREES [GENERATING...]',
        'Welcome, Agent. The war never sleeps.'
      ],
      type: 'success'
    }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const commands = {
    'help': () => [
      'Available Commands:',
      '• faction.status - View faction standings',
      '• intel.scan - Scan for classified intel',
      '• war.clock - Check global tension status',
      '• reputation.query - View reputation matrix',
      '• mission.available - List available operations',
      '• clear - Clear terminal history'
    ],
    'faction.status': () => [
      'FACTION STANDINGS:',
      '• ALPHA SYNDICATE: ALLIED (+750)',
      '• BETA CONSORTIUM: HOSTILE (-320)', 
      '• GAMMA COLLECTIVE: NEUTRAL (0)',
      '• ROGUE AI NODES: THREAT LEVEL: CRITICAL'
    ],
    'intel.scan': () => [
      'SCANNING FOR CLASSIFIED INTEL...',
      'FOUND: 3 INTEL PACKETS',
      '• [HIGH] Beta Trade Route Vulnerability',
      '• [MED] Alpha Leadership Structure',
      '• [LOW] Gamma Resource Shortage'
    ],
    'war.clock': () => [
      'GLOBAL TENSION STATUS:',
      'WORLD WAR CLOCK: 23:47:32',
      'STATUS: CRITICAL - 12 MINUTES TO MIDNIGHT',
      'RECENT ESCALATIONS:',
      '• Failed diplomatic mission: +30 seconds',
      '• AI false positive trigger: +45 seconds'
    ],
    'reputation.query': () => [
      'REPUTATION MATRIX:',
      'TRUST LEVEL: OPERATIVE',
      'CLEARANCE: LEVEL 7',
      'BETRAYAL INCIDENTS: 0',
      'SUCCESSFUL MISSIONS: 247'
    ],
    'mission.available': () => [
      'AVAILABLE OPERATIONS:',
      '• [URGENT] Intercept Beta communications',
      '• [MEDIUM] Sabotage Gamma supply line',
      '• [LOW] Deliver Alpha diplomatic package'
    ],
    'clear': () => {
      setCommandHistory([]);
      return [];
    }
  };

  const executeCommand = () => {
    if (!command.trim()) return;

    const cmd = command.toLowerCase().trim();
    const timestamp = new Date().toLocaleTimeString();
    
    let output: string[] = [];
    let type: 'success' | 'error' | 'warning' | 'info' = 'info';

    if (commands[cmd as keyof typeof commands]) {
      if (cmd === 'clear') {
        commands[cmd]();
        setCommand('');
        return;
      }
      output = commands[cmd as keyof typeof commands]() as string[];
      type = 'success';
    } else {
      output = [`Command not found: ${command}`, 'Type "help" for available commands'];
      type = 'error';
    }

    const newCommand: TerminalCommand = {
      timestamp,
      command,
      output,
      type
    };

    setCommandHistory(prev => [...prev, newCommand]);
    setCommand('');
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [commandHistory]);

  if (!isCliMode) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-display font-bold text-glow">GUI Interface</h2>
          <Button variant="terminal" onClick={onModeToggle}>
            <Terminal className="w-4 h-4 mr-2" />
            Switch to CLI
          </Button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 terminal-glow">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-faction-alpha" />
              <h3 className="font-display font-semibold">Faction Status</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Alpha Syndicate</span>
                <Badge variant="success">Allied</Badge>
              </div>
              <div className="flex justify-between">
                <span>Beta Consortium</span>
                <Badge variant="critical">Hostile</Badge>
              </div>
              <div className="flex justify-between">
                <span>Gamma Collective</span>
                <Badge variant="secondary">Neutral</Badge>
              </div>
            </div>
          </Card>

          <Card className="p-4 terminal-glow">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-status-warning" />
              <h3 className="font-display font-semibold">War Clock</h3>
            </div>
            <div className="text-center">
              <div className="text-2xl font-display font-bold text-status-critical text-glow">
                23:47:32
              </div>
              <div className="text-sm text-muted-foreground">12 minutes to midnight</div>
              <div className="mt-2">
                <Badge variant="critical">CRITICAL</Badge>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-4 terminal-glow">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-5 h-5 text-glow-primary" />
            <h3 className="font-display font-semibold">Available Operations</h3>
          </div>
          <div className="space-y-2">
            <Button variant="terminal" className="w-full justify-start">
              <Zap className="w-4 h-4 mr-2" />
              [URGENT] Intercept Beta communications
            </Button>
            <Button variant="outline" className="w-full justify-start">
              [MEDIUM] Sabotage Gamma supply line
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              [LOW] Deliver Alpha diplomatic package
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold text-glow">CLI Terminal</h2>
        <Button variant="terminal" onClick={onModeToggle}>
          <Monitor className="w-4 h-4 mr-2" />
          Switch to GUI
        </Button>
      </div>

      <Card className="terminal-glow scan-lines">
        <div className="p-4">
          <div className="mb-4">
            <div className="flex items-center gap-2 text-glow-primary mb-2">
              <Terminal className="w-5 h-5" />
              <span className="font-display font-bold">WARFARE COMMAND INTERFACE v2.387</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Faction State Memory Core | Multiplayer Ops Synchro Layer | Active
            </div>
          </div>

          <ScrollArea className="h-64 w-full" ref={scrollRef}>
            <div className="font-mono text-sm space-y-2">
              {commandHistory.map((cmd, idx) => (
                <div key={idx}>
                  <div className="flex items-center gap-2 text-glow-primary">
                    <span className="text-muted-foreground">[{cmd.timestamp}]</span>
                    <span className="text-primary">agent@warfare:~$</span>
                    <span>{cmd.command}</span>
                  </div>
                  {cmd.output.map((line, lineIdx) => (
                    <div 
                      key={lineIdx} 
                      className={`ml-4 ${
                        cmd.type === 'error' ? 'text-status-critical' : 
                        cmd.type === 'warning' ? 'text-status-warning' : 
                        cmd.type === 'success' ? 'text-status-success' : 
                        'text-foreground'
                      }`}
                    >
                      {line}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="mt-4 flex items-center gap-2">
            <span className="text-primary font-mono">agent@warfare:~$</span>
            <Input
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && executeCommand()}
              placeholder="Enter command (type 'help' for options)"
              className="font-mono bg-transparent border-terminal-border focus:border-glow-primary"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};