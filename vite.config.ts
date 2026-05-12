import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

// 정적 HTML/JS/JSON/SVG 파일을 dist/에 복사
function copyStaticFiles() {
  const staticFiles = [
    'index.html',
    'plan-intro.html',
    'plan-intro-renewal.html',
    'plan-compare.html',
    'sim-guide.html',
    'precheck.html',
    'shared-nav.js',
    'nav.js',
    'ktmmobile_logo.svg',
    'ktm_mobile_plans.json',
    'default_shadcn_theme.css',
  ]
  const staticDirs = ['data']
  return {
    name: 'copy-static-files',
    closeBundle() {
      const outDir = path.resolve(__dirname, 'dist')
      for (const file of staticFiles) {
        const src = path.resolve(__dirname, file)
        if (fs.existsSync(src)) {
          fs.copyFileSync(src, path.join(outDir, file))
        }
      }
      for (const dir of staticDirs) {
        const src = path.resolve(__dirname, dir)
        if (fs.existsSync(src)) {
          fs.cpSync(src, path.join(outDir, dir), { recursive: true })
        }
      }
    },
  }
}

export default defineConfig({
  base: './',
  plugins: [
    figmaAssetResolver(),
    react(),
    tailwindcss(),
    copyStaticFiles(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, '셀프개통.html'),
    },
  },
})
