import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, Html, Line, Points } from '@react-three/drei';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
  Ship
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

  // Convert lat/lng to 3D coordinates on sphere
  const latLngToVector3 = (lat: number, lng: number, radius = 2.1) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    
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
      {/* Earth Sphere */}
      <Sphere ref={meshRef} args={[2, 64, 64]}>
        <meshStandardMaterial 
          color="#0a0a0a"
          roughness={0.8}
          metalness={0.2}
          transparent
          opacity={0.9}
        />
      </Sphere>
      
      {/* Wireframe Overlay */}
      <Sphere args={[2.01, 32, 32]}>
        <meshBasicMaterial 
          color="#003322"
          wireframe={true}
          transparent
          opacity={0.3}
        />
      </Sphere>

      {/* Nodes */}
      {nodes.filter(node => visibleLayers.includes(node.type)).map((node) => {
        const position = latLngToVector3(
          (Math.random() - 0.5) * 180, 
          (Math.random() - 0.5) * 360
        );
        
        return (
          <group key={node.id} position={position}>
            <mesh>
              <sphereGeometry args={[0.02, 8, 8]} />
              <meshBasicMaterial color={getNodeColor(node)} />
            </mesh>
            
            {/* Node glow effect */}
            <mesh>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshBasicMaterial 
                color={getNodeColor(node)}
                transparent
                opacity={0.3}
              />
            </mesh>
            
            {/* HTML overlay for labels */}
            <Html
              position={[0, 0.1, 0]}
              style={{
                color: getNodeColor(node),
                fontSize: '10px',
                fontFamily: 'monospace',
                pointerEvents: 'none',
                textAlign: 'center'
              }}
            >
              <div className="bg-terminal-bg/80 px-1 py-0.5 rounded border border-terminal-border">
                {node.label}
              </div>
            </Html>
          </group>
        );
      })}

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

      {/* Atmospheric glow */}
      <Sphere args={[2.3, 32, 32]}>
        <meshBasicMaterial 
          color="#00ff88"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
};

export const TacticalMap3D: React.FC = () => {
  const [visibleLayers, setVisibleLayers] = useState<string[]>([
    'agent', 'facility', 'target', 'shipping', 'air'
  ]);
  
  const [selectedNode, setSelectedNode] = useState<MapNode | null>(null);
  const [mapMode, setMapMode] = useState<'tactical' | 'intelligence' | 'logistics'>('tactical');

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

  const layerControls = [
    { id: 'agent', label: 'Agents', icon: Users, color: '#00ff88' },
    { id: 'facility', label: 'Facilities', icon: Shield, color: '#ff4444' },
    { id: 'target', label: 'Targets', icon: Target, color: '#ff8800' },
    { id: 'threat', label: 'Threats', icon: AlertTriangle, color: '#ff0066' },
    { id: 'satellite', label: 'Satellites', icon: Satellite, color: '#0088ff' },
    { id: 'shipping', label: 'Shipping', icon: Ship, color: '#0088ff' },
    { id: 'air', label: 'Air Routes', icon: Plane, color: '#ff8800' },
    { id: 'communication', label: 'Communications', icon: Radio, color: '#00ff88' }
  ];

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
        style={{ background: 'radial-gradient(circle, #001122 0%, #000000 100%)' }}
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

      {/* Layer Controls */}
      <Card className="absolute top-4 left-4 w-80 bg-terminal-surface/90 border-terminal-border backdrop-blur-sm">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-glow-primary">TACTICAL LAYERS</h3>
            <Badge variant="outline" className="text-xs">
              {visibleLayers.length} ACTIVE
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            {layerControls.map((layer) => (
              <Button
                key={layer.id}
                size="sm"
                variant={visibleLayers.includes(layer.id) ? 'default' : 'outline'}
                onClick={() => toggleLayer(layer.id)}
                className="text-xs h-8 flex items-center gap-2"
              >
                <layer.icon className="w-3 h-3" style={{ color: layer.color }} />
                {layer.label}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Map Controls */}
      <Card className="absolute top-4 right-4 bg-terminal-surface/90 border-terminal-border backdrop-blur-sm">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-4 h-4 text-glow-primary" />
            <h3 className="font-display font-bold text-glow-primary">MAP CONTROLS</h3>
          </div>
          
          <div className="space-y-2">
            <div className="flex gap-2">
              {(['tactical', 'intelligence', 'logistics'] as const).map((mode) => (
                <Button
                  key={mode}
                  size="sm"
                  variant={mapMode === mode ? 'default' : 'outline'}
                  onClick={() => setMapMode(mode)}
                  className="text-xs"
                >
                  {mode.toUpperCase()}
                </Button>
              ))}
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <Button size="sm" variant="outline" className="text-xs">
                <Eye className="w-3 h-3 mr-1" />
                View All
              </Button>
              <Button size="sm" variant="outline" className="text-xs">
                <EyeOff className="w-3 h-3 mr-1" />
                Hide All
              </Button>
            </div>
          </div>
        </div>
      </Card>

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