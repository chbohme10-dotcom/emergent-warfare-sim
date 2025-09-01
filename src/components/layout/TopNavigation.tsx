import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Globe, 
  Terminal, 
  Users, 
  Brain, 
  Monitor, 
  Briefcase, 
  Smartphone, 
  Wrench,
  Clock,
  AlertTriangle,
  TrendingUp,
  Activity,
  ChevronDown
} from 'lucide-react';

interface TopNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const WorldWarClockDropdown: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [currentTime, setCurrentTime] = useState('23:47:32');
  const [tension, setTension] = useState(85);
  const [recentEvents] = useState([
    { id: 1, event: 'Failed diplomatic mission', impact: '+30s', time: '14:31:45', severity: 'critical' },
    { id: 2, event: 'AI false positive trigger', impact: '+45s', time: '14:28:12', severity: 'warning' },
    { id: 3, event: 'Resource shortage escalation', impact: '+20s', time: '14:25:03', severity: 'info' },
    { id: 4, event: 'Faction betrayal detected', impact: '+60s', time: '14:21:56', severity: 'critical' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(prev => {
        const [hours, minutes, seconds] = prev.split(':').map(Number);
        let newSeconds = seconds + 1;
        let newMinutes = minutes;
        let newHours = hours;

        if (newSeconds >= 60) {
          newSeconds = 0;
          newMinutes++;
          if (newMinutes >= 60) {
            newMinutes = 0;
            newHours++;
            if (newHours >= 24) newHours = 0;
          }
        }

        return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}:${newSeconds.toString().padStart(2, '0')}`;
      });

      if (Math.random() < 0.1) {
        setTension(prev => Math.min(100, Math.max(0, prev + (Math.random() - 0.5) * 5)));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getTensionStatus = (level: number) => {
    if (level >= 80) return 'CRITICAL';
    if (level >= 60) return 'HIGH';
    if (level >= 40) return 'MODERATE';
    return 'LOW';
  };

  const minutesToMidnight = 12 - Math.floor((tension - 80) * 0.4);

  if (!isOpen) return null;

  return (
    <div className="absolute top-full right-0 mt-2 z-[60] w-96">
      <Card className="bg-terminal-surface/95 border-terminal-border backdrop-blur-md shadow-2xl terminal-glow">
        <div className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-full bg-terminal-bg">
              <Clock className="w-5 h-5 text-glow-primary" />
            </div>
            <div>
              <h3 className="text-lg font-display font-bold text-glow">World War Clock</h3>
              <p className="text-xs text-muted-foreground">Global Tension Monitor</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-status-critical text-glow mb-1">
                {currentTime}
              </div>
              <div className="text-sm font-semibold text-muted-foreground">
                {Math.max(0, minutesToMidnight)} minutes to midnight
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium">Global Tension</span>
                <Badge 
                  variant={tension >= 80 ? 'critical' : tension >= 60 ? 'warning' : 'success'}
                  className="text-xs"
                >
                  {getTensionStatus(tension)}
                </Badge>
              </div>
              <Progress value={tension} className="h-2" />
              <div className="text-right text-xs mt-1 text-status-warning">
                {tension.toFixed(1)}%
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-2 bg-terminal-bg rounded border border-terminal-border">
                <TrendingUp className="w-4 h-4 mx-auto mb-1 text-status-warning" />
                <div className="text-xs font-medium text-center">Escalations</div>
                <div className="text-sm font-bold text-status-warning text-center">47</div>
              </div>
              <div className="p-2 bg-terminal-bg rounded border border-terminal-border">
                <Activity className="w-4 h-4 mx-auto mb-1 text-glow-primary" />
                <div className="text-xs font-medium text-center">Active Ops</div>
                <div className="text-sm font-bold text-glow-primary text-center">23</div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-status-warning" />
                <h4 className="text-xs font-display font-semibold">Recent Escalations</h4>
              </div>
              
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {recentEvents.map((event) => (
                  <div key={event.id} className="p-2 bg-terminal-bg rounded border border-terminal-border">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs font-medium">{event.event}</span>
                      <Badge 
                        variant={
                          event.severity === 'critical' ? 'critical' : 
                          event.severity === 'warning' ? 'warning' : 'secondary'
                        }
                        className="text-xs"
                      >
                        {event.impact}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">
                      {event.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export const TopNavigation: React.FC<TopNavigationProps> = ({ 
  activeTab, 
  onTabChange 
}) => {
  const [showWarClock, setShowWarClock] = useState(false);
  const [currentTime, setCurrentTime] = useState('23:47:32');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(prev => {
        const [hours, minutes, seconds] = prev.split(':').map(Number);
        let newSeconds = seconds + 1;
        let newMinutes = minutes;
        let newHours = hours;

        if (newSeconds >= 60) {
          newSeconds = 0;
          newMinutes++;
          if (newMinutes >= 60) {
            newMinutes = 0;
            newHours++;
            if (newHours >= 24) newHours = 0;
          }
        }

        return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}:${newSeconds.toString().padStart(2, '0')}`;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const tabs = [
    { id: 'map', label: 'TACTICAL MAP', icon: Globe },
    { id: 'terminal', label: 'TERMINAL', icon: Terminal },
    { id: 'agents', label: 'AGENTS', icon: Users },
    { id: 'intel', label: 'INTEL', icon: Brain },
    { id: 'pc', label: 'PC', icon: Monitor },
    { id: 'blackbag', label: 'BLACKBAG', icon: Briefcase },
    { id: 'mobile', label: 'MOBILE', icon: Smartphone },
    { id: 'tools', label: 'TOOLS', icon: Wrench }
  ];

  return (
    <div className="bg-terminal-surface border-b border-terminal-border sticky top-0 z-50">
      {/* Header */}
      <div className="px-6 py-3 border-b border-terminal-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-terminal-bg terminal-glow">
              <Globe className="w-6 h-6 text-glow-primary" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-glow">WARFARE NEXUS</h1>
              <p className="text-sm text-muted-foreground font-mono">Emergent Warfare Framework v2.387</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="critical" className="pulse-glow">LIVE</Badge>
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowWarClock(!showWarClock)}
                className="text-sm font-mono text-right hover:bg-terminal-border/50 p-2"
              >
                <div className="flex items-center gap-2">
                  <div>
                    <div className="text-glow-primary">{currentTime}</div>
                    <div className="text-xs text-muted-foreground">WAR CLOCK</div>
                  </div>
                  <ChevronDown className={`w-3 h-3 transition-transform ${showWarClock ? 'rotate-180' : ''}`} />
                </div>
              </Button>
              <WorldWarClockDropdown 
                isOpen={showWarClock} 
                onClose={() => setShowWarClock(false)} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-6 py-2">
        <div className="flex items-center gap-2 overflow-x-auto">
          {tabs.map(({ id, label, icon: Icon }) => (
            <Button
              key={id}
              variant={activeTab === id ? "terminal" : "ghost"}
              size="sm"
              onClick={() => onTabChange(id)}
              className={`flex items-center gap-2 whitespace-nowrap font-mono text-xs ${
                activeTab === id 
                  ? 'bg-terminal-border text-glow-primary border border-glow-primary/30' 
                  : 'hover:bg-terminal-border/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};