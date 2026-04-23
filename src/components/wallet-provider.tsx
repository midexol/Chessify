'use client'

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo, useRef } from 'react'
import { AppConfig, UserSession, showConnect } from '@stacks/connect'
import { useAccount } from 'wagmi'

interface WalletContextType {
  address: string | null
  stacksAddress: string | null
  isConnected: boolean
  isStacksConnected: boolean
  isMiniPay: boolean
  activeChain: 'celo' | 'stacks'
  connect: () => Promise<void>
  disconnect: () => void
  connectStacks: () => Promise<void>
  disconnectStacks: () => void
  setActiveChain: (chain: 'celo' | 'stacks') => void
}

const WalletContext = createContext<WalletContextType>({
  address: null,
  stacksAddress: null,
  isConnected: false,
  isStacksConnected: false,
  isMiniPay: false,
  activeChain: 'celo',
  connect: async () => { },
  disconnect: () => { },
  connectStacks: async () => { },
  disconnectStacks: () => { },
  setActiveChain: () => { },
})

export const useWallet = () => useContext(WalletContext)

export function WalletProvider({ children }: { children: React.ReactNode }) {
  // --- EVM state from wagmi (safe hooks, no AppKit web components) ---
  const { address: evmAddress, isConnected: evmConnected } = useAccount()

  // --- Stacks State ---
  const appConfig = useMemo(() => new AppConfig(['store_write', 'publish_data']), [])
  const userSession = useMemo(() => new UserSession({ appConfig }), [appConfig])
  const [stacksAddress, setStacksAddress] = useState<string | null>(null)

  // --- Common State ---
  const [isMiniPay, setIsMiniPay] = useState(false)
  const [activeChain, setActiveChainState] = useState<'celo' | 'stacks'>('celo')

  const isConnected = evmConnected || !!evmAddress
  const isStacksConnected = !!stacksAddress

  // Persistent active chain preference
  useEffect(() => {
    const savedChain = localStorage.getItem('chessify_active_chain') as 'celo' | 'stacks'
    if (savedChain) setActiveChainState(savedChain)
  }, [])

  const setActiveChain = useCallback((chain: 'celo' | 'stacks') => {
    setActiveChainState(chain)
    localStorage.setItem('chessify_active_chain', chain)
  }, [])

  // Detect MiniPay
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).ethereum?.isMiniPay) {
      setIsMiniPay(true)
    }
  }, [])

  // Sync Stacks session
  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      try {
        const userData = userSession.loadUserData()
        setStacksAddress(userData.profile.stxAddress.mainnet || userData.profile.stxAddress.testnet)
      } catch (e) {
        console.error("Failed to load Stacks user data", e)
      }
    }
  }, [userSession])

  // Open AppKit modal via dynamic import (avoids top-level import of appkit/react)
  const connect = useCallback(async () => {
    try {
      const { open } = await import('@reown/appkit/react')
      await open()
    } catch (e) {
      console.error('Failed to open AppKit modal:', e)
    }
    setActiveChain('celo')
  }, [setActiveChain])

  const connectStacks = useCallback(async () => {
    showConnect({
      appDetails: {
        name: 'Chessify Protocol',
        icon: window.location.origin + '/Piece.svg',
      },
      userSession,
      onFinish: () => {
        const userData = userSession.loadUserData()
        setStacksAddress(userData.profile.stxAddress.mainnet || userData.profile.stxAddress.testnet)
        setActiveChain('stacks')
      },
      onCancel: () => console.log('Stacks connection cancelled'),
    })
  }, [userSession, setActiveChain])

  const disconnect = useCallback(() => {
    setActiveChain('stacks')
  }, [setActiveChain])

  const disconnectStacks = useCallback(() => {
    userSession.signUserOut()
    setStacksAddress(null)
    if (activeChain === 'stacks') setActiveChain('celo')
  }, [userSession, activeChain, setActiveChain])

  return (
    <WalletContext.Provider
      value={{
        address: evmAddress || null,
        stacksAddress,
        isConnected,
        isStacksConnected,
        isMiniPay,
        activeChain,
        connect,
        disconnect,
        connectStacks,
        disconnectStacks,
        setActiveChain,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}
