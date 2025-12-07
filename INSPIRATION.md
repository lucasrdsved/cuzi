# Inspiração de Design - PWA Personal & Aluno

## 🎨 Referências Visuais Adaptadas

Este documento adapta elementos de design moderno para o estilo brutalista do projeto.

## 📱 Elementos Inspirados

### 1. Dashboard com Progresso

**Inspiração Original:**
- Cards suaves com sombras
- Bordas arredondadas
- Cores suaves

**Adaptação Brutalista:**
```
┌─────────────────────────────┐
│ Good Morning, [Nome] 👋     │
│                             │
│ ┌─────────────────────────┐ │
│ │ PROGRESSO               │ │
│ │ ████████░░ 80%          │ │
│ │ 2/5 objetivos           │ │
│ └─────────────────────────┘ │
│                             │
│ TREINOS DE HOJE            │
│ ┌─────────────────────────┐ │
│ │ EXERCÍCIO 30min         │ │
│ │ [COMPLETAR]             │ │
│ └─────────────────────────┘ │
└─────────────────────────────┘
```

**Características:**
- Bordas pretas de 6-8px
- Fundo branco sólido
- Texto extra-bold
- Botões com bordas grossas
- Sem border-radius

### 2. Grid de Seleção (Exercícios/Hábitos)

**Inspiração Original:**
- Grid 2x3 com cards arredondados
- Ícones coloridos em círculos suaves

**Adaptação Brutalista:**
```
┌──────────┬──────────┐
│ EXERCÍCIO│ LEITURA  │
│   [🏃]   │   [📖]   │
│          │          │
├──────────┼──────────┤
│ ESTUDO   │ ÁGUA     │
│   [💡]   │   [💧]   │
│          │          │
├──────────┼──────────┤
│ MEDITAR  │ CAMINHADA│
│   [🧘]   │   [🚶]   │
└──────────┴──────────┘
```

**Características:**
- Grid rígido 2x3
- Bordas pretas de 6px
- Ícones grandes e bold
- Cores sólidas (verde, laranja, vermelho)
- Sem espaçamentos suaves

### 3. Tela de Execução/Player

**Inspiração Original:**
- Imagem central grande
- Controles suaves
- Barra de progresso arredondada

**Adaptação Brutalista:**
```
┌─────────────────────────────┐
│ ← EXERCÍCIO                 │
│                             │
│    ┌───────────────┐       │
│    │               │       │
│    │   [ÍCONE]     │       │
│    │               │       │
│    └───────────────┘       │
│                             │
│    AGACHAMENTO              │
│                             │
│    ████████░░░░ 01:13/04:38 │
│                             │
│    [◀] [⏸] [▶]              │
└─────────────────────────────┘
```

**Características:**
- Imagem com borda preta de 8px
- Controles grandes com bordas
- Barra de progresso com borda preta
- Texto extra-bold
- Layout rígido e centralizado

### 4. Gráficos de Progresso

**Inspiração Original:**
- Gráficos suaves com cores pastel
- Cards arredondados

**Adaptação Brutalista:**
```
┌─────────────────────────────┐
│ INSIGHTS                    │
│                             │
│ ┌─────┬─────┐              │
│ │ 3   │ 23  │              │
│ │DIAS │FEITOS│              │
│ └─────┴─────┘              │
│                             │
│ ████                        │
│ ██████                      │
│ ████                        │
│ ████████                    │
│ ████                        │
│ ██████                      │
│ ████                        │
│ S T Q Q S S D              │
└─────────────────────────────┘
```

**Características:**
- Barras com bordas pretas
- Cores sólidas vibrantes
- Cards com bordas de 8px
- Números extra-bold e grandes
- Sem sombras ou gradientes

## 🎯 Padrões de Layout

### Bottom Navigation
```
┌─────────────────────────────┐
│                             │
│        CONTEÚDO             │
│                             │
├─────────────────────────────┤
│ [🏠] [📅] [+] [📊] [⚙️]    │
└─────────────────────────────┘
```

**Características:**
- Fixa no bottom
- Ícones grandes (24-32px)
- Bordas pretas superiores
- Fundo branco sólido
- Sem indicadores suaves

### Cards de Progresso
```
┌─────────────────────────────┐
│ VOCÊ ESTÁ QUASE LÁ!         │
│                             │
│ ████████░░ 80%              │
│                             │
│ 2/5 objetivos completos     │
└─────────────────────────────┘
```

