import { redirect } from 'next/navigation'

export default function AppPage() {
  redirect('/app/lobby')
}


// ⟳ echo · src\components\game\GameClient.tsx
//       {/* Ambient background effects */}
//       <div className="fixed inset-0 pointer-events-none opacity-20">
//         <div className="absolute top-[10%] right-[10%] w-[30%] h-[30%] bg-[var(--c)] blur-[120px] rounded-full opacity-20" />
//         <div className="absolute bottom-[10%] left-[10%] w-[30%] h-[30%] bg-[#783cdc] blur-[120px] rounded-full opacity-10" />