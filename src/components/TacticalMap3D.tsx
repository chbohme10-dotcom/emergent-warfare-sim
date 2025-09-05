import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, Html, Line, Points } from '@react-three/drei';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GLOBAL_LOCATIONS, LocationCategory } from '@/data/globalLocations';
import { 
  Globe, 
  Satellite, 
  MapPin, 
  Users, 
  Target, 
  Shield,
  AlertTriangle,
  Zap,
  Layers,
  Eye,
  EyeOff,
  Map,
  Navigation,
  Wifi,
  Radio,
  Database,
  Plane,
  Ship,
  Skull,
  Home,
  Server,
  Crosshair,
  Anchor,
  EyeOff as EyeOffIcon,
  ShieldCheck
} from 'lucide-react';

interface MapNode {
  id: string;
  type: 'agent' | 'facility' | 'target' | 'threat' | 'satellite' | 'base';
  position: [number, number, number];
  label: string;
  classification: 'unclassified' | 'confidential' | 'secret' | 'top_secret';
  status: 'active' | 'inactive' | 'compromised' | 'unknown';
  data?: any;
}

interface Route {
  id: string;
  type: 'shipping' | 'air' | 'communication' | 'supply';
  points: [number, number, number][];
  active: boolean;
  classification: string;
}

const Globe3D = ({ nodes, routes, visibleLayers }: { 
  nodes: MapNode[], 
  routes: Route[], 
  visibleLayers: string[] 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.02;
    }
  });

  // Convert lat/lng to 3D coordinates on sphere (proper OpenMap projection)
  const latLngToVector3 = (lat: number, lng: number, radius = 2.1) => {
    // Convert degrees to radians
    const latRad = (lat * Math.PI) / 180;
    const lngRad = (lng * Math.PI) / 180;
    
    // Spherical to Cartesian conversion for proper globe mapping
    const x = radius * Math.cos(latRad) * Math.cos(lngRad);
    const y = radius * Math.sin(latRad);
    const z = radius * Math.cos(latRad) * Math.sin(lngRad);
    
    return new THREE.Vector3(x, y, z);
  };

  const getNodeColor = (node: MapNode) => {
    switch (node.type) {
      case 'agent': return '#00ff88';
      case 'facility': return '#ff4444';
      case 'target': return '#ff8800';
      case 'threat': return '#ff0066';
      case 'satellite': return '#0088ff';
      case 'base': return '#8800ff';
      default: return '#ffffff';
    }
  };

  const getRouteColor = (route: Route) => {
    switch (route.type) {
      case 'shipping': return '#0088ff';
      case 'air': return '#ff8800';
      case 'communication': return '#00ff88';
      case 'supply': return '#ff4444';
      default: return '#ffffff';
    }
  };

  return (
    <group ref={groupRef}>
      {/* Earth Sphere - Dark cyber theme */}
      <Sphere ref={meshRef} args={[2, 128, 128]}>
        <meshStandardMaterial 
          color="#000510"
          roughness={0.9}
          metalness={0.1}
          transparent
          opacity={0.95}
        />
      </Sphere>
      
      {/* Wireframe Overlay - Matrix green */}
      <Sphere args={[2.005, 64, 64]}>
        <meshBasicMaterial 
          color="#001122"
          wireframe={true}
          transparent
          opacity={0.4}
        />
      </Sphere>
      
      {/* Country borders - Cyber green glow */}
      <Sphere args={[2.01, 32, 32]}>
        <meshBasicMaterial 
          color="#00ff88"
          wireframe={true}
          transparent
          opacity={0.15}
        />
      </Sphere>

      {/* Real Location Nodes from Global Database */}
      {GLOBAL_LOCATIONS.filter(category => visibleLayers.includes(category.id)).map((category) => 
        category.subcategories.flatMap(subcategory => 
          subcategory.locations.map((location) => {
            if (!location.coordinates) return null;
            
            const position = latLngToVector3(location.coordinates[0], location.coordinates[1]);
            
            return (
              <group key={location.id} position={position}>
                <mesh>
                  <sphereGeometry args={[0.015, 8, 8]} />
                  <meshBasicMaterial color={category.color} />
                </mesh>
                
                {/* Classification glow based on security level */}
                <mesh>
                  <sphereGeometry args={[
                    location.classification === 'TOP SECRET' ? 0.05 : 
                    location.classification === 'SECRET' ? 0.04 : 
                    location.classification === 'CONFIDENTIAL' ? 0.03 : 0.025, 
                    8, 8
                  ]} />
                  <meshBasicMaterial 
                    color={
                      location.classification === 'TOP SECRET' ? '#ff0000' :
                      location.classification === 'SECRET' ? '#ff8800' :
                      location.classification === 'CONFIDENTIAL' ? '#ffff00' : '#00ff88'
                    }
                    transparent
                    opacity={0.2}
                  />
                </mesh>
                
                {/* Pulsing effect for active threats */}
                {location.status === 'ACTIVE' && location.threats.length > 0 && (
                  <mesh>
                    <sphereGeometry args={[0.06, 8, 8]} />
                    <meshBasicMaterial 
                      color="#ff0066"
                      transparent
                      opacity={0.15}
                    />
                  </mesh>
                )}
                
                {/* HTML overlay for labels */}
                <Html
                  position={[0, 0.08, 0]}
                  style={{
                    color: category.color,
                    fontSize: '8px',
                    fontFamily: 'monospace',
                    pointerEvents: 'none',
                    textAlign: 'center',
                    textShadow: '0 0 4px rgba(0,0,0,0.8)'
                  }}
                >
                  <div className="bg-terminal-bg/90 px-1 py-0.5 rounded border border-terminal-border/50 backdrop-blur-sm">
                    <div className="text-xs font-bold">{location.codename || location.name}</div>
                    <div className="text-xs opacity-80">{location.country}</div>
                  </div>
                </Html>
              </group>
            );
          }).filter(Boolean)
        )
      ).flat()}

      {/* Routes */}
      {routes.filter(route => visibleLayers.includes(route.type)).map((route) => {
        // Generate curved line points for routes
        const points = [];
        for (let i = 0; i < route.points.length - 1; i++) {
          const start = new THREE.Vector3(...route.points[i]);
          const end = new THREE.Vector3(...route.points[i + 1]);
          
          // Create arc between points
          const distance = start.distanceTo(end);
          const arcHeight = distance * 0.3;
          const mid = start.clone().lerp(end, 0.5);
          mid.multiplyScalar(1 + arcHeight);
          
          // Generate curve points
          for (let j = 0; j <= 20; j++) {
            const t = j / 20;
            const point = new THREE.Vector3();
            point.lerpVectors(start, mid, t * 2);
            if (t > 0.5) {
              point.lerpVectors(mid, end, (t - 0.5) * 2);
            }
            points.push(point);
          }
        }
        
        return (
          <Line
            key={route.id}
            points={points}
            color={getRouteColor(route)}
            lineWidth={2}
            transparent
            opacity={route.active ? 0.8 : 0.3}
          />
        );
      })}

      {/* Atmospheric glow - Cyber theme */}
      <Sphere args={[2.15, 32, 32]}>
        <meshBasicMaterial 
          color="#00ff88"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* Outer space glow */}
      <Sphere args={[2.25, 32, 32]}>
        <meshBasicMaterial 
          color="#0066ff"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
};

