import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GLOBAL_LOCATIONS } from '@/data/globalLocations';
import { ALL_SATELLITE_NODES } from '@/data/satelliteComms';
import { MapboxGlobe } from '@/components/Maps/MapboxGlobe';
import { 
  Globe, 
  MapPin, 
  Shield,
  AlertTriangle,
  Zap,
  Layers,
  Eye,
  EyeOff,
  Map,
  Navigation,
  Wifi,
  Skull,
  Home,
  Server,
  Target,
  Satellite,
  Minimize2
} from 'lucide-react';

export const TacticalMap3D: React.FC = () => {
  const [visibleLayers, setVisibleLayers] = useState<string[]>(['government_agencies', 'satellites']);
  const [mapMode, setMapMode] = useState<'2d' | '3d'>('3d');
  const [isLayersMinimized, setIsLayersMinimized] = useState(false);

  const layerControls = [
    ...GLOBAL_LOCATIONS.map(category => ({
      id: category.id,
      name: category.name,
      icon: category.icon,
      color: category.color,
      classification: category.classification,
      count: category.subcategories.reduce((total, sub) => total + sub.locations.length, 0)
    })),
    {
      id: 'satellites',
      name: 'Satellite Communications',
      icon: 'satellite',
      color: '#00ff88',
      classification: 'TOP SECRET',
      count: ALL_SATELLITE_NODES.length
    }
  ];

  const toggleLayer = (layerId: string) => {
    setVisibleLayers(prev => 
      prev.includes(layerId) 
        ? prev.filter(id => id !== layerId)
        : [...prev, layerId]
    );
  };

  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, React.ComponentType<any>> = {
      shield: Shield,
      skull: Skull,
      'alert-triangle': AlertTriangle,
      wifi: Wifi,
      home: Home,
      zap: Zap,
      target: Target,
      satellite: Satellite,
      server: Server,
      globe: Globe
    };
    return iconMap[iconName] || MapPin;
  };

  return (
    <div className="relative w-full h-full bg-terminal-bg">
      {/* MapboxGlobe with controls integrated */}
      <MapboxGlobe 
        visibleLayers={visibleLayers}
        mapMode={mapMode}
        onModeChange={setMapMode}
      />

      {/* Intelligence Layers Panel - Minimizable */}
      <Card className={`absolute top-4 left-4 transition-all duration-300 ${
        isLayersMinimized ? 'w-12 h-12' : 'w-80'
      } bg-terminal-bg/90 border-terminal-border backdrop-blur-md overflow-hidden z-30`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            {!isLayersMinimized && (
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-glow-primary" />
                <span className="font-display font-bold text-glow-primary">INTELLIGENCE LAYERS</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLayersMinimized(!isLayersMinimized)}
              className="p-1 hover:bg-terminal-surface"
            >
              {isLayersMinimized ? (
                <div className="w-6 h-6 rounded border-2 border-glow-primary flex items-center justify-center">
                  <Layers className="w-3 h-3 text-glow-primary" />
                </div>
              ) : (
                <Minimize2 className="w-4 h-4 text-terminal-text" />
              )}
            </Button>
          </div>

          {!isLayersMinimized && (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {layerControls.map(layer => {
                const Icon = getIconComponent(layer.icon);
                const isVisible = visibleLayers.includes(layer.id);
                
                return (
                  <div
                    key={layer.id}
                    className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${
                      isVisible ? 'bg-terminal-surface border border-glow-primary/30' : 'hover:bg-terminal-surface/50'
                    }`}
                    onClick={() => toggleLayer(layer.id)}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4" style={{ color: layer.color }} />
                      <span className="text-xs text-terminal-text">{layer.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {layer.count}
                      </Badge>
                      {isVisible ? (
                        <Eye className="w-4 h-4 text-glow-primary" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-terminal-muted" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Card>

      {/* Status Display with integrated legend */}
      <Card className="absolute bottom-4 left-4 w-80 bg-terminal-bg/90 border-terminal-border backdrop-blur-md z-30">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-4 h-4 text-glow-primary" />
            <span className="font-display font-bold text-glow-primary">GLOBAL INTELLIGENCE MAP</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <div className="text-terminal-muted">ACTIVE LAYERS</div>
              <div className="text-glow-primary font-mono">{visibleLayers.length}</div>
            </div>
            <div>
              <div className="text-terminal-muted">TOTAL ASSETS</div>
              <div className="text-glow-primary font-mono">
                {layerControls.reduce((total, layer) => 
                  visibleLayers.includes(layer.id) ? total + layer.count : total, 0
                )}
              </div>
            </div>
            <div>
              <div className="text-terminal-muted">VIEW MODE</div>
              <div className="text-glow-primary font-mono uppercase">{mapMode}</div>
            </div>
            <div>
              <div className="text-terminal-muted">CLASSIFICATION</div>
              <div className="text-glow-primary font-mono">TOP SECRET</div>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-3 pt-3 border-t border-terminal-border">
            <div className="text-xs text-terminal-muted mb-2">CLASSIFICATION LEVELS</div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#ff0066]"></div>
                <span className="text-xs text-terminal-text">TOP SECRET</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#ff4444]"></div>
                <span className="text-xs text-terminal-text">SECRET</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#ff8800]"></div>
                <span className="text-xs text-terminal-text">CONFIDENTIAL</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#00ff88]"></div>
                <span className="text-xs text-terminal-text">UNCLASSIFIED</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};