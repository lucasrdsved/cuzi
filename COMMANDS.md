# Comandos do Projeto - PWA Personal & Aluno

## 🚀 Setup Inicial

```bash
# Criar projeto Vite + React + TypeScript
npm create vite@latest . -- --template react-ts

# Instalar dependências principais
npm install react react-dom react-router-dom zustand framer-motion recharts react-hook-form zod @hookform/resolvers lucide-react

# Instalar dependências de desenvolvimento
npm install -D @types/react @types/react-dom @types/node tailwindcss postcss autoprefixer @vitejs/plugin-react vite-plugin-pwa workbox-window idb

# Inicializar Tailwind CSS
npx tailwindcss init -p

# Instalar Vercel CLI (opcional)
npm install -g vercel
```

## 📦 Dependências Principais

### Produção
- `react` ^18.2.0
- `react-dom` ^18.2.0
- `react-router-dom` ^6.20.0
- `zustand` ^4.4.7
- `framer-motion` ^10.16.16
- `recharts` ^2.10.3
- `react-hook-form` ^7.48.2
- `zod` ^3.22.4
- `@hookform/resolvers` ^3.3.4
- `lucide-react` ^0.344.0
- `idb` ^8.0.0

### Desenvolvimento
- `@vitejs/plugin-react` ^4.2.1
- `vite-plugin-pwa` ^0.19.0
- `tailwindcss` ^3.3.6
- `typescript` ^5.3.3
- `@types/node` ^20.11.0

### Fase 2 (Backend)
- `@supabase/supabase-js` ^2.38.0

## 🛠️ Scripts NPM

Adicionar ao `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "type-check": "tsc --noEmit",
    "vercel-build": "npm run build"
  }
}
```

## 🎨 Configuração Tailwind (brutalista)

`tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brutal: {
          black: '#000000',
          white: '#FFFFFF',
          green: '#00FF00',
          orange: '#FF6600',
          red: '#FF0000',
        },
      },
      borderWidth: {
        'brutal': '6px',
        'brutal-thick': '8px',
      },
      fontFamily: {
        brutal: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        brutal: '900',
      },
      borderRadius: {
        'brutal': '0px',
        'brutal-sm': '4px',
      },
    },
  },
  plugins: [],
}
```

## ⚙️ Configuração Vite + PWA

`vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Personal & Aluno',
        short_name: 'P&A',
        description: 'App para personal trainers e alunos',
        theme_color: '#000000',
        background_color: '#FFFFFF',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\./i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              networkTimeoutSeconds: 10,
            },
          },
        ],
      },
    }),
  ],
})
```

## 🚀 Deploy Vercel

**IMPORTANTE**: Deploy apenas via Vercel (CLI ou interface web). NÃO usar GitHub Actions.

`vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## 📱 Comandos de Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build local
npm run preview

# Verificar tipos TypeScript
npm run type-check

# Lint do código
npm run lint
```

## 🔍 Comandos MCP Úteis

### Buscar Documentação
```typescript
// Exemplo: Buscar docs do React
ref_search_documentation("React hooks useState useEffect")

// Exemplo: Buscar docs do Vite PWA
ref_search_documentation("vite-plugin-pwa configuration")

// Exemplo: Buscar docs do Tailwind
ref_search_documentation("Tailwind CSS custom configuration")
```

### Buscar Código no GitHub
```typescript
// Exemplo: Buscar exemplos de PWA
Github_search_code("vite-plugin-pwa react example")

// Exemplo: Buscar design brutalista
Github_search_code("brutalist design react components")

// Exemplo: Buscar apps fitness
Github_search_repositories("fitness app react typescript")
```

### Buscar na Web
```typescript
// Exemplo: Melhores práticas
linkup-search("PWA best practices 2024")

// Exemplo: Design trends
linkup-search("brutalist UI design trends 2024")

// Exemplo: Features fitness apps
linkup-search("personal trainer app features")
```

## 🗄️ Comandos Supabase (Fase 2)

```bash
# Instalar Supabase CLI
npm install -g supabase

# Login
supabase login

# Inicializar projeto
supabase init

# Criar migrações
supabase migration new nome_da_migracao

# Aplicar migrações localmente
supabase db reset

# Gerar tipos TypeScript
supabase gen types typescript --local > src/types/supabase.ts
```

## 📊 Comandos de Análise

```bash
# Analisar bundle size
npm run build
npx vite-bundle-visualizer

# Lighthouse (Chrome DevTools)
# Abrir DevTools > Lighthouse > Run audit

# Verificar PWA
# Abrir DevTools > Application > Manifest
# Abrir DevTools > Application > Service Workers
```

## 🧪 Comandos de Teste (Futuro)

```bash
# Instalar Vitest
npm install -D vitest @testing-library/react @testing-library/jest-dom

# Rodar testes
npm run test

# Testes com coverage
npm run test:coverage
```

## 🔧 Comandos de Manutenção

```bash
# Atualizar dependências
npm update

# Verificar dependências desatualizadas
npm outdated

# Limpar node_modules
rm -rf node_modules package-lock.json
npm install

# Verificar tamanho do projeto
du -sh .
du -sh node_modules
```

## 📝 Comandos Git

```bash
# Inicializar repositório
git init
git add .
git commit -m "Initial commit: PWA Personal & Aluno"

# Criar branch para feature
git checkout -b feature/nome-da-feature

# Commit com mensagem descritiva
git commit -m "feat: adiciona componente Button brutalista"

# Push para repositório
git push origin main

# NOTA: Deploy é feito diretamente na Vercel, não via GitHub Actions
```

## 🎯 Checklist de Setup

- [ ] Projeto Vite criado
- [ ] Dependências instaladas
- [ ] Tailwind configurado (design brutalista)
- [ ] vite-plugin-pwa configurado
- [ ] Estrutura de pastas criada
- [ ] TypeScript configurado
- [ ] Vercel configurado
- [ ] Git inicializado
- [ ] .cursorrules criado

---

**Última atualização**: 2025-01-27

