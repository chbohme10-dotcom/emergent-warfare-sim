import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  RotateCcw,
  Calendar,
  Clock,
  MapPin,
  Users,
  Zap,
  Target,
  Shield,
  AlertTriangle,
  Globe,
  Satellite,
  Radio,
  Database
} from 'lucide-react';

interface TimelineEvent {
  id: string;
  timestamp: Date;
  type: 'agent_move' | 'mission_start' | 'facility_discovered' | 'threat_detected' | 'cyber_attack' | 'intelligence_gathered';
  title: string;
  description: string;
  location: { lat: number; lng: number };
  agent?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  classification: 'unclassified' | 'confidential' | 'secret' | 'top_secret';
}

interface TimelineSystemProps {
  onTimeChange: (timestamp: Date) => void;
  onEventSelect: (event: TimelineEvent) => void;
}

export const TimelineSystem: React.FC<TimelineSystemProps> = ({ onTimeChange, onEventSelect }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [timeRange, setTimeRange] = useState({ start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), end: new Date() });
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);

  // Sample timeline events
  useEffect(() => {
    const generateTimelineEvents = (): TimelineEvent[] => {
      const events: TimelineEvent[] = [];
      const now = new Date();
      
      // Generate events over the past week
      for (let i = 0; i < 50; i++) {
        const timestamp = new Date(now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000);
        const eventTypes: TimelineEvent['type'][] = ['agent_move', 'mission_start', 'facility_discovered', 'threat_detected', 'cyber_attack', 'intelligence_gathered'];
        const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];
        
        events.push({
          id: `event_${i}`,
          timestamp,
          type,
          title: getEventTitle(type),
          description: getEventDescription(type),
          location: {
            lat: (Math.random() - 0.5) * 180,
            lng: (Math.random() - 0.5) * 360
          },
          agent: type === 'agent_move' ? `Agent-${Math.floor(Math.random() * 100)}` : undefined,
          severity: (['low', 'medium', 'high', 'critical'] as const)[Math.floor(Math.random() * 4)],
          classification: (['unclassified', 'confidential', 'secret', 'top_secret'] as const)[Math.floor(Math.random() * 4)]
        });
      }
      
      return events.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    };

    setTimelineEvents(generateTimelineEvents());
  }, []);

  const getEventTitle = (type: TimelineEvent['type']): string => {
    switch (type) {
      case 'agent_move': return 'Agent Movement';
      case 'mission_start': return 'Mission Initiated';
      case 'facility_discovered': return 'Facility Discovered';
      case 'threat_detected': return 'Threat Detected';
      case 'cyber_attack': return 'Cyber Attack';
      case 'intelligence_gathered': return 'Intelligence Gathered';
    }
  };

  const getEventDescription = (type: TimelineEvent['type']): string => {
    switch (type) {
      case 'agent_move': return 'Agent relocated to new operational area';
      case 'mission_start': return 'New mission parameters activated';
      case 'facility_discovered': return 'Previously unknown facility identified';
      case 'threat_detected': return 'Potential security threat identified';
      case 'cyber_attack': return 'Cyber operation executed';
      case 'intelligence_gathered': return 'New intelligence data acquired';
    }
  };

  const getEventIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'agent_move': return Users;
      case 'mission_start': return Target;
      case 'facility_discovered': return MapPin;
      case 'threat_detected': return AlertTriangle;
      case 'cyber_attack': return Zap;
      case 'intelligence_gathered': return Database;
    }
  };

  const getSeverityColor = (severity: TimelineEvent['severity']) => {
    switch (severity) {
      case 'low': return 'status-info';
      case 'medium': return 'status-warning';
      case 'high': return 'status-critical';
      case 'critical': return 'status-critical';
    }
  };

  const getClassificationColor = (classification: TimelineEvent['classification']) => {
    switch (classification) {
      case 'unclassified': return 'muted';
      case 'confidential': return 'status-info';
      case 'secret': return 'status-warning';
      case 'top_secret': return 'status-critical';
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = new Date(prev.getTime() + (60000 * playbackSpeed)); // 1 minute per second
          onTimeChange(newTime);
          return newTime;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, playbackSpeed, onTimeChange]);

  const handleEventClick = (event: TimelineEvent) => {
    setSelectedEvent(event);
    setCurrentTime(event.timestamp);
    onEventSelect(event);
    onTimeChange(event.timestamp);
  };

  const getVisibleEvents = () => {
    return timelineEvents.filter(event => {
      const inTimeRange = event.timestamp >= timeRange.start && event.timestamp <= timeRange.end;
      const matchesFilter = filterType === 'all' || event.type === filterType;
      return inTimeRange && matchesFilter;
    });
  };

  const jumpToTime = (direction: 'start' | 'end' | 'back' | 'forward') => {
    let newTime: Date;
    
    switch (direction) {
      case 'start':
        newTime = timeRange.start;
        break;
      case 'end':
        newTime = timeRange.end;
        break;
      case 'back':
        newTime = new Date(currentTime.getTime() - (60 * 60 * 1000)); // 1 hour back
        break;
      case 'forward':
        newTime = new Date(currentTime.getTime() + (60 * 60 * 1000)); // 1 hour forward
        break;
    }
    
    setCurrentTime(newTime);
    onTimeChange(newTime);
  };

  return (
    <div className="h-full bg-terminal-bg flex flex-col">
      {/* Timeline Controls */}
      <Card className="m-4 p-4 bg-terminal-surface border-terminal-border">
        <div className="space-y-4">
          {/* Playback Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => jumpToTime('start')}
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => jumpToTime('back')}
              >
                <SkipBack className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
                className={isPlaying ? 'bg-status-critical' : 'bg-status-success'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => jumpToTime('forward')}
              >
                <SkipForward className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => jumpToTime('end')}
              >
                <Globe className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-sm font-mono">
                Speed: {playbackSpeed}x
              </div>
              <div className="w-24">
                <Slider
                  value={[playbackSpeed]}
                  onValueChange={(value) => setPlaybackSpeed(value[0])}
                  min={0.1}
                  max={10}
                  step={0.1}
                />
              </div>
            </div>
          </div>
          
          {/* Current Time Display */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-glow-primary" />
                <span className="font-mono text-sm">
                  {currentTime.toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-glow-primary" />
                <span className="font-mono text-sm">
                  {currentTime.toLocaleTimeString()}
                </span>
              </div>
            </div>
            
            {/* Event Filters */}
            <div className="flex gap-2">
              {['all', 'agent_move', 'mission_start', 'threat_detected', 'cyber_attack'].map((filter) => (
                <Button
                  key={filter}
                  size="sm"
                  variant={filterType === filter ? 'default' : 'outline'}
                  onClick={() => setFilterType(filter)}
                  className="text-xs"
                >
                  {filter.replace('_', ' ').toUpperCase()}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Timeline Events */}
      <div className="flex-1 mx-4 mb-4">
        <Card className="h-full bg-terminal-surface border-terminal-border">
          <div className="p-4 border-b border-terminal-border">
            <h3 className="font-display font-bold text-glow-primary">Timeline Events</h3>
            <p className="text-sm text-muted-foreground">
              {getVisibleEvents().length} events in current timeframe
            </p>
          </div>
          
          <div className="h-full overflow-y-auto p-4 space-y-3">
            {getVisibleEvents().map((event) => {
              const EventIcon = getEventIcon(event.type);
              const isSelected = selectedEvent?.id === event.id;
              const isPast = event.timestamp <= currentTime;
              
              return (
                <Card
                  key={event.id}
                  className={`p-3 cursor-pointer transition-all duration-200 ${
                    isSelected 
                      ? 'border-glow-primary bg-terminal-bg' 
                      : isPast 
                        ? 'border-terminal-border bg-terminal-bg/50 opacity-75'
                        : 'border-terminal-border bg-terminal-surface hover:border-glow-primary/50'
                  }`}
                  onClick={() => handleEventClick(event)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${
                        isPast ? 'bg-muted/20' : 'bg-glow-primary/20'
                      }`}>
                        <EventIcon className={`w-4 h-4 ${
                          isPast ? 'text-muted-foreground' : 'text-glow-primary'
                        }`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-sm">{event.title}</h4>
                          <Badge 
                            variant="outline" 
                            className={`text-xs text-${getSeverityColor(event.severity)}`}
                          >
                            {event.severity.toUpperCase()}
                          </Badge>
                          <Badge 
                            variant="outline" 
                            className={`text-xs text-${getClassificationColor(event.classification)}`}
                          >
                            {event.classification.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2">
                          {event.description}
                        </p>
                        
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{event.timestamp.toLocaleString()}</span>
                          {event.agent && (
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {event.agent}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {event.location.lat.toFixed(2)}, {event.location.lng.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};