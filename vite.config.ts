import react from '@vitejs/plugin-react-swc'
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
        { '@emotion/react': ['css', 'keyframes', 'Global', 'ClassNames'] },
      ],
      dts: 'src/auto-imports.d.ts',
    }),
    react({
      jsxImportSource: '@emotion/react',
    }),
  ],
})
