import React, { useRef, useEffect, useState } from 'react'
import { extend, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
extend(THREE)

const PointLights = (props) => {
  const ref = useRef()

  const sphere = new THREE.SphereGeometry(1)

  console.log(sphere)

  const geometry = new THREE.InstancedBufferGeometry()
  THREE.BufferGeometry.prototype.copy.call( geometry, sphere )

  var defaultTransform = new THREE.Matrix4()
    .makeRotationX( Math.PI )
    .multiply( new THREE.Matrix4().makeScale( 7, 7, 7 ) )

  geometry.applyMatrix4( defaultTransform )

  const material = new THREE.MeshPhongMaterial()

  // Assign random colors to the blossoms.
  var _color = new THREE.Color()
  var color = new Float32Array( props.count * 3 )
  var pallette = [ 0xF20587, 0xF2D479, 0xF2C879, 0xF2B077, 0xF24405 ]

  for ( var i = 0; i < props.count; i ++ ) {

    _color.setHex( pallette[ Math.floor( Math.random() * pallette.length ) ] )
    _color.toArray( color, i * 3 )

  }

  geometry.setAttribute( 'color', new THREE.InstancedBufferAttribute( color, 3 ) )
  material.vertexColors = true

  console.log(geometry)

  // const mesh = new THREE.InstancedMesh( geometry, material, props.count )

  // Instance matrices will be updated every frame.
  // mesh.instanceMatrix.setUsage( THREE.DynamicDrawUsage )

  return (
    <instancedMesh ref={ref} geometry={geometry} material={material} count={props.count} instanceMatrix/>
    // <mesh geometry={sphere} material={material}/>
  )
}

const Instances = (props) => {
  const ref = useRef()
  const total = props.x * props.y * props.z
  var count = 0
  const [nextTime, setNextTime] = useState(0)

  useEffect(() => {
    const offset = new THREE.Vector3(
      props.spacing * props.x / 2.,
      props.spacing * props.y / 2.,
      props.spacing * props.z / 2.
    )
    // Set positions
    for (let z = 0; z < props.z; z++) {
      for (let x = 0; x < props.x; x++) {
        for (let y = 0; y < props.y; y++) {
          props.temp.position.set(
            x * props.spacing - offset.x,
            y * props.spacing - offset.y,
            z * props.spacing - offset.z
          )
          props.temp.updateMatrix()
          ref.current.setMatrixAt(count, props.temp.matrix)
          count++
        }
      }
    }

    // Add color array
    var _color = new THREE.Color()
    var color = new Float32Array( total * 3 )
    var pallette = [ 0xF20587, 0xF2D479, 0xF2C879, 0xF2B077, 0xF24405 ]
  
    var shininess = new Float32Array( total )

    for ( var i = 0; i < total; i ++ ) {
  
      _color.setHex( pallette[ Math.floor( Math.random() * pallette.length ) ] )
      _color.toArray( color, i * 3 )
      shininess[i] = 1
  
    }
    ref.current.geometry.setAttribute( 'color', new THREE.InstancedBufferAttribute( color, 3 ) )
    ref.current.geometry.setAttribute( 'shininess', new THREE.InstancedBufferAttribute( shininess, 1 ) )

    // Update the instance
    ref.current.instanceMatrix.needsUpdate = true
  }, [])

  useFrame((state, delta, xrFrame) => {
      if (state.clock.elapsedTime < nextTime){
        return
      }
      // Add color array
      var _color = new THREE.Color()
      var color = new Float32Array( total * 3 )
      var pallette = [ 0xF20587, 0xF2D479, 0xF2C879, 0xF2B077, 0xF24405 ]
  
      for ( var i = 0; i < total; i ++ ) {
    
        _color.setHex( pallette[ Math.floor( Math.random() * pallette.length ) ] )
        _color.toArray( color, i * 3 )
    
      }
      ref.current.geometry.setAttribute( 'color', new THREE.InstancedBufferAttribute( color, 3 ) )
  
      // Update the instance
      ref.current.instanceMatrix.needsUpdate = true
      setNextTime(nextTime + 0.5)
  })

  return (
    <instancedMesh ref={ref} args={[null, null, total]}>
      <sphereGeometry parameters={[1.0]} />
      <meshPhongMaterial vertexColors={true} />
    </instancedMesh>
  )
}

const Sphere = (props) => {
  
  // useEffect(() => {
  //   // Set positions
  //   for (let i = 0; i < count; i++) {
  //     temp.position.set(Math.random(), Math.random(), Math.random())
  //     temp.updateMatrix()
  //     ref.current.setMatrixAt(i, temp.matrix)
  //   }
  //   // Update the instance
  //   ref.current.instanceMatrix.needsUpdate = true
  // }, [])

  return (
    // <mesh ref={ref}>
    //   <boxGeometry args={[1, 1, 1]} />
    //   <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    // </mesh>
    // <PointLights count={2} />
    <Instances x={50} y ={10} z={50} spacing={10} temp={new THREE.Object3D()}/>
  )
}

export {Sphere}

