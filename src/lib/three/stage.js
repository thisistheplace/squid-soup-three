import React, { useRef, useState, Suspense, useEffect } from 'react'
import { extend, Canvas, useFrame, useThree } from '@react-three/fiber'
import {OrbitControls, OrthographicCamera, Shadow, ContactShadows } from '@react-three/drei'
import FPSStats from 'react-fps-stats'
import * as THREE from 'three'
extend(THREE)

import {Lights} from './lights'
import {Sphere} from './sphere'
import {Wires} from './wires'

const Box = (props) => {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  // useFrame((state, delta) => (ref.current.rotation.x += 0.01))
  useEffect(() => {
    if (ref.current && props.position) {
      const [x, y, z] = props.position
      ref.current.position.set(x, y, z)
    }
  }, [props.position])
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      // {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

const Model = (props) => {
    return (
        <>
            {/* <Box position={[0., 0., 0.]}/> */}
            <Sphere />
            <Wires />
        </>
    )
}

const Stage = (props) => {
  return (
    <div style={{"position": "absolute", "zIndex":"1000", "top":"0px", "left":"0px", "width":"100%", "height":"100%"}}>
      <Canvas shadows style={{'background':'black'}} camera={{position: [0, 0, 10]}}>
          <Lights/>
          <OrbitControls/>
          <axesHelper />
          <Suspense fallback={null}>
            <Model/>
          </Suspense>
          {/* <ContactShadows opacity={1} scale={10} blur={1} far={10} resolution={256} color="#000000" /> */}
      </Canvas>
      <FPSStats/>
    </div>
  )
}

export { Stage }