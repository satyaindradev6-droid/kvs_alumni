"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Sphere, Line, Text, Float } from "@react-three/drei"
import { useRef, useMemo, useEffect, useState } from "react"
import type * as THREE from "three"

function useThemeColor() {
  const [themeColor, setThemeColor] = useState("#66E9FF")
  const [themeColor2, setThemeColor2] = useState("#4DD8F0")

  useEffect(() => {
    const updateColors = () => {
      const primary = getComputedStyle(document.documentElement).getPropertyValue('--theme-primary').trim()
      const primary2 = getComputedStyle(document.documentElement).getPropertyValue('--theme-primary2').trim()
      if (primary) setThemeColor(primary)
      if (primary2) setThemeColor2(primary2)
    }
    
    updateColors()
    
    // Listen for theme changes
    const observer = new MutationObserver(updateColors)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    
    return () => observer.disconnect()
  }, [])

  return { themeColor, themeColor2 }
}

function GlobePoints({ color }: { color: string }) {
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
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
        </mesh>
      ))}
    </group>
  )
}

function ConnectionLines({ color }: { color: string }) {
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
        <Line key={i} points={line} color={color} lineWidth={1} opacity={0.3} transparent />
      ))}
    </group>
  )
}

function RotatingGlobe({ primaryColor, secondaryColor }: { primaryColor: string; secondaryColor: string }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <Sphere args={[1.95, 32, 32]}>
        <meshStandardMaterial color={secondaryColor} transparent opacity={0.15} wireframe />
      </Sphere>
      <GlobePoints color={primaryColor} />
      <ConnectionLines color={primaryColor} />
    </group>
  )
}

function StableText({ color }: { color: string }) {
  const textRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (textRef.current) {
      // Keep the text facing the camera
      textRef.current.quaternion.copy(state.camera.quaternion)
    }
  })

  return (
    <Text
      ref={textRef}
      position={[0, 0, 0]}
      fontSize={0.7}
      color={color}
      anchorX="center"
      anchorY="middle"
      fontWeight={900}
      letterSpacing={0.05}
    >
      KVS
    </Text>
  )
}

export function Design1Globe() {
  const { themeColor, themeColor2 } = useThemeColor()

  return (
    <div className="w-full h-full bg-white">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color={themeColor} />
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
          <RotatingGlobe primaryColor={themeColor} secondaryColor={themeColor2} />
        </Float>
        {/* Stable KVS text in center */}
        <StableText color={themeColor} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}
