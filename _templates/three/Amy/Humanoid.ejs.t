---
to: src/components/Humanoid/Humanoid.js
---

import React from "react";
import ReactDOM from "react-dom/client";
import { Canvas, useThree } from "@react-three/fiber";
import { Physics, useBox } from "@react-three/cannon";
import { useFBX } from "@react-three/drei";
import ThirdPersonCharacterControls from "react-three-third-person";
import { Html, useProgress } from '@react-three/drei'
import { Suspense } from "react";

const animationPaths = {
  idle: `https://dl.dropbox.com/s/219yljfdqrtwgmh/Idle.glb`,
  walk: `https://dl.dropbox.com/s/u7umu2ryx4q8ry3/placeholder1.glb`,
  run: `https://dl.dropbox.com/s/4rcztul4zg9g7lh/walking.glb`,
  jump: `https://dl.dropbox.com/s/5p8xt37efc6cz1v/jump.glb`,
  landing: `https://dl.dropbox.com/s/z20h0zqsy45go44/landing.glb`,
  inAir: `https://dl.dropbox.com/s/tf50hqhczhtbfvi/placeholder2.glb`,
  backpedal: `https://dl.dropbox.com/s/h0ftard9qw2317y/back.glb`,
  turnLeft: `https://dl.dropbox.com/s/h6ew3eol8prkayp/walking2.glb`,
  turnRight: `https://dl.dropbox.com/s/9ljf2slbep8fzsg/walking3.glb`,
  strafeLeft: `https://dl.dropbox.com/s/10fbekryzsnh6ol/placeholder3.glb`,
  strafeRight: `https://dl.dropbox.com/s/yu26o9hgzkn2ttt/placeholder4.glb`,
};

function ThirdPersonCharacter() {
  const mannyObj = useFBX("https://dl.dropbox.com/s/br52ih08pz1axfd/mainchar.fbx");

  return (

    <ThirdPersonCharacterControls
      cameraOptions={{
        yOffset: 1.6,
        minDistance: 0.6,
        maxDistance: 7,
        collisionFilterMask: 2,
      }}
      characterObj={mannyObj}

      animationPaths={animationPaths}
    />
  );
}

function Lighting() {
  return (
    <>
      <hemisphereLight
        skyColor={0xffffff}
        groundColor={0x444444}
        position={[0, 0, 0]}
      />
      <directionalLight
        color={0xffffff}
        intensity={0.25}
        castShadow
        position={[0, 200, 100]}
      />
    </>
  );
}

function Floor() {
  const [ref] = useBox(() => ({
    type: "Static",
    args: [25, 0.2, 25],
    mass: 0,
    material: {
      friction: 0,
      name: "floor",
    },
    collisionFilterGroup: 2,
  }));
  return (
    <group>
      <mesh ref={ref}>
        <boxGeometry name="floor-box" />
        <meshPhongMaterial opacity={0} transparent />
      </mesh>
      <gridHelper args={[25, 25]} />
    </group>
  );
}

function Wall({ args, ...props }) {
  const [ref] = useBox(() => ({
    type: "Static",
    args,
    mass: 0,
    material: {
      friction: 0.3,
      name: "wall",
    },
    collisionFilterGroup: 2,
    ...props,
  }));
  return (
    <mesh receiveShadow ref={ref} {...props}>
      <boxGeometry args={args} />
      <meshPhongMaterial color="white" opacity={0.8} transparent />
    </mesh>
  );
}


export default function Humanoid() {

  function Loader() {
    const { progress } = useProgress()
    return <Html center>{progress} % loaded</Html>
  }

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Canvas
        flat
        camera={{
          fov: 75,
          near: 0.1,
          far: 3800,
          position: [0, 15, 11],
        }}
      >
        <Suspense fallback={<Loader />}>
          <Physics gravity={[0, -35, 0]}>
            <ThirdPersonCharacter />
            <Wall args={[25, 3, 0.2]} position={[0, 1.4, -12.6]} />
            <Wall args={[25, 3, 0.2]} position={[0, 1.4, 12.6]} />
            <Wall
              args={[25, 3, 0.2]}
              rotation={[0, -Math.PI / 2, 0]}
              position={[12.6, 1.4, 0]}
            />
            <Wall
              args={[25, 3, 0.2]}
              rotation={[0, -Math.PI / 2, 0]}
              position={[-12.6, 1.4, 0]}
            />
            <Floor />
          </Physics>
          <Lighting />
        </Suspense>
      </Canvas>

    </div>
  );
}
