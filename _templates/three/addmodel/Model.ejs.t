---
to: src/components/Model.js
---

import * as THREE from "three"
import React, { useEffect, useRef, useState } from 'react'
import { useGLTF, PerspectiveCamera, useAnimations } from '@react-three/drei'
import { useFrame, useThree } from "@react-three/fiber"

export default function Model({scroll, ...props}) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/<%=filename%>.gltf')
  const [hovered, set] = useState()
  const { actions } = useAnimations(animations, group)

  useEffect(() => void (actions["<%=animname%>"].play().paused = true), [])

  useFrame((state) => {
    actions["<%=animname%>"].time = THREE.MathUtils.lerp(actions["<%=animname%>"].time, actions["<%=animname%>"].getClip().duration * scroll.current, 0.05) 
    console.log( ); })
  return (
    <group ref={group} {...props} dispose={null}>
      

    </group>
  )
}

useGLTF.preload('<%=filename%>.gltf')