**Características:**
- Borda preta de 6-8px
- Fundo branco
- Barra de progresso com borda
- Texto extra-bold
- Espaçamento generoso (16px)

### Lista de Tarefas
```
┌─────────────────────────────┐
│ TREINOS DE HOJE             │
│                             │
│ ┌─────────────────────────┐ │
│ │ EXERCÍCIO 30min         │ │
│ │ 10:00                   │ │
│ │ [COMPLETAR]             │ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │ LEITURA 20 páginas      │ │
│ │ 10:00                   │ │
│ │ [COMPLETAR]             │ │
│ └─────────────────────────┘ │
└─────────────────────────────┘
```

**Características:**
- Cards empilhados
- Bordas pretas de 6px
- Botões destacados com bordas grossas
- Ícones grandes
- Espaçamento consistente (8px entre cards)

## 🎨 Paleta de Cores Adaptada

### Cores Base
- **Preto**: `#000000` - Bordas, texto principal
- **Branco**: `#FFFFFF` - Fundos, cards

### Cores de Acento (Sólidas)
- **Verde**: `#00FF00` - Sucesso, progresso
- **Laranja**: `#FF6600` - Ações, destaque
- **Vermelho**: `#FF0000` - Alertas, urgência

### Uso das Cores
- **Progresso**: Verde sólido
- **Ações**: Laranja sólido
- **Alertas**: Vermelho sólido
- **Texto**: Preto sobre branco
- **Bordas**: Sempre pretas ou cores sólidas

## 📐 Espaçamentos

### Sistema de Espaçamento
- Base: 8px
- Múltiplos: 8, 16, 24, 32, 40, 48px

### Aplicação
- Entre cards: 16px
- Padding interno: 16-24px
- Margens de seção: 24-32px
- Espaçamento de grid: 8px

## 🔤 Tipografia

### Hierarquia
- **Títulos**: 32-40px, weight 900
- **Subtítulos**: 24-28px, weight 900
- **Corpo**: 16-18px, weight 700
- **Pequeno**: 14px, weight 700

### Características
- Sem serifas
- Extra-bold sempre
- Alto contraste
- Espaçamento de linha: 1.2-1.4

## 🎭 Animações Brutalistas

### Transições
- Duração: 200-300ms
- Easing: `linear` (sem suavização)
- Feedback: Instantâneo e forte

### Microinterações
- Hover: Borda mais grossa (8px → 10px)
- Click: Inversão de cores (preto ↔ branco)
- Loading: Barras grossas pulsantes

## 📱 Componentes Inspirados

### 1. ProgressCard
```tsx
<ProgressCard
  title="Você está quase lá!"
  progress={80}
  current={2}
  total={5}
  label="objetivos completos"
/>
```

### 2. TaskList
```tsx
<TaskList
  tasks={[
    { id: 1, name: "Exercício", duration: "30min", time: "10:00" },
    { id: 2, name: "Leitura", duration: "20 páginas", time: "10:00" }
  ]}
  onComplete={(id) => handleComplete(id)}
/>
```

### 3. OptionGrid
```tsx
<OptionGrid
  options={[
    { id: 1, name: "Exercício", icon: "🏃", color: "green" },
    { id: 2, name: "Leitura", icon: "📖", color: "orange" }
  ]}
  columns={2}
  onSelect={(id) => handleSelect(id)}
/>
```

### 4. InsightsChart
```tsx
<InsightsChart
  data={weeklyData}
  summary={[
    { label: "3 DIAS", value: "Streak", icon: "⭐" },
    { label: "23", value: "Completos", icon: "✓" }
  ]}
/>
```

### 5. ExecutionScreen
```tsx
<ExecutionScreen
  exercise={currentExercise}
  progress={progress}
  time={time}
  onPause={() => handlePause()}
  onComplete={() => handleComplete()}
/>
```

## ✅ Checklist de Adaptação

Ao criar componentes inspirados nas referências:

- [ ] Bordas grossas (4-8px) aplicadas
- [ ] Cores sólidas (sem gradientes)
- [ ] Tipografia extra-bold
- [ ] Sem border-radius (ou máximo 4px)
- [ ] Sem sombras suaves
- [ ] Grids rígidos
- [ ] Espaçamentos múltiplos de 8px
- [ ] Alto contraste
- [ ] Animações duras (linear)

---

**Última atualização**: 2025-01-27

