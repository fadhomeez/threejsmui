---
to: src/components/VehicleControls.js
---

import { useRef , useState} from 'react'
import { useFrame } from '@react-three/fiber'
import { useRaycastVehicle } from '@react-three/cannon'
import { useControls } from '../utils/useControls'
import Bmw from '../Models/Bmw'
import Wheel from '../Models/Wheel'
import * as THREE from 'three'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Vector3 } from 'yuka'

function Vehicle({ radius = 0.7, width = 1.2, height = -0.04, front = 1.5, back = -1.3, steer = 0.75, force = 2000, maxBrake = 1e5, ...props }) {
  const chassis = useRef()
  const wheel1 = useRef()
  const wheel2 = useRef()
  const wheel3 = useRef()
  const wheel4 = useRef()
  const controls = useControls()

  const wheelInfo = {
    radius,
    directionLocal: [0, -1, 0],
    suspensionStiffness: 30,
    suspensionRestLength: 0.3,
    maxSuspensionForce: 1e4,
    maxSuspensionTravel: 0.3,
    dampingRelaxation: 10,
    dampingCompression: 4.4,
    axleLocal: [-1, 0, 0],
    chassisConnectionPointLocal: [1, 0, 1],
    useCustomSlidingRotationalSpeed: true,
    customSlidingRotationalSpeed: -30,
    frictionSlip: 2
  }

  const wheelInfo1 = { ...wheelInfo, isFrontWheel: true, chassisConnectionPointLocal: [-width / 2, height, front] }
  const wheelInfo2 = { ...wheelInfo, isFrontWheel: true, chassisConnectionPointLocal: [width / 2, height, front] }
  const wheelInfo3 = { ...wheelInfo, isFrontWheel: false, chassisConnectionPointLocal: [-width / 2, height, back] }
  const wheelInfo4 = { ...wheelInfo, isFrontWheel: false, chassisConnectionPointLocal: [width / 2, height, back] }

  const [vehicle, api] = useRaycastVehicle(() => ({
    chassisBody: chassis,
    wheels: [wheel1, wheel2, wheel3, wheel4],
    wheelInfos: [wheelInfo1, wheelInfo2, wheelInfo3, wheelInfo4],
    indexForwardAxis: 2,
    indexRightAxis: 0,
    indexUpAxis: 1
  }))

  useFrame(() => {
    const { forward, backward, left, right, brake, reset } = controls.current
    for (let e = 2; e < 4; e++) api.applyEngineForce(forward || backward ? force * (forward && !backward ? -1 : 1) : 0, 2)
    for (let s = 0; s < 2; s++) api.setSteeringValue(left || right ? steer * (left && !right ? 1 : -1) : 0, s)
    for (let b = 2; b < 4; b++) api.setBrake(brake ? maxBrake : 0, b)

    if (reset) {
      chassis.current.api.position.set(0, 0.5, 0)
      chassis.current.api.velocity.set(0, 0, 0)
      chassis.current.api.angularVelocity.set(0, 0.5, 0)
      chassis.current.api.rotation.set(0, -Math.PI / 4, 0)
    }
  })


  const [target, setTarget] = useState(new THREE.Vector3());
  const targetRef = useRef(null);

  useFrame ((state) => {
    chassis.current.getWorldPosition(target)
    setTarget(target);
    console.log(target)
    state.camera.lookAt(target);
    state.camera.updateProjectionMatrix();
  })

  return (
    <group ref={vehicle} position={[0, -0.4, 0]}>
      <group ref = {target}>
      <PerspectiveCamera
      makeDefault
      position={[10,5,0]}
      args={[45, 1.2, 1, 1000]}
      onUpdate={(c) => c.updateProjectionMatrix() }/>
      <OrbitControls target = {[10,10,50]}/>
      <Bmw ref={chassis} rotation={props.rotation} position={props.position} angularVelocity={props.angularVelocity} />
      </group>
      <Wheel ref={wheel1} radius={radius} leftSide />
      <Wheel ref={wheel2} radius={radius} />
      <Wheel ref={wheel3} radius={radius} leftSide />
      <Wheel ref={wheel4} radius={radius} />
    </group>
  )
}

export default Vehicle
