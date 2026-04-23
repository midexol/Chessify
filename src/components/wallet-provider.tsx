'use client'

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'
import { AppConfig, UserSession, showConnect } from '@stacks/connect'
import { useAppKit, useAppKitAccount, useAppKitNetwork } from '@reown/appkit/react'

interface WalletContextType {
  address: string | null          // EVM Address
  stacksAddress: string | null    // Stacks Address
  isConnected: boolean            // EVM connection status
  isStacksConnected: boolean      // Stacks connection status
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
  // --- Reown AppKit Hooks ---
  const { open } = useAppKit()
  const { address: evmAddress, isConnected: evmConnected } = useAppKitAccount()
  useAppKitNetwork()

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

  // Detected MiniPay
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

  const connect = useCallback(async () => {
    await open()
    setActiveChain('celo')
  }, [open, setActiveChain])

  const connectStacks = useCallback(async () => {
    // Avoid double instantiation of providers by using the built-in showConnect
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
    // For AppKit, disconnect is usually handled via the modal UI itself
    // but here we just clear our internal sync if needed.
    setActiveChain('stacks') // Switch away
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
