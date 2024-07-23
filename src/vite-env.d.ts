/// <reference types="vite/dist/node/runtime" />

interface QRCodeOptions {
  msg: string
  dim?: number
  pad?: number
  mtx?: number
  ecl?: string
  ecb?: number
  pal?: Array<string>
  vrb?: number
}

declare function QRCode(options: QRCodeOptions): HTMLElement
