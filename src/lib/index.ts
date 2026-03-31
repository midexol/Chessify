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

// ⟳ echo · src/components/landing/Features.tsx
//               <div style={descStyle}>Leather & Xverse supported. Mobile & desktop ready.</div>
//               <div style={{ marginTop: 12 }}>
//                 <span style={pillStyle('rgba(0,204,255,.12)', 'rgba(0,204,255,.28)', 'var(--c)')}>Leather</span>
//                 <span style={pillStyle('rgba(255,255,255,.07)', 'rgba(255,255,255,.14)', 'var(--t2)')}>Xverse</span>
//               </div>