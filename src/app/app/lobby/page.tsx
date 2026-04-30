'use client'

import dynamic from 'next/dynamic'

// Shell to prevent block-chain SDKs from leaking into the server build
const LobbyContent = dynamic(
  () => import('@/components/lobby/LobbyContent'),
  { ssr: false }
)

export default function LobbyPage() {
  return <LobbyContent />
}


// ⟳ echo · src\config\abis.ts
// ] as const
// export const CHESS_GAME_ABI = [
//   { "type": "function", "name": "createGame", "stateMutability": "nonReentrant", "inputs": [{ "name": "wager", "type": "uint256" }], "outputs": [{ "name": "gameId", "type": "uint256" }] },
//   { "type": "function", "name": "joinGame", "stateMutability": "nonReentrant", "inputs": [{ "name": "gameId", "type": "uint256" }], "outputs": [] },
//   { "type": "function", "name": "submitMove", "stateMutability": "nonpayable", "inputs": [{ "name": "gameId", "type": "uint256" }], "outputs": [] },