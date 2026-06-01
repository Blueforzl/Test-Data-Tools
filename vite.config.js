import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',
  // 优化构建配置
  build: {
    // 启用 CSS 代码分割
    cssCodeSplit: true,
    // 启用 sourcemap
    sourcemap: false,
    // 压缩配置
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // 移除 console
        drop_debugger: true
      }
    },
    // 资源内联限制(减少请求)
    assetsInlineLimit: 4096,
    // 分块策略优化
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue']
        }
      }
    }
  },
  // 开发服务器优化
  server: {
    // 启用热重载
    hmr: true,
    // 预加载
    warmup: {
      clientFiles: [
        './src/main.js',
        './src/App.vue',
        './src/Generator/index.vue'
      ]
    }
  },
  // 依赖优化
  optimizeDeps: {
    // 预构建依赖
    include: ['vue'],
    // 排除不需要预构建的依赖
    exclude: []
  }
})
