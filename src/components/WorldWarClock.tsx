import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Clock, TrendingUp, Activity } from 'lucide-react';

export const WorldWarClock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState('23:47:32');
  const [tension, setTension] = useState(85);
  const [recentEvents, setRecentEvents] = useState([
    { id: 1, event: 'Failed diplomatic mission', impact: '+30s', time: '14:31:45', severity: 'critical' },
    { id: 2, event: 'AI false positive trigger', impact: '+45s', time: '14:28:12', severity: 'warning' },
    { id: 3, event: 'Resource shortage escalation', impact: '+20s', time: '14:25:03', severity: 'info' },
    { id: 4, event: 'Faction betrayal detected', impact: '+60s', time: '14:21:56', severity: 'critical' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate clock progression
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
            if (newHours >= 24) {
              newHours = 0;
            }
          }
        }

        return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}:${newSeconds.toString().padStart(2, '0')}`;
      });

      // Randomly adjust tension
      if (Math.random() < 0.1) {
        setTension(prev => Math.min(100, Math.max(0, prev + (Math.random() - 0.5) * 5)));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getTensionColor = (level: number) => {
    if (level >= 80) return 'text-status-critical';
    if (level >= 60) return 'text-status-warning';
    if (level >= 40) return 'text-status-info';
    return 'text-status-success';
  };

  const getTensionStatus = (level: number) => {
    if (level >= 80) return 'CRITICAL';
    if (level >= 60) return 'HIGH';
    if (level >= 40) return 'MODERATE';
    return 'LOW';
  };

  const minutesToMidnight = 12 - Math.floor((tension - 80) * 0.4);

  return (
    <Card className="p-6 terminal-glow pulse-glow">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-full bg-terminal-surface">
          <Clock className="w-6 h-6 text-glow-primary" />
        </div>
        <div>
          <h2 className="text-xl font-display font-bold text-glow">World War Clock</h2>
          <p className="text-sm text-muted-foreground">Global Tension Monitor</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="text-center">
          <div className="mb-4">
            <div className="text-4xl font-display font-bold text-status-critical text-glow mb-2">
              {currentTime}
            </div>
            <div className="text-lg font-semibold text-muted-foreground">
              {Math.max(0, minutesToMidnight)} minutes to midnight
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Global Tension</span>
                <Badge 
                  variant={tension >= 80 ? 'critical' : tension >= 60 ? 'warning' : 'success'}
                  className="font-display"
                >
                  {getTensionStatus(tension)}
                </Badge>
              </div>
              <Progress 
                value={tension} 
                className="h-3"
              />
              <div className={`text-right text-sm mt-1 ${getTensionColor(tension)}`}>
                {tension.toFixed(1)}%
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-3 bg-terminal-surface rounded border border-terminal-border">
                <TrendingUp className="w-5 h-5 mx-auto mb-1 text-status-warning" />
                <div className="text-sm font-medium">Escalations</div>
                <div className="text-lg font-bold text-status-warning">47</div>
              </div>
              <div className="p-3 bg-terminal-surface rounded border border-terminal-border">
                <Activity className="w-5 h-5 mx-auto mb-1 text-glow-primary" />
                <div className="text-sm font-medium">Active Ops</div>
                <div className="text-lg font-bold text-glow-primary">23</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-status-warning" />
            <h3 className="font-display font-semibold">Recent Escalations</h3>
          </div>
          
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {recentEvents.map((event) => (
              <div 
                key={event.id}
                className="p-3 bg-terminal-surface rounded border border-terminal-border"
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-sm font-medium">{event.event}</span>
                  <Badge 
                    variant={
                      event.severity === 'critical' ? 'critical' : 
                      event.severity === 'warning' ? 'warning' : 
                      'secondary'
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
    </Card>
  );
};