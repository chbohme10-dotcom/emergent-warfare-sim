import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, Html, Line, Points } from '@react-three/drei';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GLOBAL_LOCATIONS, LocationCategory } from '@/data/globalLocations';
import { ALL_SATELLITE_NODES, SatelliteNode } from '@/data/satelliteComms';
import { MapboxGlobe } from '@/components/Maps/MapboxGlobe';
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
  ShieldCheck,
  Minimize2,
  Maximize2
} from 'lucide-react';

interface MapNode {
  id: string;
  type: 'agent' | 'facility' | 'target' | 'threat' | 'satellite' | 'base' | 'ground_station' | 'relay' | 'deep_space' | 'military' | 'commercial' | 'spy';
  position: [number, number, number];
  label: string;
  classification: 'unclassified' | 'confidential' | 'secret' | 'top_secret';
  status: 'active' | 'inactive' | 'compromised' | 'unknown' | 'classified';
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
  const [earthTexture, setEarthTexture] = useState<THREE.Texture | null>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.01;
    }
  });

  // Load realistic Earth texture
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    // Using NASA Blue Marble texture for realistic Earth representation
    loader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg',
      (texture) => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        setEarthTexture(texture);
      },
      undefined,
      (error) => {
        console.warn('Failed to load Earth texture, using fallback');
        // Fallback: create realistic blue marble style texture
        const canvas = document.createElement('canvas');
        canvas.width = 2048;
        canvas.height = 1024;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Create realistic Earth colors
          const gradient = ctx.createRadialGradient(1024, 512, 0, 1024, 512, 800);
          gradient.addColorStop(0, '#4A90E2');    // Ocean blue
          gradient.addColorStop(0.3, '#2E5B3F');  // Land green
          gradient.addColorStop(0.5, '#8B4513');  // Land brown
          gradient.addColorStop(0.7, '#2E5B3F');  // More land
          gradient.addColorStop(1, '#1A365D');    // Deep ocean
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, 2048, 1024);
          
          // Add some continent-like shapes
          ctx.fillStyle = '#228B22';
          for (let i = 0; i < 20; i++) {
            const x = Math.random() * 2048;
            const y = Math.random() * 1024;
            const radius = Math.random() * 100 + 50;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        const fallbackTexture = new THREE.CanvasTexture(canvas);
        setEarthTexture(fallbackTexture);
      }
    );
  }, []);

  // Convert lat/lng to 3D coordinates on sphere (proper geodetic projection)
  const latLngToVector3 = (lat: number, lng: number, radius = 2.05) => {
    // Convert degrees to radians
    const latRad = (lat * Math.PI) / 180;
    const lngRad = (lng * Math.PI) / 180;
    
    // Spherical to Cartesian conversion for proper globe mapping
    const x = radius * Math.cos(latRad) * Math.cos(lngRad);
    const y = radius * Math.sin(latRad);
    const z = radius * Math.cos(latRad) * Math.sin(lngRad);
    
    return new THREE.Vector3(x, y, z);
  };

  // Generate nodes from global locations database
  const generateNodesFromLocations = () => {
    const generatedNodes: MapNode[] = [];
    
    GLOBAL_LOCATIONS.forEach(category => {
      if (visibleLayers.includes(category.id)) {
        category.subcategories.forEach(subcategory => {
          subcategory.locations.forEach(location => {
            if (location.coordinates) {
              const [lat, lng] = location.coordinates;
              const position = latLngToVector3(lat, lng);
              
              generatedNodes.push({
                id: location.id,
                type: getNodeTypeFromCategory(category.id),
                position: [position.x, position.y, position.z],
                label: location.name,
                classification: location.classification.toLowerCase().replace(' ', '_') as any,
                status: location.status.toLowerCase() as any,
                data: location
              });
            }
          });
        });
      }
    });
    
    return generatedNodes;
  };

  // Generate satellite communication nodes
  const generateSatelliteNodes = () => {
    const satelliteNodes: MapNode[] = [];
    
    if (visibleLayers.includes('satellites')) {
      ALL_SATELLITE_NODES.forEach(satellite => {
        const [lat, lng] = satellite.coordinates;
        const position = latLngToVector3(lat, lng, satellite.altitude ? 2 + (satellite.altitude / 20000) : 2.05);
        
        satelliteNodes.push({
          id: satellite.id,
          type: satellite.type as any,
          position: [position.x, position.y, position.z],
          label: satellite.name,
          classification: satellite.classification,
          status: satellite.status === 'classified' ? 'unknown' : satellite.status as any,
          data: satellite
        });
      });
    }
    
    return satelliteNodes;
  };

  const getNodeTypeFromCategory = (categoryId: string) => {
    switch (categoryId) {
      case 'government_agencies': return 'facility';
      case 'black_sites': return 'threat';
      case 'drug_cartels': return 'target';
      case 'cyber_warfare': return 'threat';
      case 'nuclear_facilities': return 'facility';
      case 'safe_houses': return 'base';
      default: return 'facility';
    }
  };

  const getNodeColor = (node: MapNode) => {
    // Color by classification level
    switch (node.classification) {
      case 'top_secret': return '#ff0066';
      case 'secret': return '#ff4444';
      case 'confidential': return '#ff8800';
      case 'unclassified': return '#00ff88';
      default: return '#ffffff';
    }
  };

  const getNodeSize = (node: MapNode) => {
    switch (node.classification) {
      case 'top_secret': return 0.03;
      case 'secret': return 0.025;
      case 'confidential': return 0.02;
      default: return 0.015;
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

  const allNodes = [...nodes, ...generateNodesFromLocations(), ...generateSatelliteNodes()];

  return (
    <group ref={groupRef}>
      {/* Main Globe with Realistic Earth Texture */}
      <Sphere ref={meshRef} args={[2, 256, 256]}>
        <meshPhongMaterial 
          map={earthTexture}
          color={earthTexture ? "#ffffff" : "#4A90E2"}
          transparent={false}
          opacity={1.0}
          wireframe={false}
          shininess={30}
        />
      </Sphere>

      {/* Atmosphere glow effect */}
      <Sphere args={[2.05, 128, 128]}>
        <meshBasicMaterial 
          color="#88ccff"
          transparent={true}
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Grid lines for coordinate reference */}
      {visibleLayers.includes('grid') && (
        <group>
          {/* Latitude lines */}
          {Array.from({ length: 9 }, (_, i) => {
            const lat = (i - 4) * 30; // -120 to 120 degrees
            const points = [];
            for (let lng = -180; lng <= 180; lng += 10) {
              const pos = latLngToVector3(lat, lng, 2.02);
              points.push(pos);
            }
            return (
              <Line key={`lat-${i}`} points={points} color="#444444" lineWidth={1} opacity={0.3} transparent />
            );
          })}
          
          {/* Longitude lines */}
          {Array.from({ length: 13 }, (_, i) => {
            const lng = (i - 6) * 30; // -180 to 180 degrees
            const points = [];
            for (let lat = -80; lat <= 80; lat += 5) {
              const pos = latLngToVector3(lat, lng, 2.02);
              points.push(pos);
            }
            return (
              <Line key={`lng-${i}`} points={points} color="#444444" lineWidth={1} opacity={0.3} transparent />
            );
          })}
        </group>
      )}

      {/* Render location nodes */}
      {allNodes.map((node) => {
        const [x, y, z] = node.position;
        const size = getNodeSize(node);
        
        return (
          <group key={node.id}>
            {/* Node sphere */}
            <mesh position={[x, y, z]}>
              <sphereGeometry args={[size, 16, 16]} />
              <meshBasicMaterial 
                color={getNodeColor(node)}
                transparent={true}
                opacity={node.status === 'active' ? 0.9 : 0.5}
              />
            </mesh>
            
            {/* Pulsing effect for active high-priority nodes */}
            {node.status === 'active' && node.classification === 'top_secret' && (
              <mesh position={[x, y, z]}>
                <sphereGeometry args={[size * 1.5, 16, 16]} />
                <meshBasicMaterial 
                  color={getNodeColor(node)}
                  transparent={true}
                  opacity={0.2}
                />
              </mesh>
            )}
            
            {/* Node label */}
            <Html position={[x * 1.1, y * 1.1, z * 1.1]} center>
              <div className="text-xs text-terminal-text bg-terminal-bg/80 px-1 py-0.5 rounded border border-terminal-border backdrop-blur-sm">
                {node.label}
              </div>
            </Html>
          </group>
        );
      })}

      {/* Render routes */}
      {routes.map((route) => (
        <Line
          key={route.id}
          points={route.points}
          color={getRouteColor(route)}
          lineWidth={route.active ? 2 : 1}
          transparent={true}
          opacity={route.active ? 0.8 : 0.4}
        />
      ))}
    </group>
  );
};