export const TacticalMap3D: React.FC = () => {
  const [visibleLayers, setVisibleLayers] = useState<string[]>([
    'government_agencies', 'drug_cartels', 'safe_houses', 'shipping_routes', 'air_routes'
  ]);
  
  const [selectedNode, setSelectedNode] = useState<MapNode | null>(null);
  const [mapMode, setMapMode] = useState<'tactical' | 'intelligence' | 'logistics'>('tactical');
  const [layersExpanded, setLayersExpanded] = useState(false);
  const [controlsExpanded, setControlsExpanded] = useState(false);

  // Sample data
  const nodes: MapNode[] = [
    { id: '1', type: 'agent', position: [40.7128, -74.0060, 0], label: 'Agent Alpha', classification: 'secret', status: 'active' },
    { id: '2', type: 'facility', position: [37.7749, -122.4194, 0], label: 'Facility Bravo', classification: 'top_secret', status: 'active' },
    { id: '3', type: 'target', position: [51.5074, -0.1278, 0], label: 'Target Charlie', classification: 'confidential', status: 'unknown' },
    { id: '4', type: 'threat', position: [35.6762, 139.6503, 0], label: 'Threat Delta', classification: 'secret', status: 'active' },
    { id: '5', type: 'satellite', position: [0, 0, 5], label: 'SAT-7', classification: 'top_secret', status: 'active' },
  ];

  const routes: Route[] = [
    {
      id: 'route1',
      type: 'shipping',
      points: [
        [40.7128, -74.0060, 0],
        [51.5074, -0.1278, 0],
        [35.6762, 139.6503, 0]
      ],
      active: true,
      classification: 'unclassified'
    },
    {
      id: 'route2',
      type: 'air',
      points: [
        [37.7749, -122.4194, 0],
        [48.8566, 2.3522, 0],
        [55.7558, 37.6176, 0]
      ],
      active: true,
      classification: 'confidential'
    }
  ];

  // Dynamic layer controls based on global locations data
  const layerControls = GLOBAL_LOCATIONS.map(category => ({
    id: category.id,
    label: category.name,
    icon: getIconForCategory(category.icon),
    color: category.color,
    classification: category.classification
  }));

  function getIconForCategory(iconName: string) {
    const iconMap: { [key: string]: any } = {
      'shield': Shield,
      'skull': Skull,
      'home': Home,
      'server': Server,
      'crosshair': Crosshair,
      'radio': Radio,
      'anchor': Anchor,
      'plane': Plane,
      'satellite': Satellite,
      'eye-off': EyeOffIcon,
      'shield-check': ShieldCheck
    };
    return iconMap[iconName] || MapPin;
  }

  const toggleLayer = (layerId: string) => {
    setVisibleLayers(prev => 
      prev.includes(layerId) 
        ? prev.filter(id => id !== layerId)
        : [...prev, layerId]
    );
  };

  return (
    <div className="h-full bg-terminal-bg relative">
      {/* 3D Globe */}
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: 'radial-gradient(circle, #000510 0%, #000000 100%)' }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#00ff88" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#0088ff" />
        
        <Globe3D 
          nodes={nodes} 
          routes={routes} 
          visibleLayers={visibleLayers} 
        />
        
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={4}
          maxDistance={20}
          autoRotate={false}
          autoRotateSpeed={0.5}
        />
        
        {/* Stars background */}
        <Points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2000}
              itemSize={3}
              array={new Float32Array(Array.from({ length: 6000 }, () => (Math.random() - 0.5) * 100))}
            />
          </bufferGeometry>
          <pointsMaterial 
            size={0.5} 
            color="#ffffff" 
            transparent 
            opacity={0.3}
          />
        </Points>
      </Canvas>

      {/* Animated Layer Controls */}
      <div className="absolute top-4 left-4">
        {!layersExpanded ? (
          <Button
            onClick={() => setLayersExpanded(true)}
            className="w-12 h-12 rounded-full bg-terminal-surface/90 border-2 border-terminal-border backdrop-blur-sm hover:border-glow-primary transition-all duration-300 p-0"
          >
            <svg 
              className="w-6 h-6 text-glow-primary animate-pulse" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              <circle cx="12" cy="8" r="2" fill="currentColor" opacity="0.6" />
              <circle cx="8" cy="12" r="1.5" fill="currentColor" opacity="0.4" />
              <circle cx="16" cy="12" r="1.5" fill="currentColor" opacity="0.4" />
            </svg>
          </Button>
        ) : (
          <Card className="w-80 bg-terminal-surface/95 border-terminal-border backdrop-blur-sm animate-scale-in">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-glow-primary">TACTICAL LAYERS</h3>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {visibleLayers.length} ACTIVE
                  </Badge>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setLayersExpanded(false)}
                    className="w-6 h-6 p-0"
                  >
                    ×
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-1 max-h-64 overflow-y-auto">
                {layerControls.map((layer) => (
                  <Button
                    key={layer.id}
                    size="sm"
                    variant={visibleLayers.includes(layer.id) ? 'default' : 'outline'}
                    onClick={() => toggleLayer(layer.id)}
                    className="text-xs h-7 flex items-center gap-2 justify-start hover:scale-105 transition-transform"
                  >
                    <layer.icon className="w-3 h-3" style={{ color: layer.color }} />
                    <span className="truncate">{layer.label}</span>
                    {layer.classification === 'TOP SECRET' && (
                      <Badge variant="destructive" className="text-xs ml-auto">TS</Badge>
                    )}
                    {layer.classification === 'SECRET' && (
                      <Badge variant="secondary" className="text-xs ml-auto">S</Badge>
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Animated Map Controls */}
      <div className="absolute top-4 right-4">
        {!controlsExpanded ? (
          <Button
            onClick={() => setControlsExpanded(true)}
            className="w-12 h-12 rounded-full bg-terminal-surface/90 border-2 border-terminal-border backdrop-blur-sm hover:border-glow-primary transition-all duration-300 p-0"
          >
            <svg 
              className="w-6 h-6 text-glow-primary animate-spin" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
              style={{ animationDuration: '3s' }}
            >
              <circle cx="12" cy="12" r="10" strokeWidth="1" opacity="0.3" />
              <circle cx="12" cy="12" r="6" strokeWidth="1" opacity="0.5" />
              <circle cx="12" cy="12" r="2" fill="currentColor" />
              <path strokeLinecap="round" strokeWidth="2" d="M12 2v4M12 18v4M2 12h4M18 12h4" opacity="0.7" />
              <path strokeLinecap="round" strokeWidth="1" d="M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" opacity="0.4" />
            </svg>
          </Button>
        ) : (
          <Card className="bg-terminal-surface/95 border-terminal-border backdrop-blur-sm animate-scale-in">
            <div className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-4 h-4 text-glow-primary" />
                <h3 className="font-display font-bold text-glow-primary">MAP CONTROLS</h3>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setControlsExpanded(false)}
                  className="w-6 h-6 p-0 ml-auto"
                >
                  ×
                </Button>
              </div>
              
              <div className="space-y-2">
                <div className="flex gap-2">
                  {(['tactical', 'intelligence', 'logistics'] as const).map((mode) => (
                    <Button
                      key={mode}
                      size="sm"
                      variant={mapMode === mode ? 'default' : 'outline'}
                      onClick={() => setMapMode(mode)}
                      className="text-xs hover:scale-105 transition-transform"
                    >
                      {mode.toUpperCase()}
                    </Button>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-xs hover:scale-105 transition-transform"
                    onClick={() => setVisibleLayers(GLOBAL_LOCATIONS.map(cat => cat.id))}
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    View All
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-xs hover:scale-105 transition-transform"
                    onClick={() => setVisibleLayers([])}
                  >
                    <EyeOff className="w-3 h-3 mr-1" />
                    Hide All
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Status Display */}
      <Card className="absolute bottom-4 left-4 bg-terminal-surface/90 border-terminal-border backdrop-blur-sm">
        <div className="p-4">
          <div className="text-xs font-mono space-y-1">
            <div className="text-glow-primary font-bold">GLOBAL STATUS</div>
            <div className="flex justify-between">
              <span>Active Agents:</span>
              <span className="text-status-success">247</span>
            </div>
            <div className="flex justify-between">
              <span>Facilities:</span>
              <span className="text-status-info">1,847</span>
            </div>
            <div className="flex justify-between">
              <span>Active Threats:</span>
              <span className="text-status-critical">23</span>
            </div>
            <div className="flex justify-between">
              <span>Satellites:</span>
              <span className="text-status-warning">12</span>
            </div>
            <div className="flex justify-between">
              <span>Data Streams:</span>
              <span className="text-glow-primary">LIVE</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Legend */}
      <Card className="absolute bottom-4 right-4 bg-terminal-surface/90 border-terminal-border backdrop-blur-sm">
        <div className="p-4">
          <div className="text-xs font-mono">
            <div className="text-glow-primary font-bold mb-2">LEGEND</div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-status-success"></div>
                <span>Friendly Assets</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-status-critical"></div>
                <span>Hostile Targets</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-status-warning"></div>
                <span>Unknown Status</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-status-info"></div>
                <span>Intelligence</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};