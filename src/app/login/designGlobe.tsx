"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Sphere, Line, Text, Float } from "@react-three/drei"
import { useRef, useMemo } from "react"
import type * as THREE from "three"

function GlobePoints() {
  const points = useMemo(() => {
    const pts: [number, number, number][] = []
    for (let i = 0; i < 200; i++) {
      const phi = Math.acos(-1 + (2 * i) / 200)
      const theta = Math.sqrt(200 * Math.PI) * phi
      pts.push([2 * Math.cos(theta) * Math.sin(phi), 2 * Math.sin(theta) * Math.sin(phi), 2 * Math.cos(phi)])
    }
    return pts
  }, [])

  return (
    <group>
      {points.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial color="#00D9FF" emissive="#00D9FF" emissiveIntensity={0.5} />
        </mesh>
      ))}
    </group>
  )
}

function ConnectionLines() {
  const lines = useMemo(() => {
    const connections: Array<[[number, number, number], [number, number, number]]> = []
    for (let i = 0; i < 15; i++) {
      const phi1 = Math.random() * Math.PI
      const theta1 = Math.random() * Math.PI * 2
      const phi2 = Math.random() * Math.PI
      const theta2 = Math.random() * Math.PI * 2
      connections.push([
        [2 * Math.cos(theta1) * Math.sin(phi1), 2 * Math.sin(theta1) * Math.sin(phi1), 2 * Math.cos(phi1)],
        [2 * Math.cos(theta2) * Math.sin(phi2), 2 * Math.sin(theta2) * Math.sin(phi2), 2 * Math.cos(phi2)],
      ])
    }
    return connections
  }, [])

  return (
    <group>
      {lines.map((line, i) => (
        <Line key={i} points={line} color="#01C3E5" lineWidth={1} opacity={0.5} transparent />
      ))}
    </group>
  )
}

function RotatingGlobe() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <Sphere args={[1.95, 32, 32]}>
        <meshStandardMaterial color="#0a1628" transparent opacity={0.3} wireframe />
      </Sphere>
      <GlobePoints />
      <ConnectionLines />
    </group>
  )
}

export function Design1Globe() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-[#0a1628] via-[#0d1f35] to-[#0a1628]">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00D9FF" />
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
          <RotatingGlobe />
        </Float>
        <Text position={[0, -3, 0]} fontSize={0.3} color="#00D9FF" anchorX="center">
       KVS
        </Text>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}
