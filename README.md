# 📋 Task Manager

Um gerenciador de tarefas moderno construído com React, TypeScript e Vite, oferecendo visualizações em Kanban Board e Flow Chart para organização eficiente de projetos e tarefas.

## ✨ Funcionalidades

- 🎯 **Kanban Board**: Interface drag-and-drop para gerenciamento visual de tarefas
- 🔄 **Flow View**: Visualização de dependências entre tarefas em formato de fluxograma
- 🌓 **Tema Dark/Light**: Alternância entre temas claro e escuro
- 💾 **Persistência Local**: Dados salvos automaticamente no localStorage
- 📱 **Responsivo**: Interface adaptável para desktop e mobile

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js (versão 18 ou superior)
- pnpm (recomendado) ou npm

### Instalação e Execução

1. **Clone o repositório:**
```bash
git clone <url-do-repositorio>
cd task-manager
```

2. **Instale as dependências:**
```bash
pnpm install
# ou
npm install
```

3. **Execute o projeto em modo de desenvolvimento:**
```bash
pnpm dev
# ou
npm run dev
```

4. **Acesse a aplicação:**
   - Abra [http://localhost:5173](http://localhost:5173) no seu navegador

### Scripts Disponíveis

- `pnpm dev` - Executa o projeto em modo de desenvolvimento
- `pnpm build` - Gera build de produção
- `pnpm preview` - Visualiza o build de produção
- `pnpm test` - Executa os testes
- `pnpm test:ui` - Executa os testes com interface visual
- `pnpm lint` - Executa o linter
- `pnpm type-check` - Verifica tipos TypeScript

## 🏗️ Arquitetura e Tecnologias

### Stack Principal

- **React 19** - Biblioteca para interfaces de usuário
- **TypeScript** - Tipagem estática
- **Vite** - Bundler e dev server
- **Tailwind CSS** - Framework CSS utilitário
- **Zustand** - Gerenciamento de estado global

### Bibliotecas de UI e Funcionalidades

- **@xyflow/react** - Renderização de fluxogramas interativos
- **@dnd-kit** - Funcionalidade drag-and-drop
- **@radix-ui** - Componentes acessíveis de baixo nível
- **Lucide React** - Biblioteca de ícones
- **React Router** - Roteamento

### Testes e Qualidade

- **Vitest** - Framework de testes
- **Testing Library** - Utilitários para testes de componentes
- **ESLint** - Linter para qualidade de código

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── ui/             # Componentes de interface base
│   ├── __tests__/      # Testes de componentes
│   ├── flow-view.tsx   # Visualização em fluxograma
│   ├── kaban-board.tsx # Board Kanban
│   ├── kaban-card.tsx  # Card de tarefa
│   ├── kaban-column.tsx # Coluna do Kanban
│   ├── header.tsx      # Cabeçalho da aplicação
│   ├── modal.tsx       # Modal responsivo
│   └── theme-*.tsx     # Componentes de tema
├── hooks/              # Custom hooks
├── lib/                # Utilitários e helpers
├── pages/              # Páginas da aplicação
├── store/              # Gerenciamento de estado (Zustand)
├── types.ts            # Definições de tipos TypeScript
└── main.tsx           # Ponto de entrada da aplicação
```

## 🔧 Decisões Técnicas Importantes

### 1. **Gerenciamento de Estado - Zustand**
- **Por quê:** Alternativa mais leve ao Redux, com menos boilerplate
- **Benefícios:** API simples, TypeScript nativo, persistência automática
- **Implementação:** Store único para tarefas com persistência no localStorage

### 2. **Estilização - Tailwind CSS**
- **Por quê:** Produtividade e consistência no design
- **Benefícios:** Classes utilitárias, purge automático, tema customizável
- **Configuração:** Tema personalizado com variáveis CSS para dark/light mode

### 3. **Drag and Drop - @dnd-kit**
- **Por quê:** Melhor performance e acessibilidade comparado ao react-beautiful-dnd
- **Benefícios:** Suporte a keyboard, touch devices, melhor TypeScript
- **Uso:** Implementado no Kanban Board para reordenação de tarefas e colunas

### 4. **Visualização de Fluxo - @xyflow/react**
- **Por quê:** Biblioteca especializada em grafos e fluxogramas
- **Benefícios:** Performance otimizada, customização avançada, interatividade
- **Implementação:** Visualização de dependências entre tarefas

### 5. **Componentes UI - Radix UI**
- **Por quê:** Componentes acessíveis e sem estilo predefinido
- **Benefícios:** WAI-ARIA compliant, composição flexível, TypeScript
- **Uso:** Base para Modal, Dropdown, Dialog, etc.

### 6. **Roteamento - React Router v7**
- **Por quê:** Padrão da comunidade React
- **Implementação:** Configuração simples com redirecionamentos

### 7. **Testes - Vitest + Testing Library**
- **Por quê:** Compatibilidade nativa com Vite, performance superior ao Jest
- **Configuração:** 
  - Ambiente jsdom para testes de componentes
  - Mocks para APIs do navegador (ResizeObserver, matchMedia)
  - Setup global para Testing Library

### 8. **TypeScript Strict Mode**
- **Configuração:** Tipagem rigorosa para maior segurança
- **Benefícios:** Detecção precoce de erros, melhor DX

### 9. **Estrutura Responsiva**
- **Estratégia:** Mobile-first com breakpoints Tailwind
- **Implementação:** 
  - Modal/Drawer adaptativo baseado no tamanho da tela
  - Layout flexível para diferentes dispositivos

### 10. **Performance**
- **React.memo:** Componentes otimizados para re-renderizações
- **useMemo/useCallback:** Otimização de cálculos pesados

## 🧪 Testes

O projeto inclui testes unitários para componentes principais:

```bash
# Executar todos os testes
pnpm test

# Executar testes com interface visual
pnpm test:ui

# Executar testes em modo watch
pnpm test --watch
```

### Cobertura de Testes

- ✅ Componentes de interface
- ✅ Funcionalidades do Kanban Board
- ✅ Renderização de páginas
- ✅ Mocks para APIs do navegador

## 🌐 Compatibilidade

- **Navegadores:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Dispositivos:** Desktop, Tablet, Mobile
- **Resolução:** Responsivo a partir de 320px

---

**Desenvolvido com ❤️ usando React + TypeScript + Vite**
