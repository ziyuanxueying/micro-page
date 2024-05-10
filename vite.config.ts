import react from '@vitejs/plugin-react-swc'
import { presetIcons, presetUno } from 'unocss'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8088, // 设置服务启动端口号
    open: false, // 设置服务启动时是否自动打开浏览器
  },
  plugins: [
    AutoImport({
      include: [/\.[tj]sx?$/],
      imports: [
        { react: [['default', 'React']] },
        'react',
        'react-router-dom',
        { dayjs: [['default', 'dayjs']] },
        { clsx: [['default', 'cx']] },
      ],
      dts: 'src/auto-imports.d.ts',
    }),
    UnoCSS({
      shortcuts: [],
      presets: [presetUno(), presetIcons()],
    }),
    react({
      jsxImportSource: '@emotion/react',
    }),
  ],
})
