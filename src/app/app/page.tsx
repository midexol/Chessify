import { redirect } from 'next/navigation'

export default function AppPage() {
  redirect('/app/lobby')
}


// ⟳ echo · src\hooks\useHistory.ts
//     setHistory(combined)
//     setIsLoading(false)
//   }, [fetchCeloHistory, fetchStacksHistory, activeChain])