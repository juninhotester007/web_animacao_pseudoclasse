import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import React, { useState, useEffect } from "react";
import { Code, Play, ArrowRight, MousePointer2 } from "lucide-react";

const queryClient = new QueryClient();

function Navigation() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2 font-bold text-lg text-primary tracking-tight">
          <Code className="h-5 w-5 text-accent" />
          <span>CSS<span className="text-accent">Mestre</span></span>
        </div>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
          <a href="#pseudo-classes" className="hover:text-primary transition-colors">Pseudo-classes</a>
          <a href="#transitions" className="hover:text-primary transition-colors">Transições</a>
          <a href="#animations" className="hover:text-primary transition-colors">Animações</a>
        </nav>
      </div>
    </header>
  );
}

function CodeBlock({ code }: { code: string }) {
  // Simple syntax highlighting simulation for CSS
  const highlightedCode = code
    .replace(/(:hover|:focus|:active|:visited|:first-child|:last-child|:nth-child|:not|:disabled|:checked|:placeholder-shown|@keyframes)/g, '<span class="text-pink-400">$1</span>')
    .replace(/(transition-property|transition-duration|transition-timing-function|transition-delay|transition|animation-name|animation-duration|animation-iteration-count|animation-direction|animation-timing-function|animation-delay|animation-fill-mode|animation|transform|background-color|color|opacity|border-color|cursor|filter|text-decoration|outline|box-shadow|border-radius|background|border-style)/g, '<span class="text-blue-400">$1</span>')
    .replace(/([0-9]+s|[0-9]+px|[0-9]+%|[0-9]+deg|[0-9]+)/g, '<span class="text-orange-400">$1</span>')
    .replace(/(ease|linear|ease-in|ease-out|ease-in-out|cubic-bezier|infinite|forwards|alternate|step-end|none|odd|even|dashed|line-through)/g, '<span class="text-green-400">$1</span>');

  return (
    <div className="relative rounded-lg bg-[#0d1117] p-4 font-mono text-sm shadow-xl overflow-x-auto border border-white/5 h-full min-h-[160px]">
      <div className="absolute top-0 right-0 p-2 opacity-30 select-none text-xs">CSS</div>
      <pre className="text-gray-300">
        <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      </pre>
    </div>
  );
}

function DemoBox({ children, title }: { children: React.ReactNode, title: string }) {
  return (
    <div className="rounded-lg border border-border/50 bg-card overflow-hidden h-full flex flex-col">
      <div className="bg-muted/30 px-4 py-2 text-xs font-medium text-muted-foreground border-b border-border/50 flex items-center gap-2 shrink-0">
        <Play className="w-3 h-3 text-accent" /> Resultado Interativo
      </div>
      <div className="p-8 flex-1 flex items-center justify-center min-h-[200px] relative bg-grid-white/[0.02] bg-[length:20px_20px]">
        {children}
      </div>
    </div>
  );
}

function Section({ id, title, subtitle, children, number }: { id: string, title: string, subtitle: string, children: React.ReactNode, number: string }) {
  return (
    <section id={id} className="py-24 border-b border-border/20 last:border-0 scroll-mt-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 text-accent font-bold text-xl border border-accent/20">{number}</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">{title}</h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">{subtitle}</p>
        </div>
        <div className="space-y-24">
          {children}
        </div>
      </div>
    </section>
  );
}

function ConceptBlock({ title, description, code, children }: { title: string, description: React.ReactNode, code: string, children: React.ReactNode }) {
  return (
    <div className="grid lg:grid-cols-2 gap-8 items-stretch">
      <div className="space-y-6 flex flex-col">
        <div>
          <h3 className="text-xl font-bold text-primary mb-2 font-mono flex items-center gap-2">
            <span className="text-accent">#</span> {title}
          </h3>
          <div className="text-muted-foreground leading-relaxed text-sm md:text-base">{description}</div>
        </div>
        <div className="flex-1 min-h-[160px]">
          <CodeBlock code={code} />
        </div>
      </div>
      <div className="h-full min-h-[200px]">
        <DemoBox title={title}>{children}</DemoBox>
      </div>
    </div>
  );
}

