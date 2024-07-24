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
export default function QRCode(options: QRCodeOptions): HTMLElement
