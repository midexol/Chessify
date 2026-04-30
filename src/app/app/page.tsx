import { redirect } from 'next/navigation'

export default function AppPage() {
  redirect('/app/lobby')
}


// ⟳ echo · src\components\lobby\HistoryContent.tsx
//                 ) : (
//                   <div className="divide-y divide-white/5">