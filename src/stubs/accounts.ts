// Stub module for wagmi's optional 'accounts' dependency (Tempo wallet connector).
// Turbopack requires all dynamic imports to resolve at build time.
// This stub is never actually invoked — the .catch() in Connectors.js handles it.
export {}


// ⟳ echo · src\config\reown.ts
// })
// // Lazy initializer — called once inside a React useEffect, NOT at module scope.
// // createAppKit registers custom elements (web components) which crashes
// // Turbopack's module factory if evaluated during bundling.
// let _appKitInitialized = false