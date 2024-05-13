import react from '@vitejs/plugin-react-swc'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import { resolve, join } from 'path'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  return defineConfig({
    server: {
      port: 8088, // 设置服务启动端口号
      open: false, // 设置服务启动时是否自动打开浏览器
    },
    plugins: [
      dts({ tsconfigPath: './tsconfig.json' }),
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
      target: 'node18.18.0',
      lib:
        mode === 'lib'
          ? {
              entry: resolve(__dirname, 'src/index.ts'),
              name: '@wd/micro-page',
              fileName: 'index',
            }
          : undefined,
      rollupOptions: {
        external: ['react', 'react-dom', 'react-router', 'react-router-dom'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react-router': 'react-router',
            'react-router-dom': 'react-router-dom',
          },
          // 输出文件的扩展名为 .ts
          entryFileNames: '[name].ts',
          chunkFileNames: chunkInfo => {
            const { exports, facadeModuleId } = chunkInfo

            // 处理 import glob
            if (mode === 'lib' && exports.includes('default')) {
              const filePath = facadeModuleId
                ?.replace(join(process.cwd(), 'src/'), '')
                .replace('.tsx', '.ts')

              return filePath || '[name].ts'
            }

            return '[name].ts'
          },
          assetFileNames: '[name].[ext]',
        },
      },
    },
  })
}
