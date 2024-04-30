import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'

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
      shortcuts: [{ logo: 'i-logos-react w-6em h-6em transform transition-800 hover:rotate-180' }],
    }),
    react(),
  ],
})
