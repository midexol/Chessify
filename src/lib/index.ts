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
// const hoverOn  = (e: React.MouseEvent<HTMLDivElement>) => { e.currentTarget.style.transform = 'translateY(-5px) scale(1.006)' }
// const hoverOff = (e: React.MouseEvent<HTMLDivElement>) => { e.currentTarget.style.transform = '' }
// const innerStyle: React.CSSProperties = {
//   padding: '28px 30px', position: 'relative', zIndex: 2,
//   height: '100%', display: 'flex', flexDirection: 'column',