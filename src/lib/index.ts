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
//   const [theme, setTheme] = useState<'dark' | 'light'>('dark')
//   useEffect(() => {
//     const saved = localStorage.getItem('chessify-theme') as 'dark' | 'light' | null

// ⟳ echo · src/components/landing/Hero.tsx
//       <rect x="43" y="4" width="4.5" height="24" rx="2.25" fill="#00ccff" style={{filter:'drop-shadow(0 0 8px #00ccff) drop-shadow(0 0 20px rgba(0,204,255,.6))'}}/>
//       <rect x="33" y="11" width="24" height="4.5" rx="2.25" fill="#00ccff" style={{filter:'drop-shadow(0 0 8px #00ccff) drop-shadow(0 0 20px rgba(0,204,255,.6))'}}/>
//       <circle cx="29" cy="54" r="3.5" fill="#00ccff" style={{filter:'drop-shadow(0 0 7px #00ccff) drop-shadow(0 0 16px rgba(0,204,255,.7))'}}/>