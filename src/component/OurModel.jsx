// import React from 'react'
// import { Canvas } from 'react-three-fiber'
// import{useGLTF, PresentationControls,Stage} from '@react-three/drei'


// function Model(props){
//   const{scene}=useGLTF('./bitcoin.glb')
//   return <primitive object={scene}{...props}/>
// }

// const OurModel=()=> {
//   return (
//     <div>
//       <Canvas dpr={[1,2]} shadows camera={{fov:45}} style={{position:'absolute', top:'8%'}}>

//         <color attach='background' args={['#101010']}/>
//         <PresentationControls speed={1.5} global zoom={.5} polar={[-0.1, Math.PI/4]}>
//           <Stage enviroment={null}>
//             <Model scale={0.01}/>

//           </Stage>
//         </PresentationControls>

//       </Canvas>
//     </div>
//   )
// }

// export default OurModel
