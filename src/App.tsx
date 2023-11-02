/* eslint-disable */
import * as THREE from 'three'
import { useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import {
  CameraControls,
  Line,
  PerspectiveCamera,
  Text,
  Text3D,
} from '@react-three/drei'

function Box(
  props: JSX.IntrinsicElements['mesh'] &
    JSX.IntrinsicElements['meshStandardMaterial'] & { text: string }
) {
  // This reference will give us direct access to the THREE.Mesh object
  const ref = useRef<THREE.Mesh>(null!)
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Rotate mesh every frame, this is outside of React without overhead

  function getColor() {
    if (hovered) {
      return '#851EE3'
    }
    if (props.color) {
      return props.color
    } else return '#577DCB'
  }

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 0.75 : 0.5}
      onClick={() => click(!clicked)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    >
      <sphereGeometry args={[1, 32]}></sphereGeometry>
      <meshStandardMaterial color={getColor()} />
      <Text3D
        font={'../public/Inter_Regular.json'}
        scale={0.5}
        position={[0, 1, 0]}
      >
        {props.text}
        <meshStandardMaterial color="black" />
      </Text3D>
    </mesh>
  )
}

export default function App() {
  type position = [number, number, number]
  const center: position = [0, 0, 0]
  const postSphere: position = [-2, -0.15, -2]
  const commentsSphere: position = [-2, 3, -2]
  const followersSphere: position = [1.2, 2, 2]
  const followingSphere: position = [3, 2, -2]

  return (
    <Canvas style={{ height: '100vh' }}>
      <ambientLight intensity={1} />
      <pointLight position={[3, 1.2, 4]} color={'white'} intensity={25} />
      <pointLight position={[-3, 1.2, -4]} color={'white'} intensity={25} />
      <PerspectiveCamera />
      <Line
        points={[center, postSphere]}
        color="#8A8894"
        lineWidth={5}
        dashed={false}
      />
      <Line
        points={[commentsSphere, followingSphere]}
        color="#8A8894"
        lineWidth={5}
        dashed={false}
      />
      <Line
        points={[commentsSphere, followersSphere]}
        color="#8A8894"
        lineWidth={5}
        dashed={false}
      />
      <Line
        points={[center, postSphere]}
        color="#8A8894"
        lineWidth={5}
        dashed={false}
      />
      <Line
        points={[postSphere, commentsSphere]}
        color="#8A8894"
        lineWidth={5}
        dashed={false}
      />
      <Line
        points={[center, followingSphere]}
        color="#8A8894"
        lineWidth={5}
        dashed={false}
      />
      <Line
        points={[center, followersSphere]}
        color="#8A8894"
        lineWidth={5}
        dashed={false}
      />
      <Line
        points={[followingSphere, postSphere]}
        color="#8A8894"
        lineWidth={5}
        dashed={false}
      />
      <Line
        points={[followersSphere, postSphere]}
        color="#8A8894"
        lineWidth={5}
        dashed={false}
      />
      <Box position={center} color="#E3029A" text="user" />
      <Box position={postSphere} text="post" />
      <Box position={followersSphere} text="followers" />
      <Box position={followingSphere} text="following" />
      <Box position={commentsSphere} text="comments" />
      <CameraControls makeDefault />
    </Canvas>
  )
}
