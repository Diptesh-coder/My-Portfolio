import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";

function fibonacciSphere(count, radius = 2.3) {
  const pts = [];
  const offset = 2 / count;
  const increment = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = i * offset - 1 + offset / 2;
    const r = Math.sqrt(1 - y * y);
    const phi = i * increment;
    const x = Math.cos(phi) * r;
    const z = Math.sin(phi) * r;
    pts.push([x * radius, y * radius, z * radius]);
  }
  return pts;
}

function SkillLabel({ position, label, accent }) {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color={accent} />
      </mesh>
      <Html
        center
        distanceFactor={8}
        style={{ pointerEvents: "none" }}
        zIndexRange={[0, 10]}
      >
        <div
          style={{
            color: "#e2e8f0",
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 12,
            letterSpacing: "0.05em",
            padding: "2px 6px",
            background: "rgba(5, 6, 11, 0.7)",
            border: `1px solid ${accent}55`,
            borderRadius: 4,
            whiteSpace: "nowrap",
            transform: "translateY(18px)",
          }}
        >
          {label}
        </div>
      </Html>
    </group>
  );
}

function Orb({ accent, skills }) {
  const group = useRef();
  const positions = useMemo(() => fibonacciSphere(skills.length, 2.3), [skills]);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.25;
      group.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[2.2, 1]} />
        <meshBasicMaterial color={accent} wireframe transparent opacity={0.18} />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.1, 32, 32]} />
        <meshBasicMaterial color="#0b1020" transparent opacity={0.4} />
      </mesh>
      {positions.map((p, i) => (
        <SkillLabel
          key={skills[i].name}
          position={p}
          label={skills[i].name}
          accent={accent}
        />
      ))}
    </group>
  );
}

export default function SkillOrb({ accent = "#22d3ee", skills = [] }) {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.5]}>
      <color attach="background" args={["#070813"]} />
      <ambientLight intensity={0.6} />
      <pointLight position={[3, 3, 3]} intensity={30} color={accent} />
      <pointLight position={[-3, -3, -3]} intensity={20} color="#a78bfa" />
      <Orb accent={accent} skills={skills} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.6}
        rotateSpeed={0.6}
      />
    </Canvas>
  );
}
