# CSSMestre — Guia Interativo de CSS

Uma aplicação web educacional interativa para aprender Pseudo-classes, Transições e Animações em CSS. O aluno aprende fazendo: cada conceito é apresentado com um bloco de código real e um resultado visual interativo ao lado, sem precisar sair da página.

---

## Proposta Educacional

O **CSSMestre** parte da ideia de que o CSS visual é melhor aprendido de forma prática e imediata. Em vez de ler sobre `:hover` em um artigo estático, o aluno vê o efeito acontecendo ao passar o mouse. Em vez de imaginar a diferença entre `ease-in` e `ease-out`, ele observa as duas curvas correndo ao mesmo tempo.

### O que o aluno aprende

A aplicação cobre três grandes pilares do CSS dinâmico, divididos em seções numeradas:

#### 1 — Pseudo-classes
Estilização baseada em **estado** ou **posição no DOM**:

| Pseudo-classe | O que ensina |
|---|---|
| `:hover` | Feedback visual ao passar o cursor — essencial para botões e links |
| `:focus` | Acessibilidade e navegação por teclado |
| `:active` | Sensação física de "pressionar" um elemento |
| `:visited` | Limitações de privacidade do navegador em links visitados |
| `:first-child` / `:last-child` | Seleção por posição para remover bordas/margens extras |
| `:nth-child(n)` | Fórmulas para listas (odd, even, 3n+1) |
| `:not(selector)` | Lógica de negação em seletores |
| `:disabled` / `:checked` | Estilização de estados funcionais em formulários |
| `:placeholder-shown` | Floating labels e UX de inputs |

#### 2 — Transições
Como fazer mudanças de propriedades acontecerem **suavemente**:

| Propriedade | O que ensina |
|---|---|
| `transition-property` / `transition-duration` | Quais propriedades animar e por quanto tempo |
| `transition-timing-function` | Comparativo visual entre `linear`, `ease-out`, `ease-in` e `cubic-bezier` |
| `transition-delay` | Animações em cascata (itens aparecem um após o outro) |
| Shorthand | Como escrever múltiplas transições em uma linha |

#### 3 — Animações (`@keyframes`)
Animações autônomas, em loop, com múltiplos passos:

| Propriedade | O que ensina |
|---|---|
| `@keyframes` + `animation-name` | Como definir e aplicar uma animação |
| `animation-iteration-count` | Número de repetições — inclusive `infinite` |
| `animation-direction` | Normal vs. `alternate` (ida e volta) |
| `animation-fill-mode` | O que acontece com o elemento antes/depois da animação — `forwards` |
| Shorthand | Todos os parâmetros em uma linha |
| Galeria | `bounce`, `spin`, `typing cursor`, `gradient shift`, `slide entrance` |

---

## Como Funciona a Interface

Cada conceito é exibido em um bloco dividido em duas colunas:

```
┌─────────────────────────────────────┬──────────────────────────────────┐
│  Título + descrição                 │                                  │
│                                     │   Resultado Interativo           │
│  ┌─────────────────────────────┐   │   (elemento real com o CSS       │
│  │  Bloco de código CSS        │   │    aplicado — hover, focus,      │
│  │  com syntax highlighting    │   │    animações funcionando)        │
│  └─────────────────────────────┘   │                                  │
└─────────────────────────────────────┴──────────────────────────────────┘
```

O syntax highlighting do código é feito em tempo de execução, destacando:
- **Rosa** — pseudo-classes e `@keyframes`
- **Azul** — propriedades CSS
- **Laranja** — valores numéricos (px, s, %, deg)
- **Verde** — palavras-chave (`ease`, `linear`, `infinite`, `forwards`)

---

## Stack Técnica

| Camada | Tecnologia |
|---|---|
| Framework UI | React 19 |
| Linguagem | TypeScript 5.9 |
| Estilo | Tailwind CSS 4 + CSS custom properties |
| Roteamento | Wouter |
| Servidor de desenvolvimento | Vite 7 |
| API (backend) | Express 5 |
| Banco de dados | PostgreSQL + Drizzle ORM |
| Validação | Zod (`zod/v4`) + `drizzle-zod` |
| Codegen de API | Orval (a partir do spec OpenAPI) |
| Build do servidor | esbuild |
| Gerenciador de pacotes | pnpm (workspaces) |
| Node.js | 24 |

---

## Estrutura do Repositório

