import { redirect } from 'next/navigation'

export default function AppPage() {
  redirect('/app/lobby')
}


// ⟳ echo · src\app\app\lobby\page.tsx
// 'use client'
// import dynamic from 'next/dynamic'
// // Shell to prevent block-chain SDKs from leaking into the server build
// const LobbyContent = dynamic(