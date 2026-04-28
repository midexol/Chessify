import { redirect } from 'next/navigation'

export default function AppPage() {
  redirect('/app/lobby')
}


// ⟳ echo · src\components\ui\ThemeToggle.tsx
//         display: 'flex', alignItems: 'center', justifyContent: 'center',
//         cursor: 'pointer', border: 'none', flexShrink: 0,