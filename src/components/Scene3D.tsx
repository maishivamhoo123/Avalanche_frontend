import { Canvas } from '@react-three/fiber';
import { Float, Environment, OrbitControls, Text3D, MeshDistortMaterial } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';
import { ParticleSystem, GridBackground } from './ParticleSystem';

interface FloatingCubeProps {
  position: [number, number, number];
  color: string;
  [key: string]: unknown;
}

// Floating 3D GPU/CPU representation
function FloatingCube({ position, color, ...props }: FloatingCubeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position} {...props}>
        <boxGeometry args={[1, 1, 1]} />
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.6}
          distort={0.3}
          speed={2}
          roughness={0.4}
        />
      </mesh>
    </Float>
  );
}

// Animated network connections
function NetworkLines() {
  const points = [
    new THREE.Vector3(-2, 0, 0),
    new THREE.Vector3(0, 2, 0),
    new THREE.Vector3(2, 0, 0),
    new THREE.Vector3(0, -2, 0),
    new THREE.Vector3(-2, 0, 0),
  ];
  
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  
  return (
    <line geometry={geometry}>
      <lineBasicMaterial color="#00bfa5" linewidth={2} />
    </line>
  );
}

// Main 3D Scene Component
export function Scene3D() {
  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      zIndex: -1,
      opacity: 0.4
    }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <Environment preset="night" />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00bfa5" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#1976d2" />
        
        {/* Floating 3D Elements */}
        <FloatingCube position={[-3, 2, 0]} color="#00bfa5" />
        <FloatingCube position={[3, -2, 0]} color="#1976d2" />
        <FloatingCube position={[0, 0, -2]} color="#004d40" />
        
        {/* Network Connections */}
        <NetworkLines />
        
        {/* 3D Text */}
        <Float speed={1} rotationIntensity={0.5}>
          <Text3D
            font="/fonts/helvetiker_regular.typeface.json"
            size={0.5}
            height={0.1}
            position={[0, 3, 0]}
          >
            GPU MARKETPLACE
            <MeshDistortMaterial
              color="#ffffff"
              transparent
              opacity={0.8}
              distort={0.1}
              speed={1}
            />
          </Text3D>
        </Float>
        
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}

// Simple CSS-based 3D background for fallback
export function SimpleBackground3D() {
  return (
    <>
      <GridBackground />
      <ParticleSystem />
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        overflow: 'hidden'
      }}>
        {/* Animated gradient orbs */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(0, 191, 165, 0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          animation: 'float 8s ease-in-out infinite'
        }} />
        
        <div style={{
          position: 'absolute',
          top: '60%',
          right: '15%',
          width: '250px',
          height: '250px',
          background: 'radial-gradient(circle, rgba(25, 118, 210, 0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(30px)',
          animation: 'float 6s ease-in-out infinite reverse'
        }} />
        
        <div style={{
          position: 'absolute',
          bottom: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(0, 77, 64, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(25px)',
          animation: 'float 10s ease-in-out infinite'
        }} />
        
        {/* Geometric shapes */}
        <div style={{
          position: 'absolute',
          top: '30%',
          right: '30%',
          width: '100px',
          height: '100px',
          background: 'linear-gradient(45deg, rgba(0, 191, 165, 0.1), rgba(25, 118, 210, 0.1))',
          transform: 'rotate(45deg)',
          animation: 'rotate 20s linear infinite'
        }} />
        
        <div style={{
          position: 'absolute',
          bottom: '40%',
          left: '20%',
          width: '80px',
          height: '80px',
          background: 'linear-gradient(45deg, rgba(25, 118, 210, 0.1), rgba(0, 77, 64, 0.1))',
          borderRadius: '20px',
          transform: 'rotate(30deg)',
          animation: 'rotate 15s linear infinite reverse'
        }} />
      </div>
    </>
  );
}

// Animation keyframes
const styles = `
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-20px) rotate(120deg); }
  66% { transform: translateY(-10px) rotate(240deg); }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}