```
Style-Playground/
├── artifacts/
│   ├── css-playground/          # Frontend — app educacional (CSSMestre)
│   │   ├── src/
│   │   │   ├── App.tsx          # Toda a UI — seções, demos, galeria
│   │   │   ├── index.css        # Tema dark, @keyframes, classes de demo
│   │   │   └── components/ui/   # Componentes shadcn/ui
│   │   └── vite.config.ts
│   │
│   ├── api-server/              # Backend Express
│   │   └── src/
│   │       ├── app.ts           # Setup Express (CORS, logging, rotas)
│   │       ├── routes/health.ts # GET /api/healthz
│   │       └── lib/logger.ts    # Logger Pino
│   │
│   └── mockup-sandbox/          # Sandbox para protótipos de componentes
│
├── lib/
│   ├── api-spec/
│   │   └── openapi.yaml         # Contrato OpenAPI — fonte da verdade da API
│   ├── api-client-react/        # Hooks gerados pelo Orval (TanStack Query)
│   ├── api-zod/                 # Schemas Zod gerados a partir do OpenAPI
│   └── db/
│       ├── src/schema/index.ts  # Schema Drizzle — fonte da verdade do banco
│       └── drizzle.config.ts
│
├── scripts/                     # Scripts utilitários do workspace
├── pnpm-workspace.yaml          # Definição dos pacotes + catálogo de versões
└── tsconfig.base.json           # Configuração TypeScript compartilhada
```

---

## Pré-requisitos

- [Node.js 24+](https://nodejs.org/)
- [pnpm 9+](https://pnpm.io/installation)
- PostgreSQL rodando localmente (ou connection string de um serviço externo)

---

## Instalação

```bash
# Clone o repositório
git clone <url-do-repo>
cd Style-Playground/Style-Playground

# Instale as dependências (pnpm é obrigatório)
pnpm install
```

---

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do workspace:

```env
DATABASE_URL=postgresql://usuario:senha@localhost:5432/cssmestre
```

---

## Rodando o Projeto

```bash
# Iniciar o servidor de desenvolvimento do frontend (css-playground)
pnpm --filter @workspace/css-playground run dev

# Iniciar o servidor de API (porta 5000)
pnpm --filter @workspace/api-server run dev

# Typecheck completo em todos os pacotes
pnpm run typecheck

# Build de produção (typecheck + build)
pnpm run build
```

---

## Fluxo de Desenvolvimento

### Alterando conteúdo educacional

Todo o conteúdo — seções, demos, código de exemplo — está em:
```
artifacts/css-playground/src/App.tsx
```

As animações e estilos específicos das demos estão em:
```
artifacts/css-playground/src/index.css
```

### Adicionando um novo conceito CSS

1. Adicione um novo `<ConceptBlock>` dentro da `<Section>` correspondente em `App.tsx`
2. Se precisar de CSS custom (que Tailwind não cobre), adicione a classe no `index.css`
3. O bloco `code` é uma string CSS pura — o highlighting é aplicado automaticamente

### Adicionando um novo endpoint na API

1. Edite o contrato em `lib/api-spec/openapi.yaml`
2. Regenere os clientes:
   ```bash
   pnpm --filter @workspace/api-spec run codegen
   ```
3. Implemente a rota em `artifacts/api-server/src/routes/`

### Alterando o schema do banco

1. Edite `lib/db/src/schema/index.ts`
2. Aplique as mudanças (apenas em desenvolvimento):
   ```bash
   pnpm --filter @workspace/db run push
   ```

---

## Design do Tema

A aplicação usa um tema **dark** com cores em CSS custom properties (HSL):

| Token | Uso |
|---|---|
| `--accent` (ciano `#06b6d4`) | Destaque principal — títulos, ícones, borders ativos |
| `--background` (azul escuro profundo) | Fundo da página |
| `--secondary` | Blocos de código e elementos neutros |
| `--primary` | Texto principal |

Fontes:
- **Outfit** — textos e títulos (sans-serif moderna)
- **JetBrains Mono** — código e labels técnicos (monospace)

---

## Segurança de Dependências

O `pnpm-workspace.yaml` impõe `minimumReleaseAge: 1440` — nenhum pacote pode ser instalado se foi publicado há menos de 24 horas. Isso protege o projeto contra ataques de supply-chain (o vetor #1 de comprometimento no ecossistema npm).

---

## Licença

MIT
