import { redirect } from 'next/navigation'

export default function AppPage() {
  redirect('/app/lobby')
}


// ⟳ echo · src\app\not-found.tsx
//            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
//              <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-[var(--t1)] drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
//                Checkmated by <span className="text-[var(--c)]">the Void</span>
//              </h2>
//              <p className="text-[var(--t2)] mt-6 max-w-md mx-auto text-lg font-medium">