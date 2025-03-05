import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from "vite-plugin-pwa"

// https://vite.dev/config/
export default defineConfig({
  publicDir: 'assets',
  build: {
    outDir: 'public'
  },
  plugins: [
    VitePWA({
      workbox: {
        globPatterns: [
          "**/*.{html,css,js,ico,png,jpeg,jpg,svg,wav,woff,woff2}",
          "assets/*.{png,jpg,jpeg,svg,woff,woff2,wav}"
        ],
        navigateFallback: "/index.html",
        runtimeCaching: [{
          urlPattern: /\.(png|jpg|jpeg|svg|json|woff|woff2|wav)/,
          handler: "CacheFirst"
        }],
        clientsClaim: false,
        skipWaiting: false,
    },
      registerType: 'autoUpdate',
      manifest: {
        name: "Kachok - Уникальный фитнес трекер с элементами геймификации",
        description: "Мы верим, что фитнес — это не обязанность, а увлекательное приключение. Kachok создан для тех, кто хочет превратить путь к здоровью и силе в захватывающую игру, где каждый шаг, каждое усилие и каждая капля пота имеют значение.",
        short_name: "Kachok",
        start_url: "/",
        lang: "ru-RU",
        orientation: "any",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        icons: [
          {
            src: "192_logo_bg.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "512_logo_bg.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any"
          }
        ],
        screenshots: [
          {
            src: 'screenshots/360_740.png',
            sizes: '360x740',
            form_factor: 'narrow',
            type: 'image/png'
          },
          {
            src: 'screenshots/1440_900.png',
            sizes: '1440x900',
            form_factor: 'wide',
            type: 'image/png'
          }
        ]
      },
      includeAssets: ["**/*"],
    }), 
    react(), 
    tailwindcss(),
  ],
})
