// vite-env.d.ts
/// <reference types="vite/client" />

declare module 'vite/client' {
  interface ImportMeta {
    glob: <T>(pattern: string, options?: { import?: string }) => Record<string, () => Promise<T>>
  }
}
