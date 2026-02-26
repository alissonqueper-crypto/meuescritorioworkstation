

## Plano: Otimizações de layout mobile para a página Corrida de Bar em Bar + Header

### Resumo

Ajustar espaçamentos, tamanhos de fonte, grids e navegação para que a experiência mobile seja fluida e proporcional ao desktop, sem quebrar a identidade visual GTA.

### Alterações

#### 1. `src/components/Header.tsx` — Melhorar navegação mobile

- Adicionar a **logo** dentro do `<Link to="/">` (atualmente está vazio, linhas 38-44)
  - `<img src={logo} alt="Logo" className="h-8 md:h-10" />`
- Tornar o menu mobile mais robusto: fundo sólido `bg-background` (sem `/98` que pode causar vazamento visual)
- Adicionar separadores visuais entre os links mobile

#### 2. `src/pages/CorridaDeBarEmBar.tsx` — Otimizações mobile por seção

**Hero (linhas 138-201):**
- Reduzir `pt-40` para `pt-24` em mobile: `pt-24 md:pt-40`
- Reduzir `pb-20` para `pb-12` em mobile: `pb-12 md:pb-20`
- HUD chips: de `flex-wrap gap-3` para `gap-2` em mobile, com `text-[10px]` no chip
- Botões CTA: empilhar verticalmente em mobile com `flex-col sm:flex-row`
- Botões: `w-full sm:w-auto` para ocuparem 100% no mobile

**Seções ScrollSection (linhas 18-24):**
- Reduzir padding vertical de `py-16 md:py-24` para `py-10 md:py-24`
- Reduzir `mb-12` dos headers de seção para `mb-8 md:mb-12`

**Missão / grid 4 colunas (linhas 210-227):**
- De `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` para `grid-cols-2 lg:grid-cols-4` em mobile (2 colunas desde o início)
- Reduzir padding dos cards de `p-6` para `p-4 md:p-6`
- Reduzir número step de `text-4xl` para `text-2xl md:text-4xl`

**Dinâmica do Circuito (linhas 238-251):**
- Grid mesas: `grid-cols-2 lg:grid-cols-4` (2 colunas em mobile)
- Reduzir padding de `p-6` para `p-4 md:p-6`
- Card de volume total: reduzir padding de `p-6` para `p-4 md:p-6`

**Mapa / 11 Pontos (linhas 261-274):**
- Imagem do mapa: adicionar `max-w-full` para garantir responsividade total

**O Que Está Incluso (linhas 283-299):**
- Já está `grid-cols-2`, manter — reduzir `gap-4` para `gap-3` e padding `p-4` para `p-3 md:p-4`

**Ingressos (linhas 336-362):**
- Reduzir padding dos cards de `p-8` para `p-5 md:p-8`
- Preço: de `text-4xl` para `text-3xl md:text-4xl`

**Código de Rua (linhas 407-431):**
- Já está `grid-cols-1 md:grid-cols-2`, ok — reduzir padding de `p-6 md:p-8` ok

**FAQ (linhas 441-448):**
- Reduzir `px-6` dos accordion items para `px-4 md:px-6`

**Mapa Google (linhas 459-464):**
- Reduzir `aspect-video` para uma altura mínima fixa em mobile: `min-h-[250px]`

**Footer (linhas 468-474):**
- Já compacto, sem alteração necessária

### Detalhes técnicos

- Todas as alterações usam classes responsivas do Tailwind (`sm:`, `md:`, `lg:`)
- Nenhuma lógica funcional alterada
- A logo será restaurada no header (atualmente está vazia)
- Padrão mobile-first: valores menores como default, valores maiores com prefixo `md:`

### Resultado esperado

Layout mobile com espaçamentos proporcionais, botões CTA empilhados e full-width, grids 2 colunas desde o início, navegação com logo visível e menu mobile limpo.

