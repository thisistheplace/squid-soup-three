import React, {useRef} from 'react';

const Lights = (props) => {
  const group = useRef()
  return (
    <group ref={group}>
      {/* <hemisphereLight color="white" groundColor="black" intensity={0.75} position={[0, 0, 0]}/> */}
      {/* <spotLight position={[50, 50, 10]} intensity={0.5} angle={0.2} penumbra={1} /> */}
      <ambientLight color={0x101010} intensity={10}/>
      <pointLight position={[0, 0, 0]} color={0xffffff} intensity={0.5} distance={1000} decay={1} castShadow={true}/>
      {/* <spotLight position={[0, 500, 1000]} color={0xffffff} intensity={0.5}/> */}
    </group>
  )
}

export {Lights}