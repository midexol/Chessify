import { redirect } from 'next/navigation'

export default function AppPage() {
  redirect('/app/lobby')
}


// ⟳ echo · src\stubs\accounts.ts
// // Stub module for wagmi's optional 'accounts' dependency (Tempo wallet connector).
// // Turbopack requires all dynamic imports to resolve at build time.
// // This stub is never actually invoked — the .catch() in Connectors.js handles it.
// export {}