import React, { useRef, useEffect, useState } from 'react'
import { extend, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
extend(THREE)

class WireLine extends THREE.Curve {

	constructor( start, finish ) {
		super();
    this.start = start
    this.finish = finish
	}

	getPoint( t, optionalTarget = new THREE.Vector3() ) {
		const tx = this.start.x + (this.finish.x - this.start.x) * t
		const ty = this.start.y + (this.finish.y - this.start.y) * t
		const tz = this.start.z + (this.finish.z - this.start.z) * t
		return optionalTarget.set( tx, ty, tz )
	}
  
}

const Instances = (props) => {
  const ref = useRef()
  const total = props.x * props.z
  var count = 0
  const [nextTime, setNextTime] = useState(0)
  const start = new THREE.Vector3(0, -props.y * props.pacing / 2., 0)
  const finish = new THREE.Vector3(0, props.y * props.spacing / 2., 0)
  const line = new WireLine(start, finish)

  useEffect(() => {
    const offset = new THREE.Vector3(
      props.spacing * props.x / 2.,
      props.spacing * props.y / 2.,
      props.spacing * props.z / 2.
    )
    // Set positions
    for (let z = 0; z < props.z; z++) {
      for (let x = 0; x < props.x; x++) {
        props.temp.position.set(
          x * props.spacing - offset.x,
          props.y * props.spacing - offset.y,
          z * props.spacing - offset.z
        )
        props.temp.updateMatrix()
        ref.current.setMatrixAt(count, props.temp.matrix)
        count++
      }
    }

    // Update the instance
    ref.current.instanceMatrix.needsUpdate = true
  }, [])

  return (
    <instancedMesh ref={ref} args={[null, null, total]}>
      <tubeGeometry parameters={[line, 20, 0.1, 8, true]} />
      <meshPhongMaterial vertexColors={true} />
    </instancedMesh>
  )
}

const Wires = (props) => {
  return (
    <Instances x={50} y ={10} z={50} spacing={10} temp={new THREE.Object3D()}/>
  )
}

export {Wires}