// Starfield background component
const Starfield = () => {
  const points = useRef<THREE.Points>(null);
  
  useFrame((state, delta) => {
    if (points.current) {
      points.current.rotation.x += delta * 0.0001;
      points.current.rotation.y += delta * 0.0002;
    }
  });

  const starPositions = React.useMemo(() => {
    const positions = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;
    }
    return positions;
  }, []);

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={starPositions.length / 3}
          array={starPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={2} color="#ffffff" />
    </points>
  );
};

export const TacticalMap3D: React.FC = () => {
  const [visibleLayers, setVisibleLayers] = useState<string[]>(['government_agencies', 'satellites', 'grid']);
  const [mapMode, setMapMode] = useState<'2d' | '3d'>('3d');
  const [viewType, setViewType] = useState<'globe' | 'mapbox'>('globe');
  const [isControlsMinimized, setIsControlsMinimized] = useState(false);
  const [isLayersMinimized, setIsLayersMinimized] = useState(false);

  // Sample routes data
  const routes: Route[] = [
    {
      id: 'shipping-1',
      type: 'shipping',
      points: [
        [2.1, 0, 0.5],
        [1.8, 0.3, 1.2],
        [1.5, 0.5, 1.8],
        [1.0, 0.8, 2.0]
      ],
      active: true,
      classification: 'CONFIDENTIAL'
    },
    {
      id: 'air-1',
      type: 'air',
      points: [
        [-1.5, 0.8, 1.2],
        [-1.0, 1.2, 0.8],
        [-0.5, 1.5, 0.3],
        [0.5, 1.8, -0.5]
      ],
      active: false,
      classification: 'SECRET'
    }
  ];

  const nodes: MapNode[] = [];

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
      {/* View Toggle */}
      <Card className="absolute top-4 right-80 z-20 p-2 bg-terminal-bg/90 border-terminal-border backdrop-blur-md">
        <div className="flex gap-1">
          <Button
            variant={viewType === 'globe' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewType('globe')}
            className="text-xs"
          >
            <Globe className="w-3 h-3 mr-1" />
            3D Globe
          </Button>
          <Button
            variant={viewType === 'mapbox' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewType('mapbox')}
            className="text-xs"
          >
            <Map className="w-3 h-3 mr-1" />
            Real Map
          </Button>
        </div>
      </Card>

      {/* Conditional View Rendering */}
      {viewType === 'mapbox' ? (
        <MapboxGlobe 
          visibleLayers={visibleLayers}
          mapMode={mapMode}
          onModeChange={setMapMode}
        />
      ) : (
        <Canvas
          camera={{ 
            position: [0, 0, 8], 
            fov: 45,
            near: 0.1,
            far: 1000 
          }}
          style={{ background: 'radial-gradient(ellipse at center, #001122 0%, #000011 100%)' }}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
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
            minDistance={3}
            maxDistance={50}
            autoRotate={false}
            autoRotateSpeed={0.5}
          />
          
          <Starfield />
        </Canvas>
      )}

      {/* Layer Controls - Minimizable */}
      <Card className={`absolute top-4 left-4 transition-all duration-300 ${
        isLayersMinimized ? 'w-12 h-12' : 'w-80 max-h-96'
      } bg-terminal-bg/90 border-terminal-border backdrop-blur-md overflow-hidden`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            {!isLayersMinimized && (
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-glow-primary" />
                <span className="font-display font-bold text-glow-primary">TACTICAL LAYERS</span>
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
              
              {/* Grid overlay toggle */}
              <div
                className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${
                  visibleLayers.includes('grid') ? 'bg-terminal-surface border border-glow-primary/30' : 'hover:bg-terminal-surface/50'
                }`}
                onClick={() => toggleLayer('grid')}
              >
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-terminal-text" />
                  <span className="text-xs text-terminal-text">Coordinate Grid</span>
                </div>
                {visibleLayers.includes('grid') ? (
                  <Eye className="w-4 h-4 text-glow-primary" />
                ) : (
                  <EyeOff className="w-4 h-4 text-terminal-muted" />
                )}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Map Controls - Minimizable */}
      <Card className={`absolute top-4 right-4 transition-all duration-300 ${
        isControlsMinimized ? 'w-12 h-12' : 'w-64'
      } bg-terminal-bg/90 border-terminal-border backdrop-blur-md overflow-hidden`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            {!isControlsMinimized && (
              <div className="flex items-center gap-2">
                <Map className="w-4 h-4 text-glow-primary" />
                <span className="font-display font-bold text-glow-primary">MAP CONTROLS</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsControlsMinimized(!isControlsMinimized)}
              className="p-1 hover:bg-terminal-surface"
            >
              {isControlsMinimized ? (
                <div className="w-6 h-6 rounded border-2 border-glow-primary flex items-center justify-center">
                  <Map className="w-3 h-3 text-glow-primary" />
                </div>
              ) : (
                <Minimize2 className="w-4 h-4 text-terminal-text" />
              )}
            </Button>
          </div>

          {!isControlsMinimized && (
            <div className="space-y-3">
              <div>
                <label className="text-xs text-terminal-muted mb-2 block">VIEW MODE</label>
                <div className="grid grid-cols-2 gap-1">
                  {[
                    { key: '2d', label: '2D', icon: Map },
                    { key: '3d', label: '3D', icon: Globe }
                  ].map(mode => (
                    <Button
                      key={mode.key}
                      variant={mapMode === mode.key ? "default" : "outline"}
                      size="sm"
                      onClick={() => setMapMode(mode.key as any)}
                      className="text-xs"
                    >
                      <mode.icon className="w-3 h-3 mr-1" />
                      {mode.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Status Display */}
      <Card className="absolute bottom-4 left-4 w-80 bg-terminal-bg/90 border-terminal-border backdrop-blur-md">
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
              <div className="text-glow-primary font-mono uppercase">{viewType} {mapMode}</div>
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