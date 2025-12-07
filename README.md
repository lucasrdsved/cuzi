# Personal & Aluno - PWA

PWA completo e moderno que conecta personal trainers e alunos, com design brutalista.

## 🚀 Visão Geral

Este projeto é uma Progressive Web App (PWA) desenvolvida para facilitar a gestão de treinos entre personal trainers e seus alunos. O aplicativo permite que personais criem e gerenciem planos de treino, e que alunos acompanhem sua execução, visualizem progresso e recebam feedbacks.

## 📋 Stack Tecnológico

- **Frontend**: React 18, Vite, TypeScript
- **Estilização**: Tailwind CSS (Design Brutalista)
- **Estado**: Zustand
- **Animações**: Framer Motion
- **Roteamento**: React Router v6
- **PWA**: vite-plugin-pwa

## ⚙️ Configuração e Instalação

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou pnpm

### Passos para Instalação

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repositorio>
   cd personal-aluno
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acesse o aplicativo:**
   Abra `http://localhost:5173` no seu navegador.

## 📱 Funcionalidades Principais

### Modo Personal Trainer
- **Dashboard**: Visão geral de alunos ativos e treinos.
- **Gerenciamento de Alunos**: Cadastro e visualização de perfil de alunos.
- **Criação de Treinos**: Ferramenta para montar rotinas de exercícios personalizadas.
- **Chat**: Comunicação direta com os alunos.

### Modo Aluno
- **Treino do Dia**: Visualização rápida do treino programado para hoje.
- **Execução de Treinos**: Interface guiada para registrar séries, cargas e descanso.
- **Progresso**: Acompanhamento de estatísticas e histórico.
- **Chat**: Comunicação com o personal trainer.

## 📂 Estrutura do Projeto

O código fonte está organizado na pasta `src/`:

- **`components/common/`**: Componentes de UI reutilizáveis (Botões, Cards, Modais, etc.).
- **`pages/`**: Páginas da aplicação, divididas por fluxo (`Personal`, `Aluno`, `Login`).
- **`services/`**: Camada de serviço (atualmente mockada para simular API).
- **`store/`**: Gerenciamento de estado global com Zustand.
- **`types/`**: Definições de tipos TypeScript (interfaces para User, Treino, etc.).
- **`mockdata/`**: Dados fictícios para desenvolvimento e testes.

## 🛠️ Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Compila o projeto para produção.
- `npm run preview`: Visualiza a versão de produção localmente.
- `npm run type-check`: Executa a verificação de tipos do TypeScript.
- `npm run lint`: Executa o linter para verificar a qualidade do código.

## 🎨 Design System

O projeto utiliza um estilo "Brutalista", caracterizado por:
- Bordas grossas e definidas.
- Cores sólidas e de alto contraste.
- Tipografia bold e impactante.
- Ausência de sombras suaves ou gradientes sutis.

## 🤝 Contribuição

Para contribuir com o projeto:
1. Faça um fork do repositório.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`).
4. Push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

**Nota sobre Documentação**: Todo novo código (funções, componentes, interfaces) deve ser devidamente documentado utilizando JSDoc/TSDoc, seguindo o padrão estabelecido no projeto.

## 📝 Licença

MIT
