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
        target: 'http://220.135.239.117:28391/', // 代理服务器的地址 
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    port: 3000, // 指定客户端开发服务器的端口
    proxy: {
      '/api': {
        target: 'http://220.135.239.117:28391/', // 代理服务器的地址 
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
     },
     rollupOptions: {
       external: [
         './static/icon/power/pow.png', 
         './static/icon/power/pointer.png', 
         './static/icon/water/red.png',
         './static/icon/water/green.png',
         './static/icon/water/pink.png',
         './static/icon/water/blue.png',
         './static/icon/water/yellow.png',
         './static/icon/earthquake/green.png', 
         './static/icon/earthquake/yellow.png',
         './static/icon/earthquake/red.png'
       ],
       output:
        {
          dir: 'dist/'
        }
    }
  }
})
