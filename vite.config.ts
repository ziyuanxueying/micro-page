import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
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
  ],
})
