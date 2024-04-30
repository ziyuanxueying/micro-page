// vite.config.ts
import { defineConfig } from 'file:///Users/xlsama/w/wd-micro-page/node_modules/.pnpm/vite@5.2.10_less@4.2.0/node_modules/vite/dist/node/index.js'
import react from 'file:///Users/xlsama/w/wd-micro-page/node_modules/.pnpm/@vitejs+plugin-react-swc@3.6.0_vite@5.2.10_less@4.2.0_/node_modules/@vitejs/plugin-react-swc/index.mjs'
import AutoImport from 'file:///Users/xlsama/w/wd-micro-page/node_modules/.pnpm/unplugin-auto-import@0.17.5_rollup@4.17.0/node_modules/unplugin-auto-import/dist/vite.js'
import UnoCSS from 'file:///Users/xlsama/w/wd-micro-page/node_modules/.pnpm/unocss@0.59.4_postcss@8.4.38_rollup@4.17.0_vite@5.2.10_less@4.2.0_/node_modules/unocss/dist/vite.mjs'
var vite_config_default = defineConfig({
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
export { vite_config_default as default }
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMveGxzYW1hL3cvd2QtbWljcm8tcGFnZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3hsc2FtYS93L3dkLW1pY3JvLXBhZ2Uvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3hsc2FtYS93L3dkLW1pY3JvLXBhZ2Uvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0LXN3YydcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXG5pbXBvcnQgVW5vQ1NTIGZyb20gJ3Vub2Nzcy92aXRlJ1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIEF1dG9JbXBvcnQoe1xuICAgICAgaW5jbHVkZTogWy9cXC5bdGpdc3g/JC9dLFxuICAgICAgaW1wb3J0czogW1xuICAgICAgICB7IHJlYWN0OiBbWydkZWZhdWx0JywgJ1JlYWN0J11dIH0sXG4gICAgICAgICdyZWFjdCcsXG4gICAgICAgICdyZWFjdC1yb3V0ZXItZG9tJyxcbiAgICAgICAgeyBkYXlqczogW1snZGVmYXVsdCcsICdkYXlqcyddXSB9LFxuICAgICAgICB7IGNsYXNzbmFtZXM6IFtbJ2RlZmF1bHQnLCAnY2xzJ11dIH0sXG4gICAgICBdLFxuICAgICAgZHRzOiAnc3JjL2F1dG8taW1wb3J0cy5kLnRzJyxcbiAgICB9KSxcbiAgICBVbm9DU1Moe1xuICAgICAgc2hvcnRjdXRzOiBbeyBsb2dvOiAnaS1sb2dvcy1yZWFjdCB3LTZlbSBoLTZlbSB0cmFuc2Zvcm0gdHJhbnNpdGlvbi04MDAgaG92ZXI6cm90YXRlLTE4MCcgfV0sXG4gICAgfSksXG4gICAgcmVhY3QoKSxcbiAgXSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlRLFNBQVMsb0JBQW9CO0FBQ3RTLE9BQU8sV0FBVztBQUNsQixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLFlBQVk7QUFHbkIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsV0FBVztBQUFBLE1BQ1QsU0FBUyxDQUFDLFlBQVk7QUFBQSxNQUN0QixTQUFTO0FBQUEsUUFDUCxFQUFFLE9BQU8sQ0FBQyxDQUFDLFdBQVcsT0FBTyxDQUFDLEVBQUU7QUFBQSxRQUNoQztBQUFBLFFBQ0E7QUFBQSxRQUNBLEVBQUUsT0FBTyxDQUFDLENBQUMsV0FBVyxPQUFPLENBQUMsRUFBRTtBQUFBLFFBQ2hDLEVBQUUsWUFBWSxDQUFDLENBQUMsV0FBVyxLQUFLLENBQUMsRUFBRTtBQUFBLE1BQ3JDO0FBQUEsTUFDQSxLQUFLO0FBQUEsSUFDUCxDQUFDO0FBQUEsSUFDRCxPQUFPO0FBQUEsTUFDTCxXQUFXLENBQUMsRUFBRSxNQUFNLHNFQUFzRSxDQUFDO0FBQUEsSUFDN0YsQ0FBQztBQUFBLElBQ0QsTUFBTTtBQUFBLEVBQ1I7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
