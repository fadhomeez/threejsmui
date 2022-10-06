---
to: src/Models/Bmw.js
---

import { forwardRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useBox } from '@react-three/cannon'

useGLTF.preload('https://dl.dropbox.com/s/80x1zpykdwygmw1/Bmw.glb')

const Bmw = forwardRef(({ args = [1.7, 1, 4], mass = 500, ...props }, ref) => {
  const { nodes, materials } = useGLTF('https://dl.dropbox.com/s/80x1zpykdwygmw1/Bmw.glb')
  const [, api] = useBox(() => ({ mass, args, allowSleep: false, onCollide: (e) => console.log('bonk', e.body.userData), ...props }), ref)
  return (
    <mesh ref={ref} api={api} castShadow>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
        <group position={[0, -0.55, 0]}>
          <primitive object={nodes.GLTF_created_0_rootJoint} />
          <skinnedMesh geometry={nodes.Object_10.geometry} material={materials.Black_plastic} skeleton={nodes.Object_10.skeleton} />
          <skinnedMesh geometry={nodes.Object_11.geometry} material={materials['Underbody.001']} skeleton={nodes.Object_11.skeleton} />
          <skinnedMesh geometry={nodes.Object_12.geometry} material={materials.Interior_1} skeleton={nodes.Object_12.skeleton} />
          <skinnedMesh geometry={nodes.Object_13.geometry} material={materials.Interior_2} skeleton={nodes.Object_13.skeleton} />
          <skinnedMesh geometry={nodes.Object_14.geometry} material={materials.Tail_lights} skeleton={nodes.Object_14.skeleton} />
          <skinnedMesh geometry={nodes.Object_15.geometry} material={materials['Rubber.002']} skeleton={nodes.Object_15.skeleton} />
          <skinnedMesh geometry={nodes.Object_16.geometry} material={materials['Glass.001']} skeleton={nodes.Object_16.skeleton} />
          <skinnedMesh geometry={nodes.Object_17.geometry} material={materials.Black_window_trim} skeleton={nodes.Object_17.skeleton} />
          <skinnedMesh geometry={nodes.Object_18.geometry} material={materials['Reflector.001']} skeleton={nodes.Object_18.skeleton} />
          <skinnedMesh geometry={nodes.Object_20.geometry} material={materials.Emblem} skeleton={nodes.Object_20.skeleton} />
          <skinnedMesh geometry={nodes.Object_22.geometry} material={materials.Black_plastic} skeleton={nodes.Object_22.skeleton} />
          <skinnedMesh geometry={nodes.Object_23.geometry} material={materials['Steel.002']} skeleton={nodes.Object_23.skeleton} />
          <skinnedMesh geometry={nodes.Object_24.geometry} material={materials['Rubber.002']} skeleton={nodes.Object_24.skeleton} />
          <skinnedMesh geometry={nodes.Object_25.geometry} material={materials['Reflector.001']} skeleton={nodes.Object_25.skeleton} />
          <skinnedMesh geometry={nodes.Object_30.geometry} material={materials.Plate} skeleton={nodes.Object_30.skeleton} />
          <skinnedMesh geometry={nodes.Object_7.geometry} material={materials.Red_paint_metallic} skeleton={nodes.Object_7.skeleton} />
          <skinnedMesh geometry={nodes.Object_8.geometry} material={materials['Chrom.002']} skeleton={nodes.Object_8.skeleton} />
          <skinnedMesh geometry={nodes.Object_9.geometry} material={materials.Orange_plastic} skeleton={nodes.Object_9.skeleton} />
          </group>
        </group>
      </group>
    </mesh>
  )
});

export default Bmw

