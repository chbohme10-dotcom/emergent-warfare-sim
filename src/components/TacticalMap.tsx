import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const Globe = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <Sphere ref={meshRef} args={[2, 64, 64]}>
      <meshStandardMaterial 
        color="#0a0a0a" 
        wireframe={true}
        wireframeLinewidth={0.5}
      />
    </Sphere>
  );
};

export const TacticalMap: React.FC = () => {
  return (
    <div className="h-full bg-terminal-bg relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#00ff88" />
        <Globe />
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={2.5}
          maxDistance={10}
        />
      </Canvas>
      
      {/* Overlay UI */}
      <div className="absolute top-4 left-4 bg-terminal-surface/80 p-3 rounded border border-terminal-border">
        <div className="text-xs font-mono space-y-1">
          <div className="text-glow-primary font-bold">TACTICAL OVERVIEW</div>
          <div>Agents: 247 active</div>
          <div>Facilities: 1,847 tracked</div>
          <div>Threats: 23 critical</div>
        </div>
      </div>
    </div>
  );
};