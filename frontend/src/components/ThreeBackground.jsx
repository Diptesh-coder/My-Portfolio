import React, { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function ParticleField({ count = 1500 }) {
  const ref = useRef();
  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, [count]);

  const mat = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: "#67e8f9",
        size: 0.035,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
      }),
    []
  );

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.03;
      ref.current.rotation.x += delta * 0.01;
    }
  });

  return <points ref={ref} geometry={geom} material={mat} />;
}

function FloatingShapes({ mouse }) {
  const group = useRef();
  useFrame(() => {
    if (!group.current) return;
    const mx = mouse.current?.x || 0;
    const my = mouse.current?.y || 0;
    group.current.rotation.y += (mx * 0.4 - group.current.rotation.y) * 0.03;
    group.current.rotation.x += (-my * 0.3 - group.current.rotation.x) * 0.03;
  });

  return (
    <group ref={group} position={[3.5, 0, 0]}>
      <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
        <mesh position={[0.4, 1.2, 0]}>
          <icosahedronGeometry args={[1.0, 1]} />
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#0891b2"
            emissiveIntensity={0.55}
            wireframe
          />
        </mesh>
      </Float>

      <Float speed={1.1} rotationIntensity={0.8} floatIntensity={1.4}>
        <mesh position={[2.0, -0.4, -0.4]}>
          <octahedronGeometry args={[0.85, 0]} />
          <meshStandardMaterial
            color="#a78bfa"
            emissive="#6d28d9"
            emissiveIntensity={0.55}
            metalness={0.6}
            roughness={0.2}
          />
        </mesh>
      </Float>

      <Float speed={0.9} rotationIntensity={0.4} floatIntensity={1.0}>
        <mesh position={[-0.6, -1.2, -1.0]} rotation={[Math.PI / 2.2, 0, 0]}>
          <torusGeometry args={[0.95, 0.07, 16, 120]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#0ea5e9"
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.25}
          />
        </mesh>
      </Float>

      <Float speed={1.6} rotationIntensity={0.6} floatIntensity={1.6}>
        <mesh position={[1.4, 2.0, 0.4]}>
          <torusKnotGeometry args={[0.4, 0.11, 128, 20]} />
          <meshStandardMaterial
            color="#67e8f9"
            emissive="#22d3ee"
            emissiveIntensity={0.45}
            metalness={0.6}
            roughness={0.2}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function ThreeBackground() {
  const mouse = useRef({ x: 0, y: 0 });

  const handleMove = (e) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    mouse.current.x = x;
    mouse.current.y = y;
  };

  return (
    <div
      className="absolute inset-0"
      onMouseMove={handleMove}
      onTouchMove={(e) => {
        if (e.touches[0]) {
          const t = e.touches[0];
          mouse.current.x = (t.clientX / window.innerWidth) * 2 - 1;
          mouse.current.y = (t.clientY / window.innerHeight) * 2 - 1;
        }
      }}
    >
      <Canvas camera={{ position: [0, 0, 6], fov: 55 }} dpr={[1, 1.5]}>
        <color attach="background" args={["#05060b"]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={60} color="#22d3ee" />
        <pointLight position={[-5, -3, -2]} intensity={40} color="#a78bfa" />
        <Suspense fallback={null}>
          <ParticleField count={1400} />
          <FloatingShapes mouse={mouse} />
        </Suspense>
      </Canvas>
    </div>
  );
}
