import React, { useRef, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { 
  OrthographicCamera, 
  ContactShadows, 
  Environment, 
  Float,
  Text,
  Center
} from "@react-three/drei"
import * as THREE from "three"

// Pinterest-inspired Isometric Theme (Matte & Clean)
const COLORS = {
  land: "#f7f7f0",
  road: "#e8e8e1",
  accent: "#0F5C5C", // Matching website deep teal for consistency
  pin: "#E0A94B",    // Matching website gold for the destination
  building: "#ffffff",
  text: "#6b7280"
}

const Building = ({ position, scale, scrollProgress }) => {
  const meshRef = useRef()
  
  useFrame(() => {
    if (!meshRef.current) return
    const p = scrollProgress ? scrollProgress.get() : 0
    // Subtle parallax growth
    const growth = THREE.MathUtils.lerp(0.8, 1, p)
    meshRef.current.scale.set(1, growth, 1)
    meshRef.current.position.y = (scale * growth) / 2
  })

  return (
    <mesh ref={meshRef} position={[position[0], scale/2, position[2]]} castShadow receiveShadow>
      <boxGeometry args={[1.4, scale, 1.4]} />
      <meshStandardMaterial color={COLORS.building} roughness={0.3} />
    </mesh>
  )
}

const AnimatedRoute = ({ path, scrollProgress }) => {
  const lineRef = useRef()
  const carRef = useRef()
  
  useFrame(() => {
    if (!carRef.current || !lineRef.current) return
    const rawProgress = scrollProgress ? scrollProgress.get() : 0
    const progress = Math.max(0.001, Math.min(rawProgress * 1.5, 0.999))
    
    // Update car position
    const pos = path.getPointAt(progress)
    carRef.current.position.set(pos.x, 0.15, pos.z)
    
    const nextPos = path.getPointAt(Math.min(progress + 0.01, 0.999))
    carRef.current.lookAt(nextPos.x, 0.15, nextPos.z)

    // Update path drawing
    const activePoints = path.getPoints(Math.floor(progress * 200))
    if (activePoints.length > 1) {
      lineRef.current.geometry.setFromPoints(activePoints)
    }
  })

  return (
    <group>
      {/* Red Route Path */}
      <line ref={lineRef} position={[0, 0.02, 0]}>
        <bufferGeometry attach="geometry" />
        <lineBasicMaterial color={COLORS.accent} linewidth={5} />
      </line>

      {/* Stylized Car */}
      <group ref={carRef}>
        <mesh castShadow>
          <boxGeometry args={[0.5, 0.25, 0.8]} />
          <meshStandardMaterial color={COLORS.accent} />
        </mesh>
        <mesh position={[0, 0.2, 0]} castShadow>
          <boxGeometry args={[0.3, 0.15, 0.3]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>
    </group>
  )
}

const MapScene = ({ scrollProgress }) => {
  const { camera } = useThree()
  
  const buildings = useMemo(() => {
    const b = []
    const gridSize = 15
    const spacing = 5
    for (let i = -gridSize; i <= gridSize; i += spacing) {
      for (let j = -gridSize; j <= gridSize; j += spacing) {
        if (Math.abs(i) < 5 && Math.abs(j) < 5) continue
        const height = Math.random() * 4 + 2
        b.push({
          position: [i + (Math.random() - 0.5) * 2, 0, j + (Math.random() - 0.5) * 2],
          scale: height
        })
      }
    }
    return b
  }, [])

  const roadPath = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-20, 0, -15),
      new THREE.Vector3(-10, 0, -15),
      new THREE.Vector3(-10, 0, -2),
      new THREE.Vector3(0, 0, -2),
    ])
  }, [])

  // Ensure camera is looking at center
  useFrame(() => {
    camera.lookAt(0, 0, 0)
  })

  return (
    <>
      <color attach="background" args={[COLORS.land]} />
      
      <ambientLight intensity={1.5} />
      <directionalLight 
        position={[20, 50, 20]} 
        intensity={2} 
        castShadow 
        shadow-mapSize={[1024, 1024]}
      />
      
      <Environment preset="city" />

      {/* Floor */}
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color={COLORS.land} />
      </mesh>

      {/* Buildings */}
      {buildings.map((props, i) => (
        <Building key={i} {...props} scrollProgress={scrollProgress} />
      ))}

      {/* Animated Route */}
      <AnimatedRoute path={roadPath} scrollProgress={scrollProgress} />

      {/* Destination Pin */}
      <group position={[0, 0, 0]}>
        <Float speed={3} floatIntensity={0.5}>
          <mesh position={[0, 2.5, 0]} castShadow>
            <cylinderGeometry args={[0.8, 0.8, 0.2, 32]} />
            <meshStandardMaterial color={COLORS.pin} metalness={0.5} roughness={0.2} />
          </mesh>
          <Text position={[0, 2.5, 0.12]} fontSize={0.5} color="white" bold>
            RESTRO
          </Text>
        </Float>
        <mesh rotation-x={-Math.PI / 2} position={[0, 0.05, 0]}>
          <ringGeometry args={[0.8, 1.2, 32]} />
          <meshBasicMaterial color={COLORS.pin} transparent opacity={0.2} />
        </mesh>
      </group>

      <ContactShadows opacity={0.2} scale={40} blur={2.5} far={10} />
      
      <OrthographicCamera 
        makeDefault 
        position={[40, 40, 40]} 
        zoom={30} 
        near={-100} 
        far={1000} 
      />
    </>
  )
}

const CinematicMap = ({ scrollProgress }) => {
  return (
    <div className="w-full h-full rounded-3xl overflow-hidden bg-[#f7f7f0]">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [40, 40, 40], zoom: 30 }}>
        <MapScene scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  )
}

export default CinematicMap
