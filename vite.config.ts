import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl'

// https://vite.dev/config/
export default defineConfig({
  appType: 'mpa',
  plugins: [
    react(),
    glsl(),
    {
      name: 'serve-static-directory-indexes',
      configureServer(server) {
        server.middlewares.use((request, _response, next) => {
          request.url = resolveStaticDirectoryIndex(request.url)
          next()
        })
      },
      configurePreviewServer(server) {
        server.middlewares.use((request, _response, next) => {
          request.url = resolveStaticDirectoryIndex(request.url)
          next()
        })
      },
    },
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})

function resolveStaticDirectoryIndex(url = '') {
  const queryStart = url.indexOf('?')
  const pathname = queryStart === -1 ? url : url.slice(0, queryStart)
  const query = queryStart === -1 ? '' : url.slice(queryStart)

  if (pathname === '/privacy/' || pathname === '/privacy') {
    return `/privacy/index.html${query}`
  }

  if (pathname === '/terms/' || pathname === '/terms') {
    return `/terms/index.html${query}`
  }

  if (pathname === '/delete/' || pathname === '/delete') {
    return `/delete/index.html${query}`
  }

  return url
}
