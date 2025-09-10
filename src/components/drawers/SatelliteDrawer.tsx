import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Satellite,
  Globe,
  Radio,
  Shield,
  Eye,
  AlertTriangle,
  Clock,
  Signal,
  Activity,
  X,
  Search,
  Filter,
  Target,
  Navigation,
  Zap,
  Lock
} from 'lucide-react';
import { ALL_SATELLITE_NODES } from '@/data/satelliteComms';

interface SatelliteDrawerProps {
  onClose: () => void;
}

interface OrbitData {
  altitude: number;
  inclination: number;
  period: number;
  velocity: number;
  nextPass?: string;
}

export const SatelliteDrawer: React.FC<SatelliteDrawerProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedSatellite, setSelectedSatellite] = useState<any>(null);
  const [liveTracking, setLiveTracking] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second for live tracking
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Generate realistic orbital data
  const generateOrbitData = (satellite: any): OrbitData => {
    const baseAltitudes = {
      'military': 850 + Math.random() * 200,
      'commercial': 550 + Math.random() * 300,
      'intelligence': 400 + Math.random() * 600,
      'navigation': 20200 + Math.random() * 200,
      'communication': 35786 + Math.random() * 100,
      'ground_station': 0
    };

    const altitude = baseAltitudes[satellite.type as keyof typeof baseAltitudes] || 600;
    const inclination = satellite.type === 'navigation' ? 55 : Math.random() * 98;
    const period = satellite.type === 'communication' ? 1436 : 90 + (altitude / 10);
    const velocity = 7.66 - (altitude / 10000);

    return {
      altitude: Math.round(altitude),
      inclination: Math.round(inclination * 10) / 10,
      period: Math.round(period),
      velocity: Math.round(velocity * 100) / 100,
      nextPass: new Date(Date.now() + Math.random() * 24 * 60 * 60 * 1000).toISOString()
    };
  };

  const satelliteTypes = [
    { id: 'all', label: 'All Assets', count: ALL_SATELLITE_NODES.length },
    { id: 'military', label: 'Military', count: ALL_SATELLITE_NODES.filter(s => s.type === 'military').length },
    { id: 'spy', label: 'Intelligence', count: ALL_SATELLITE_NODES.filter(s => s.type === 'spy').length },
    { id: 'satellite', label: 'Navigation', count: ALL_SATELLITE_NODES.filter(s => s.type === 'satellite').length },
    { id: 'relay', label: 'Communications', count: ALL_SATELLITE_NODES.filter(s => s.type === 'relay').length },
    { id: 'commercial', label: 'Commercial', count: ALL_SATELLITE_NODES.filter(s => s.type === 'commercial').length },
    { id: 'ground_station', label: 'Ground Stations', count: ALL_SATELLITE_NODES.filter(s => s.type === 'ground_station').length }
  ];

  const filteredSatellites = ALL_SATELLITE_NODES.filter(satellite => {
    const matchesSearch = satellite.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         satellite.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || satellite.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'inactive': return 'text-yellow-400';
      case 'compromised': return 'text-red-400';
      case 'classified': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'top_secret': return 'bg-red-900 text-red-100';
      case 'secret': return 'bg-orange-900 text-orange-100';
      case 'confidential': return 'bg-yellow-900 text-yellow-100';
      case 'unclassified': return 'bg-green-900 text-green-100';
      default: return 'bg-gray-900 text-gray-100';
    }
  };

  const renderSatelliteDetails = (satellite: any) => {
    const orbitData = generateOrbitData(satellite);
    
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-glow-primary">{satellite.name}</h3>
          <Button variant="ghost" size="sm" onClick={() => setSelectedSatellite(null)}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card className="p-3 bg-terminal-surface border-terminal-border">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold">ORBITAL DATA</span>
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-terminal-muted">Altitude:</span>
                <span className="text-glow-primary">{orbitData.altitude} km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-terminal-muted">Inclination:</span>
                <span className="text-glow-primary">{orbitData.inclination}°</span>
              </div>
              <div className="flex justify-between">
                <span className="text-terminal-muted">Period:</span>
                <span className="text-glow-primary">{orbitData.period} min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-terminal-muted">Velocity:</span>
                <span className="text-glow-primary">{orbitData.velocity} km/s</span>
              </div>
            </div>
          </Card>

          <Card className="p-3 bg-terminal-surface border-terminal-border">
            <div className="flex items-center gap-2 mb-2">
              <Radio className="w-4 h-4 text-green-400" />
              <span className="text-xs font-bold">SIGNAL DATA</span>
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-terminal-muted">Status:</span>
                <span className={getStatusColor(satellite.status)}>{satellite.status.toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-terminal-muted">Signal:</span>
                <span className="text-green-400">{85 + Math.round(Math.random() * 15)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-terminal-muted">Last Contact:</span>
                <span className="text-glow-primary">{Math.round(Math.random() * 10)} min ago</span>
              </div>
              <div className="flex justify-between">
                <span className="text-terminal-muted">Next Pass:</span>
                <span className="text-glow-primary">{new Date(orbitData.nextPass!).toLocaleTimeString()}</span>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-3 bg-terminal-surface border-terminal-border">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-red-400" />
            <span className="text-xs font-bold">MISSION PROFILE</span>
          </div>
          <div className="space-y-2 text-xs">
            <div>
              <span className="text-terminal-muted">Purpose:</span>
              <span className="text-terminal-text ml-2">{satellite.purpose}</span>
            </div>
            <div>
              <span className="text-terminal-muted">Type:</span>
              <span className="text-terminal-text ml-2 capitalize">{satellite.type.replace('_', ' ')}</span>
            </div>
            <div>
              <span className="text-terminal-muted">Classification:</span>
              <Badge className={`ml-2 text-xs ${getClassificationColor(satellite.classification)}`}>
                {satellite.classification}
              </Badge>
            </div>
            <div>
              <span className="text-terminal-muted">Coordinates:</span>
              <span className="text-terminal-text ml-2 font-mono">
                {satellite.coordinates[0].toFixed(4)}, {satellite.coordinates[1].toFixed(4)}
              </span>
            </div>
          </div>
        </Card>

        <div className="flex gap-2">
          <Button size="sm" className="flex-1">
            <Target className="w-4 h-4 mr-2" />
            Track Orbit
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Radio className="w-4 h-4 mr-2" />
            Intercept
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 space-y-4">
      {selectedSatellite ? (
        renderSatelliteDetails(selectedSatellite)
      ) : (
        <>
          {/* Header with Live Tracking */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Satellite className="w-5 h-5 text-glow-primary" />
              <span className="font-display font-bold text-glow-primary">ORBITAL ASSETS</span>
            </div>
            <Button
              variant={liveTracking ? "default" : "outline"}
              size="sm"
              onClick={() => setLiveTracking(!liveTracking)}
              className="flex items-center gap-2"
            >
              <Activity className={`w-3 h-3 ${liveTracking ? 'animate-pulse' : ''}`} />
              {liveTracking ? 'LIVE' : 'STATIC'}
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="space-y-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-terminal-muted" />
              <Input
                placeholder="Search satellites..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-terminal-surface border-terminal-border"
              />
            </div>
          </div>

          {/* Satellite Type Tabs */}
          <Tabs value={selectedType} onValueChange={setSelectedType}>
            <TabsList className="grid grid-cols-3 gap-1 bg-terminal-surface">
              {satelliteTypes.slice(0, 3).map(type => (
                <TabsTrigger key={type.id} value={type.id} className="text-xs">
                  {type.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsList className="grid grid-cols-4 gap-1 bg-terminal-surface mt-1">
              {satelliteTypes.slice(3).map(type => (
                <TabsTrigger key={type.id} value={type.id} className="text-xs">
                  {type.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Stats Overview */}
          <div className="grid grid-cols-3 gap-2">
            <Card className="p-2 bg-terminal-surface border-terminal-border">
              <div className="text-center">
                <div className="text-lg font-bold text-glow-primary">{filteredSatellites.length}</div>
                <div className="text-xs text-terminal-muted">Assets</div>
              </div>
            </Card>
            <Card className="p-2 bg-terminal-surface border-terminal-border">
              <div className="text-center">
                <div className="text-lg font-bold text-green-400">
                  {filteredSatellites.filter(s => s.status === 'active').length}
                </div>
                <div className="text-xs text-terminal-muted">Online</div>
              </div>
            </Card>
            <Card className="p-2 bg-terminal-surface border-terminal-border">
              <div className="text-center">
                <div className="text-lg font-bold text-red-400">
                  {filteredSatellites.filter(s => s.classification === 'top_secret').length}
                </div>
                <div className="text-xs text-terminal-muted">Classified</div>
              </div>
            </Card>
          </div>

          {/* Satellite List */}
          <ScrollArea className="h-80">
            <div className="space-y-2">
              {filteredSatellites.map((satellite) => (
                <Card
                  key={satellite.id}
                  className="p-3 bg-terminal-surface border-terminal-border hover:border-glow-primary/50 cursor-pointer transition-colors"
                  onClick={() => setSelectedSatellite(satellite)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Satellite className="w-4 h-4 text-glow-primary" />
                      <span className="font-bold text-sm">{satellite.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Badge className={`text-xs ${getClassificationColor(satellite.classification)}`}>
                        {satellite.classification}
                      </Badge>
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(satellite.status).replace('text-', 'bg-')}`} />
                    </div>
                  </div>
                  <div className="text-xs text-terminal-muted mb-2">{satellite.purpose}</div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-terminal-muted capitalize">{satellite.type.replace('_', ' ')}</span>
                    <span className="text-terminal-text font-mono">
                      {satellite.coordinates[0].toFixed(2)}, {satellite.coordinates[1].toFixed(2)}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Navigation className="w-4 h-4 mr-2" />
              Plot Trajectories
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <Lock className="w-4 h-4 mr-2" />
              Secure Comms
            </Button>
          </div>
        </>
      )}
    </div>
  );
};