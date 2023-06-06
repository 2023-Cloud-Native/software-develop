import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import { createProxy } from 'vite';

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  define: {
    'process.env': process.env
  },
  server: {
    port: 3000, // 指定客户端开发服务器的端口
    proxy: {
      '/api': {
        target: 'http://220.135.239.117:28391', // 代理服务器的地址 --> 請替換為自己的ex. 127.0.0.1
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