function Home() {
  const [triggerReplay, setTriggerReplay] = useState(0);

  return (
    <div className="min-h-screen w-full bg-background text-foreground selection:bg-accent/30 selection:text-accent-foreground">
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-accent/5 blur-[120px] rounded-full max-w-3xl mx-auto top-0"></div>
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              Domine o <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">Visual</span> da Web
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Um guia interativo e prático sobre Pseudo-classes, Transições e Animações em CSS. Aprenda fazendo.
            </p>
            <div className="flex justify-center gap-4">
              <a href="#pseudo-classes" className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 rounded-md">
                Começar a aprender <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        <Section id="pseudo-classes" number="1" title="Pseudo-classes" subtitle="As pseudo-classes permitem estilizar um elemento com base no seu estado (como hover ou focus) ou na sua posição no DOM.">
          
          <ConceptBlock 
            title=":hover" 
            description="Aplica estilos quando o usuário passa o cursor (mouse) sobre o elemento. Essencial para botões e links."
            code={`.btn:hover {
  background-color: #06b6d4;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 10px 15px rgba(0,0,0,0.5);
}`}
          >
            <button className="px-6 py-3 bg-secondary text-secondary-foreground font-medium rounded-md transition-all duration-300 demo-hover-btn flex items-center gap-2">
              <MousePointer2 className="w-4 h-4" /> Passe o mouse
            </button>
          </ConceptBlock>

          <ConceptBlock 
            title=":focus" 
            description="Ativado quando um elemento (como um input) recebe foco. Crucial para acessibilidade de navegação por teclado."
            code={`.input:focus {
  outline: none;
  border-color: #06b6d4;
  box-shadow: 0 0 0 3px rgba(6,182,212,0.3);
}`}
          >
            <input type="text" placeholder="Clique para focar..." className="px-4 py-2 bg-background border border-border rounded-md text-foreground transition-all duration-200 demo-focus-input w-full max-w-xs" />
          </ConceptBlock>

          <ConceptBlock 
            title=":active" 
            description="Representa o estado exato em que o elemento está sendo ativado (clicado). Dá a sensação física de 'pressionar'."
            code={`.btn:active {
  transform: scale(0.95);
  background-color: white;
  color: black;
}`}
          >
            <button className="px-6 py-3 bg-secondary text-secondary-foreground font-medium rounded-md transition-all duration-100 demo-active-btn">
              Clique e segure
            </button>
          </ConceptBlock>

          <ConceptBlock 
            title=":visited" 
            description="Aplica-se a links que já foram visitados pelo usuário. Por motivos de privacidade e segurança, as propriedades que podem ser estilizadas são limitadas (geralmente apenas cor)."
            code={`.link:visited {
  color: #a855f7;
}`}
          >
            <a href="#" onClick={(e) => e.preventDefault()} className="text-accent underline font-medium demo-visited-link text-lg">Link Visitado</a>
          </ConceptBlock>

          <ConceptBlock 
            title=":first-child & :last-child" 
            description={<p>Seleciona o primeiro ou o último elemento dentro de um contêiner pai. Ótimo para remover bordas ou margens extras nas extremidades de listas.</p>}
            code={`.item:first-child {
  border-color: #06b6d4;
  background: rgba(6,182,212,0.1);
}

.item:last-child {
  border-color: #a855f7;
  background: rgba(168,85,247,0.1);
}`}
          >
            <div className="flex flex-col gap-2 w-full max-w-[200px] demo-first-child demo-last-child">
              <div className="p-2 border border-border rounded text-center text-sm transition-colors">Primeiro</div>
              <div className="p-2 border border-border rounded text-center text-sm transition-colors">Meio</div>
              <div className="p-2 border border-border rounded text-center text-sm transition-colors">Meio</div>
              <div className="p-2 border border-border rounded text-center text-sm transition-colors">Último</div>
            </div>
          </ConceptBlock>

          <ConceptBlock 
            title=":nth-child(n)" 
            description="Seleciona elementos com base em sua posição. Aceita números, 'odd' (ímpar), 'even' (par) ou fórmulas matemáticas como '3n+1'."
            code={`.list-item:nth-child(odd) {
  background: rgba(6,182,212,0.1);
  border-color: #06b6d4;
}`}
          >
            <div className="flex flex-col gap-2 w-full max-w-[200px] demo-nth-child">
              <div className="p-2 border border-border rounded text-center text-sm transition-colors">Item 1</div>
              <div className="p-2 border border-border rounded text-center text-sm transition-colors">Item 2</div>
              <div className="p-2 border border-border rounded text-center text-sm transition-colors">Item 3</div>
              <div className="p-2 border border-border rounded text-center text-sm transition-colors">Item 4</div>
            </div>
          </ConceptBlock>

          <ConceptBlock 
            title=":not(selector)" 
            description="A pseudo-classe de negação seleciona os elementos que NÃO correspondem a um seletor específico."
            code={`.box:not(.special) {
  opacity: 0.3;
  filter: grayscale(1);
}`}
          >
            <div className="flex gap-4 demo-not-child">
              <div className="w-12 h-12 bg-purple-500 rounded-md"></div>
              <div className="w-12 h-12 bg-accent rounded-md special border-2 border-white flex items-center justify-center text-xs font-bold shadow-[0_0_15px_rgba(6,182,212,0.5)]">✨</div>
              <div className="w-12 h-12 bg-pink-500 rounded-md"></div>
            </div>
          </ConceptBlock>

          <ConceptBlock 
            title="Forms: :disabled & :checked" 
            description="Estilize formulários de acordo com seu estado funcional."
            code={`.btn:disabled {
  opacity: 0.5; cursor: not-allowed;
}
.checkbox:checked + label {
  text-decoration: line-through;
  opacity: 0.7;
}`}
          >
            <div className="flex flex-col gap-6 w-full max-w-[200px]">
              <button disabled className="px-4 py-2 bg-primary text-primary-foreground rounded demo-disabled">Desabilitado</button>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="check1" className="w-5 h-5 accent-accent demo-checked" defaultChecked />
                <label htmlFor="check1" className="transition-all">Tarefa concluída</label>
              </div>
            </div>
          </ConceptBlock>

          <ConceptBlock 
            title=":placeholder-shown" 
            description="Aplica-se quando o placeholder de um input está visível (ou seja, o input está vazio). Útil para animações de floating labels."
            code={`.input:placeholder-shown {
  border-color: #f43f5e;
  border-style: dashed;
}`}
          >
            <input type="text" placeholder="Digite algo para mudar a borda" className="px-4 py-2 bg-transparent border-2 rounded-md text-foreground transition-all duration-300 demo-placeholder-shown w-full max-w-xs focus:outline-none" />
          </ConceptBlock>

        </Section>

        <Section id="transitions" number="2" title="Transições" subtitle="Transições permitem que as mudanças de valores de propriedades CSS ocorram suavemente.">
          
          <ConceptBlock 
            title="transition-property & duration" 
            description="Define quais propriedades vão ser animadas e por quanto tempo. Pode usar 'all' para todas as propriedades animáveis."
            code={`.box {
  background-color: #1e293b;
  border-radius: 8px;
  transition-property: background-color, border-radius;
  transition-duration: 0.5s;
}
.box:hover {
  background-color: #a855f7;
  border-radius: 50%;
}`}
          >
            <div className="w-24 h-24 bg-secondary rounded-lg transition-[background-color,border-radius] duration-500 hover:bg-purple-500 hover:rounded-full cursor-pointer flex items-center justify-center text-center text-xs font-medium">Hover</div>
          </ConceptBlock>

          <ConceptBlock 
            title="transition-timing-function" 
            description={<p>A função de tempo dita a aceleração da transição. Comparativo de diferentes curvas de tempo para a mesma duração.</p>}
            code={`.linear { transition-timing-function: linear; }
.ease-out { transition-timing-function: ease-out; }
.ease-in { transition-timing-function: ease-in; }
.cubic { transition-timing-function: cubic-bezier(0.68,-0.55,0.265,1.55); }`}
          >
            <div className="w-full flex flex-col gap-4 group">
              <div className="text-xs text-muted-foreground mb-2">Passe o mouse sobre a área para acionar todos:</div>
              <div className="flex items-center gap-4">
                <span className="w-20 text-xs font-mono">linear</span>
                <div className="h-6 bg-secondary rounded-md w-8 group-hover:w-full transition-all duration-[1500ms] ease-linear"></div>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-20 text-xs font-mono">ease-out</span>
                <div className="h-6 bg-secondary rounded-md w-8 group-hover:w-full transition-all duration-[1500ms] ease-out"></div>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-20 text-xs font-mono">ease-in</span>
                <div className="h-6 bg-secondary rounded-md w-8 group-hover:w-full transition-all duration-[1500ms] ease-in"></div>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-20 text-xs font-mono">cubic</span>
                <div className="h-6 bg-secondary rounded-md w-8 group-hover:w-full transition-all duration-[1500ms]" style={{ transitionTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' }}></div>
              </div>
            </div>
          </ConceptBlock>

          <ConceptBlock 
            title="transition-delay" 
            description="Adia o início da transição. Muito útil para animações em cascata onde itens aparecem um após o outro."
            code={`.box {
  transition: all 0.5s ease;
  transition-delay: 0.5s;
}
.box:hover {
  transform: translateX(50px);
}`}
          >
            <div className="flex flex-col gap-2 w-full max-w-[200px] cursor-pointer hover:[&>div]:translate-x-8">
              <div className="h-8 bg-secondary rounded flex items-center px-3 text-xs transition-transform duration-300 delay-0">Delay: 0s</div>
              <div className="h-8 bg-secondary rounded flex items-center px-3 text-xs transition-transform duration-300 delay-100">Delay: 0.1s</div>
              <div className="h-8 bg-secondary rounded flex items-center px-3 text-xs transition-transform duration-300 delay-200">Delay: 0.2s</div>
            </div>
          </ConceptBlock>

          <ConceptBlock 
            title="Shorthand (Atalho)" 
            description="A maneira mais comum de escrever transições, juntando todas as propriedades em uma linha: property duration timing-function delay."
            code={`.box {
  transition: transform 0.5s cubic-bezier(...) 0.1s, 
              background-color 0.3s ease-in;
}`}
          >
            <div className="w-24 h-24 bg-secondary rounded-lg demo-transition-shorthand cursor-pointer flex items-center justify-center text-xs text-center p-2 font-medium">Complex Hover</div>
          </ConceptBlock>

        </Section>

        <Section id="animations" number="3" title="Animações (@keyframes)" subtitle="Animações podem rodar sozinhas, em loop, e ter múltiplos passos detalhados (keyframes).">
          
          <ConceptBlock 
            title="@keyframes e animation-name" 
            description="Você define a animação criando keyframes. Depois, aplica usando animation-name e duration."
            code={`@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); opacity: 0.7; }
}
.element {
  animation-name: pulse;
  animation-duration: 2s;
}`}
          >
            <div className="w-24 h-24 bg-accent rounded-full anim-pulse shadow-[0_0_30px_rgba(6,182,212,0.3)] flex items-center justify-center font-bold text-background">Pulse</div>
          </ConceptBlock>

          <ConceptBlock 
            title="animation-iteration-count" 
            description="Quantas vezes a animação deve rodar. Pode ser um número exato ou 'infinite' para rodar para sempre."
            code={`.box {
  animation-name: spin;
  animation-duration: 1s;
  animation-iteration-count: 3;
}`}
          >
            <div className="flex flex-col items-center gap-4">
              <div key={triggerReplay} className="w-16 h-16 border-4 border-secondary border-t-purple-500 rounded-full anim-iteration"></div>
              <button onClick={() => setTriggerReplay(prev => prev + 1)} className="px-3 py-1 bg-secondary text-xs rounded hover:bg-secondary/80 transition-colors">Replay (Roda 3x)</button>
            </div>
          </ConceptBlock>

          <ConceptBlock 
            title="animation-direction" 
            description="Define se a animação deve tocar de trás para frente, ou alternar entre normal e reverso."
            code={`.box {
  animation: rotate-color 2s infinite alternate;
}`}
          >
            <div className="w-24 h-24 rounded-md flex items-center justify-center text-white text-xs font-bold anim-direction-alternate shadow-lg">Alternate</div>
          </ConceptBlock>

          <ConceptBlock 
            title="animation-fill-mode" 
            description="Dita qual será o estilo do elemento antes e depois da animação rodar. 'forwards' mantém o estado do final da animação."
            code={`.box {
  animation-name: slide-in;
  animation-duration: 1s;
  animation-fill-mode: forwards;
}`}
          >
            <div className="w-full relative h-24 flex items-center bg-secondary/20 rounded-md overflow-hidden p-4">
              <div key={`fill-${triggerReplay}`} className="px-4 py-2 bg-primary text-primary-foreground rounded anim-fill-forwards">Fica aqui</div>
              <button onClick={() => setTriggerReplay(prev => prev + 1)} className="absolute bottom-2 right-2 px-2 py-1 bg-background/50 text-[10px] rounded hover:bg-background transition-colors z-10 backdrop-blur">Replay</button>
            </div>
          </ConceptBlock>

          <ConceptBlock 
            title="animation (Shorthand)" 
            description="name duration timing-function delay iteration-count direction fill-mode play-state;"
            code={`.box {
  animation: bounce 1s cubic-bezier(...) 1s infinite alternate forwards;
}`}
          >
            <div className="w-16 h-16 bg-accent rounded-full anim-delay flex items-center justify-center text-xs font-bold text-background shadow-lg">Delay 1s</div>
          </ConceptBlock>

          <div className="mt-32 pt-16 border-t border-border/20 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-6 py-2 border border-border/50 rounded-full font-mono text-sm text-accent">Playground</div>
            <h3 className="text-3xl font-bold text-primary mb-12 text-center">Galeria de Animações</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="bg-card border border-border/30 rounded-xl p-8 flex flex-col items-center justify-center gap-8 h-56 hover:border-border transition-colors">
                <div className="w-16 h-16 bg-purple-500 rounded-full anim-bounce shadow-lg shadow-purple-500/20"></div>
                <span className="text-xs font-mono text-muted-foreground bg-secondary px-3 py-1 rounded-full">bounce</span>
              </div>
              <div className="bg-card border border-border/30 rounded-xl p-8 flex flex-col items-center justify-center gap-8 h-56 hover:border-border transition-colors">
                <div className="w-16 h-16 border-4 border-secondary border-t-accent rounded-full anim-spin"></div>
                <span className="text-xs font-mono text-muted-foreground bg-secondary px-3 py-1 rounded-full">spin loader</span>
              </div>
              <div className="bg-card border border-border/30 rounded-xl p-8 flex flex-col items-center justify-center gap-8 h-56 hover:border-border transition-colors">
                <div className="text-3xl font-mono flex items-center text-primary">
                  Dev<span className="w-4 h-8 bg-accent ml-[2px] anim-blink"></span>
                </div>
                <span className="text-xs font-mono text-muted-foreground bg-secondary px-3 py-1 rounded-full">typing cursor</span>
              </div>
              <div className="bg-card border border-border/30 rounded-xl p-8 flex flex-col items-center justify-center gap-8 h-56 md:col-span-2 hover:border-border transition-colors group">
                <div className="w-full h-20 rounded-lg anim-gradient shadow-xl opacity-80 group-hover:opacity-100 transition-opacity"></div>
                <span className="text-xs font-mono text-muted-foreground bg-secondary px-3 py-1 rounded-full">color shifting gradient</span>
              </div>
              <div className="bg-card border border-border/30 rounded-xl p-8 flex flex-col items-center justify-center gap-8 h-56 overflow-hidden relative hover:border-border transition-colors">
                <div className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-full anim-slide absolute shadow-lg">Deslize</div>
                <span className="text-xs font-mono text-muted-foreground bg-secondary px-3 py-1 rounded-full absolute bottom-6">slide entrance</span>
              </div>
            </div>
          </div>
        </Section>
      </main>

      <footer className="border-t border-border/20 py-16 mt-24 bg-card/30">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 font-bold text-xl text-primary mb-4">
            <Code className="h-6 w-6 text-accent" />
            <span>CSS<span className="text-accent">Mestre</span></span>
          </div>
          <p className="text-muted-foreground max-w-md mx-auto">
            Uma referência interativa desenhada para tornar o aprendizado de propriedades dinâmicas de CSS visual e gratificante.
          </p>
        </div>
      </footer>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
