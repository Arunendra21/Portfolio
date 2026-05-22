"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const TECH_TAGS = [
  "React", "Next.js", "Node.js", "Express", "MongoDB", "PostgreSQL",
  "MySQL", "TypeScript", "JavaScript", "Python", "C++", "Docker",
  "Git", "GitHub", "Linux", "GCP", "Firebase", "Vercel",
  "Tailwind", "REST APIs", "KaTeX", "Framer Motion", "GSAP"
];

function Word({ children, position, ...props }: { children: string; position: THREE.Vector3 }) {
  const color = useMemo(() => new THREE.Color(), []);
  const textRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Smooth hover effects inside R3F text
  useFrame(() => {
    if (textRef.current) {
      const mat = textRef.current.material as THREE.MeshBasicMaterial;
      mat.color.lerp(
        color.set(hovered ? "#00f0ff" : "#b923ff"),
        0.1
      );
    }
  });

  return (
    <Text
      ref={textRef}
      position={position}
      fontSize={0.4}
      font="/fonts/share-tech" // Falls back to default monospace cleanly
      anchorX="center"
      anchorY="middle"
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      {...props}
    >
      {children}
    </Text>
  );
}

function Cloud() {
  const groupRef = useRef<THREE.Group>(null);

  // Even spherical tag distribution (Fibonacci Sphere Algorithm)
  const words = useMemo(() => {
    const temp: [THREE.Vector3, string][] = [];
    const tags = TECH_TAGS;
    const numTags = tags.length;
    const phiSpan = Math.PI * (3 - Math.sqrt(5)); // Golden angle in radians

    for (let i = 0; i < numTags; i++) {
      const y = 1 - (i / (numTags - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = phiSpan * i;

      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;

      // Position sphere radius of 3.2 units
      const pos = new THREE.Vector3(x * 3.2, y * 3.2, z * 3.2);
      temp.push([pos, tags[i]]);
    }
    return temp;
  }, []);

  // Rotate sphere smoothly
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
      groupRef.current.rotation.x += 0.0015;
    }
  });

  return (
    <group ref={groupRef}>
      {words.map(([pos, word], idx) => (
        <Word key={idx} position={pos}>
          {word}
        </Word>
      ))}
    </group>
  );
}

export default function TechSphere() {
  return (
    <div className="w-full h-[320px] sm:h-[400px] relative select-none">
      {/* 3D R3F Canvas */}
      <Canvas camera={{ position: [0, 0, 7], fov: 60 }} dpr={[1, 2]}>
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <Cloud />
        <OrbitControls enableZoom={false} enablePan={false} autoRotateSpeed={0.5} />
      </Canvas>

      {/* Futuristic targeting widgets overlaid on R3F Canvas */}
      <div className="absolute top-2 left-2 border border-cyber-cyan/30 px-2 py-0.5 font-mono text-[8px] text-cyber-cyan/60 rounded">
        3D_TAG_CLOUD_ACTIVE
      </div>
      <div className="absolute bottom-2 right-2 font-mono text-[8px] text-cyber-cyan/40">
        DRAG_TO_ROTATE_MESH
      </div>
    </div>
  );
}
