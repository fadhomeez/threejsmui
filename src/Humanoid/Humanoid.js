import React from "react";
import ReactDOM from "react-dom/client";
import { Canvas, useThree } from "@react-three/fiber";
import { Physics, useBox } from "@react-three/cannon";
import manny from "manny"
import { useFBX } from "@react-three/drei";
import ThirdPersonCharacterControls from "react-three-third-person";
import { Vector3 } from "yuka";

const BASE_ANIMATIONS_PATH =
  "https://mannys-game.s3.amazonaws.com/third-person/animations";

const animationPaths = {
  idle: `Models/anims/Idle.glb`,
  walk: `Models/anims/placeholder/placeholder1.glb`,
  run: `Models/anims/walking.glb`,
  jump: `Models/anims/placeholder/placeholder5.glb`,
  landing: `Models/anims/landing.glb`,
  inAir: `Models/anims/placeholder/placeholder2.glb`,
  backpedal: `Models/anims/back.glb`,
  turnLeft: `Models/anims/walking2.glb`,
  turnRight: `Models/anims/walking3.glb`,
  strafeLeft: `Models/anims/placeholder/placeholder3.glb`,
  strafeRight: `Models/anims/placeholder/placeholder4.glb`,
};

function ThirdPersonCharacter() {
  const mannyObj = useFBX("Models/avatars/mainchar.fbx");


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
      </Canvas>
    </div>
  );
}
