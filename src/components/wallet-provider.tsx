'use client'

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'

declare global {
  interface Window {
    ethereum_?: any;
  }
}

// Define the shape of our context
interface WalletContextType {
  address: string | null
  isConnected: boolean
  isMiniPay: boolean
  connect: () => Promise<void>
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType>({
  address: null,
  isConnected: false,
  isMiniPay: false,
  connect: async () => {},
  disconnect: () => {},
})

export const useWallet = () => useContext(WalletContext)

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null)
  const [isMiniPay, setIsMiniPay] = useState(false)

  const isConnected = !!address

  // Initialize and check for MiniPay
  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum_) {
      if (window.ethereum_.isMiniPay) {
        setIsMiniPay(true)
        // Auto-connect if MiniPay is detected
        connect()
      }

      // Check if already connected
      window.ethereum_.request({ method: 'eth_accounts' }).then((accounts: any) => {
        if (accounts.length > 0) {
          setAddress(accounts[0])
        }
      }).catch(console.error)

      // Listen for account changes
      const handleAccountsChanged = (accounts: any) => {
        if (accounts.length > 0) {
          setAddress(accounts[0])
        } else {
          setAddress(null)
        }
      }

      window.ethereum_.on('accountsChanged', handleAccountsChanged)

      return () => {
        window.ethereum_.removeListener('accountsChanged', handleAccountsChanged)
      }
    }
  }, [])

  const connect = useCallback(async () => {
    if (typeof window !== 'undefined' && window.ethereum_) {
      try {
        const accounts = await window.ethereum_.request({
          method: 'eth_requestAccounts',
        })
        if (accounts.length > 0) {
          setAddress(accounts[0])
        }
      } catch (error) {
        console.error('Failed to connect wallet:', error)
      }
    } else {
      alert('Please install a Web3 wallet (like MetaMask or use MiniPay)!')
    }
  }, [])

  const disconnect = useCallback(() => {
    setAddress(null)
    // Note: Most browser wallets don't support true disconnection via the dApp.
  }, [])

  return (
    <WalletContext.Provider
      value={{
        address,
        isConnected,
        isMiniPay,
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}
