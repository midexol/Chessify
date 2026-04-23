'use client'

import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Center, Float, Environment, Text, MeshDistortMaterial } from '@react-three/drei'
import { motion } from 'framer-motion'
import Link from 'next/link'
import * as THREE from 'three'
import GlowButton from '@/components/ui/GlowButton'
import { Navbar } from '@/components/landing/Hero'

// ─── 3D Knight Component ───────────────────────────────────────────────────

function ChessKnight() {
  const { scene } = useGLTF('/models/chess-knight.glb')
  const meshRef = useRef<THREE.Group>(null)

  // Subtle rotation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5
    }
  })

  return (
    <Center>
      <primitive 
        object={scene} 
        ref={meshRef} 
        scale={2.5} 
        rotation={[0, Math.PI / 4, 0]}
      />
    </Center>
  )
}

// ─── Background Elements ────────────────────────────────────────────────────

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} intensity={1} color="var(--c)" />
      
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <Suspense fallback={null}>
          <ChessKnight />
        </Suspense>
      </Float>

      {/* Decorative floating sphere */}
      <Float speed={2} rotationIntensity={2}>
        <mesh position={[4, 2, -2]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <MeshDistortMaterial 
            color="var(--c)" 
            speed={2} 
            distort={0.4} 
            radius={1}
          />
        </mesh>
      </Float>

      <Environment preset="city" />
    </>
  )
}

// ─── Main 404 Component ─────────────────────────────────────────────────────

export default function NotFound() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'var(--bg)', 
      color: 'var(--t1)',
      overflow: 'hidden',
      position: 'relative'
    }}>
      <Navbar />

      <main style={{ 
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        
        {/* 3D Canvas Container */}
        <div style={{ 
          position: 'absolute', 
          top: 0, left: 0, 
          width: '100%', height: '100%', 
          zIndex: -1,
          opacity: 0.6
        }}>
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            <Suspense fallback={null}>
              <SceneContent />
            </Suspense>
          </Canvas>
        </div>

        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ textAlign: 'center', maxWidth: 600, padding: 24 }}
        >
          <h1 style={{ 
            fontFamily: 'var(--fd)', 
            fontSize: 'min(15vw, 120px)', 
            fontWeight: 950, 
            lineHeight: 0.8,
            letterSpacing: '-0.05em',
            margin: 0,
            fontStyle: 'italic',
            background: 'linear-gradient(to bottom, #fff, rgba(255,255,255,0.2))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            position: 'relative'
          }}>
            404
          </h1>
          
          <h2 style={{ 
            fontFamily: 'var(--fd)', 
            fontSize: 24, 
            fontWeight: 800, 
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            marginTop: 20,
            color: 'var(--c)'
          }}>
            Wrong Square
          </h2>
          
          <p style={{ 
            fontSize: 16, 
            color: 'var(--t3)', 
            lineHeight: 1.6,
            marginTop: 16,
            marginBottom: 40
          }}>
            This move isn&apos;t in the opening theory. The grandmasters don&apos;t know how we got here. Let&apos;s return to the safe zone.
          </p>

          <Link href="/app/lobby">
            <GlowButton variant="brand" size="lg">
              RETURN TO LOBBY
            </GlowButton>
          </Link>
        </motion.div>

        {/* Bottom decorative bar */}
        <div style={{
          position: 'absolute',
          bottom: 40,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          gap: 40,
          fontFamily: 'var(--fd)',
          fontSize: 10,
          fontWeight: 700,
          color: 'var(--t3)',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          opacity: 0.4
        }}>
          <div>STX-NETWORK</div>
          <div>CELO-MAINNET</div>
          <div>CHESS-V1-PROTOCOL</div>
        </div>
      </main>

      {/* Grid overlay mask */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 5,
        pointerEvents: 'none',
        background: 'radial-gradient(circle at 50% 50%, transparent 0%, var(--bg) 80%)',
        opacity: 0.8
      }} />
    </div>
  )
}
