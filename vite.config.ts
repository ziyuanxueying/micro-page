import react from '@vitejs/plugin-react-swc'
import { presetIcons, presetUno } from 'unocss'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
  },
  plugins: [
    AutoImport({
      include: [/\.[tj]sx?$/],
      imports: [
        { react: [['default', 'React']] },
        'react',
        'react-router-dom',
        { dayjs: [['default', 'dayjs']] },
        { classnames: [['default', 'cls']] },
      ],
      dts: 'src/auto-imports.d.ts',
    }),
    UnoCSS({
      shortcuts: [],
      presets: [presetUno(), presetIcons()],
    }),
    react(),
  ],
})
