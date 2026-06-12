import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import { buildSitemapXml } from './src/config/seoRoutes.js'

function sitemapPlugin() {
  return {
    name: 'geradev-sitemap',
    apply: 'build',
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: buildSitemapXml(),
      })
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    sitemapPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: [
        'otter.svg',
        'otter-white.svg',
        'otter-blue.svg',
        'robots.txt',
      ],
      manifest: {
        name: 'GeraDev — Ferramentas para Desenvolvedores',
        short_name: 'GeraDev',
        description:
          'Ferramentas gratuitas para desenvolvedores: gerar documentos, formatar JSON/XML/SQL, senhas, QR codes, hashes, JWT e muito mais.',
        lang: 'pt-BR',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        theme_color: '#1E003E',
        background_color: '#1E003E',
        icons: [
          { src: '/otter.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/otter.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: '/otter.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff,woff2}'],
        navigateFallback: '/index.html',
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/cdnjs\.cloudflare\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'cdn-fontawesome',
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'cdn-jsdelivr',
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
      devOptions: { enabled: false },
    }),
  ],
  base: '/',
  build: {
    outDir: 'dist',
  },
})
