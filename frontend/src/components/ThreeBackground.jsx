import React, { Suspense, useMemo, useRef, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

// --- Module-level constants (avoid recreating on each render) ---
const PARTICLE_COUNT = 1400;
const PARTICLE_RADIUS_BASE = 6;
const PARTICLE_RADIUS_RANGE = 5;
const PARTICLE_COLOR = "#67e8f9";
const PARTICLE_SIZE = 0.035;
const PARTICLE_OPACITY = 0.85;

const CAMERA_POSITION = [0, 0, 6];
const CAMERA_FOV = 55;
const CANVAS_DPR = [1, 1.5];
const BG_COLOR = "#05060b";

const LIGHT_KEY_POS = [5, 5, 5];
const LIGHT_FILL_POS = [-5, -3, -2];
const LIGHT_KEY_INTENSITY = 60;
const LIGHT_FILL_INTENSITY = 40;
const LIGHT_KEY_COLOR = "#22d3ee";
const LIGHT_FILL_COLOR = "#a78bfa";

const SHAPE_GROUP_POS = [3.5, 0, 0];

const FLOATING_SHAPES = [
  {
    id: "icosa",
    floatSpeed: 1.4,
    rotationIntensity: 0.6,
    floatIntensity: 1.2,
    position: [0.4, 1.2, 0],
    geometry: "icosahedron",
    args: [1.0, 1],
    material: {
      color: "#22d3ee",
      emissive: "#0891b2",
      emissiveIntensity: 0.55,
      wireframe: true,
    },
  },
  {
    id: "octa",
    floatSpeed: 1.1,
    rotationIntensity: 0.8,
    floatIntensity: 1.4,
    position: [2.0, -0.4, -0.4],
    geometry: "octahedron",
    args: [0.85, 0],
    material: {
      color: "#a78bfa",
      emissive: "#6d28d9",
      emissiveIntensity: 0.55,
      metalness: 0.6,
      roughness: 0.2,
    },
  },
  {
    id: "torus",
    floatSpeed: 0.9,
    rotationIntensity: 0.4,
    floatIntensity: 1.0,
    position: [-0.6, -1.2, -1.0],
    rotation: [Math.PI / 2.2, 0, 0],
    geometry: "torus",
    args: [0.95, 0.07, 16, 120],
    material: {
      color: "#38bdf8",
      emissive: "#0ea5e9",
      emissiveIntensity: 0.5,
      metalness: 0.8,
      roughness: 0.25,
    },
  },
  {
    id: "knot",
    floatSpeed: 1.6,
    rotationIntensity: 0.6,
    floatIntensity: 1.6,
    position: [1.4, 2.0, 0.4],
    geometry: "torusKnot",
    args: [0.4, 0.11, 128, 20],
    material: {
      color: "#67e8f9",
      emissive: "#22d3ee",
      emissiveIntensity: 0.45,
      metalness: 0.6,
      roughness: 0.2,
    },
  },
];

// --- Helpers ---
function buildSphericalPositions(count) {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = PARTICLE_RADIUS_BASE + Math.random() * PARTICLE_RADIUS_RANGE;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    arr[i * 3 + 2] = r * Math.cos(phi);
  }
  return arr;
}

function buildParticleGeometry(count) {
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(buildSphericalPositions(count), 3));
  return g;
}

function buildParticleMaterial() {
  return new THREE.PointsMaterial({
    color: PARTICLE_COLOR,
    size: PARTICLE_SIZE,
    sizeAttenuation: true,
    transparent: true,
    opacity: PARTICLE_OPACITY,
    depthWrite: false,
  });
}

// --- Sub-components ---
function ParticleField({ count = PARTICLE_COUNT }) {
  const ref = useRef();
  const geom = useMemo(() => buildParticleGeometry(count), [count]);
  const mat = useMemo(() => buildParticleMaterial(), []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.03;
      ref.current.rotation.x += delta * 0.01;
    }
  });

  return <points ref={ref} geometry={geom} material={mat} />;
}

function ShapeGeometry({ kind, args }) {
  switch (kind) {
    case "icosahedron":
      return <icosahedronGeometry args={args} />;
    case "octahedron":
      return <octahedronGeometry args={args} />;
    case "torus":
      return <torusGeometry args={args} />;
    case "torusKnot":
      return <torusKnotGeometry args={args} />;
    default:
      return null;
  }
}

function FloatingShape({ shape }) {
  return (
    <Float
      speed={shape.floatSpeed}
      rotationIntensity={shape.rotationIntensity}
      floatIntensity={shape.floatIntensity}
    >
      <mesh position={shape.position} rotation={shape.rotation}>
        <ShapeGeometry kind={shape.geometry} args={shape.args} />
        <meshStandardMaterial {...shape.material} />
      </mesh>
    </Float>
  );
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
    <group ref={group} position={SHAPE_GROUP_POS}>
      {FLOATING_SHAPES.map((s) => (
        <FloatingShape key={s.id} shape={s} />
      ))}
    </group>
  );
}

function Scene({ mouse }) {
  return (
    <>
      <color attach="background" args={[BG_COLOR]} />
      <ambientLight intensity={0.5} />
      <pointLight
        position={LIGHT_KEY_POS}
        intensity={LIGHT_KEY_INTENSITY}
        color={LIGHT_KEY_COLOR}
      />
      <pointLight
        position={LIGHT_FILL_POS}
        intensity={LIGHT_FILL_INTENSITY}
        color={LIGHT_FILL_COLOR}
      />
      <Suspense fallback={null}>
        <ParticleField />
        <FloatingShapes mouse={mouse} />
      </Suspense>
    </>
  );
}

// --- Main component ---
export default function ThreeBackground() {
  const mouse = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!e.touches[0]) return;
    const t = e.touches[0];
    mouse.current.x = (t.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = (t.clientY / window.innerHeight) * 2 - 1;
  }, []);

  return (
    <div
      className="absolute inset-0"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      <Canvas
        camera={{ position: CAMERA_POSITION, fov: CAMERA_FOV }}
        dpr={CANVAS_DPR}
      >
        <Scene mouse={mouse} />
      </Canvas>
    </div>
  );
}
