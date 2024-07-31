/// <reference types="vite/dist/node/runtime" />

interface ImportMetaEnv {
  readonly DEV: boolean
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
