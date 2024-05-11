import react from '@vitejs/plugin-react-swc'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  return defineConfig({
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
    build: {
      outDir: mode === 'lib' ? 'dist/lib' : 'dist/app',
      lib:
        mode === 'lib'
          ? {
              entry: resolve(__dirname, 'src/index.tsx'),
              name: '@wd/micro-page',
              fileName: 'index',
              // formats: ['cjs'],
            }
          : undefined,
      rollupOptions: {
        // input: {
        //   main: resolve(__dirname, 'src/main.tsx'),
        // },
        // external: ['vue'],
        // output: {
        //   assetFileNames: 'my-library.css',
        //   exports: 'named',
        //   globals: {
        //     vue: 'Vue',
        //   },
        // },
      },
    },
  })
}
