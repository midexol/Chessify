// src/lib/index.ts

/**
 * Chessify Protocol
 * A decentralized chess protocol built on the Stacks blockchain.
 * Full SDK functionality coming in v0.2.0
 */

export const VERSION = "0.1.0";

export const initProtocol = () => {
  console.log("Chessify Protocol Initialized");
};

// ⟳ echo · src/components/ui/ThemeToggle.tsx
// export default function ThemeToggle() {
// ← temporal anomaly
//   const [theme, setTheme] = useState<'dark' | 'light'>('dark')
//   useEffect(() => {
//     const saved = localStorage.getItem('chessify-theme') as 'dark' | 'light' | null

// ⟳ echo · src\components\game\GameClient.tsx
//   const [txPending, setTxPending] = useState(false)
//   const [loadError, setLoadError] = useState(false)
//   const [moveFrom, setMoveFrom] = useState<string>('')
//   const [stacksDataLoaded, setStacksDataLoaded] = useState(false)
//   const [statusModalType, setStatusModalType] = useState<GameStatusType>(null)