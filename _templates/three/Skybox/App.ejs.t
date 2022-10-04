---
to: src/App.js
---

import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics, useCylinder, usePlane , useBox, useSphere } from '@react-three/cannon'
import { OrbitControls, Environment } from '@react-three/drei'
import Vehicle from './components/VehicleControls'
import "./App.css"

export default function App() {
  return (
    <>
      <Canvas dpr={[1, 1.5]} shadows camera={{ position: [0, 5, 15], fov: 50 }}>
        <fog attach="fog" args={['#171720', 10, 50]} />
        <color attach="background" args={['#171720']} />
        <ambientLight intensity={0.1} />
        <spotLight position={[10, 10, 10]} angle={0.5} intensity={1} castShadow penumbra={1} />
        <Physics broadphase="SAP" contactEquationRelaxation={4} friction={1e-3} allowSleep>
          <Plane rotation={[-Math.PI / 2, 0, 0]} userData={{ id: 'floor' }} />
          <Vehicle position={[0, 2, 0]} rotation={[0, -Math.PI / 4, 0]} angularVelocity={[0, 0.5, 0]} wheelRadius={0.3} />
          <Box position={[7, 2.5, -5]} userData={{ id: 'Box-3' }} />
        </Physics>
        <Suspense fallback={null}>
          <Environment preset="<%=environment%>" />
        </Suspense>
        <OrbitControls />
      </Canvas>
      <div style={{ position: 'absolute', top: 30, left: 40 }}>
        <pre>
          Must run fullscreen!
          <br />
          WASD to drive, space to brake
          <br />R to reset
        </pre>
      </div>
    </>
  )
}

function Plane(props) {
  const [ref] = usePlane(() => ({ type: 'Static', material: 'ground', ...props }))
  return (
    <group ref={ref}>
      <mesh receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#303030" />
      </mesh>
    </group>
  )
}

function Pillar({ args = [0.7, 0.7, 5, 16], ...props }) {
  const [ref] = useCylinder(() => ({ mass: 10, args, ...props }))
  return (
    <mesh ref={ref} castShadow>
      <cylinderGeometry args={args} />
      <meshNormalMaterial />
    </mesh>
  )
}

  function Box({ args = [5, 5, 5], ...props }) {
    const [ref] = useBox(() => ({ mass: 10, args, ...props }))
    return (
      <mesh ref={ref} castShadow>
        <boxGeometry args={args} />
        <meshStandardMaterial color = "#FFFFFF" />
      </mesh>
    )
  
}
