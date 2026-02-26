

## Plano: Otimizações de layout mobile para o site principal (Index, Estrutura, Contato, Footer)

### Resumo

Aplicar o mesmo padrão de otimizações mobile feitas na página Corrida de Bar em Bar: reduzir espaçamentos, ajustar grids para 2 colunas desde mobile, diminuir fontes proporcionalmente e garantir que todos os elementos fiquem bem distribuidos em telas pequenas.

### Alterações

#### 1. `src/pages/Index.tsx`

**ScrollSection (linha 16):**
- Reduzir padding vertical: de `py-16 md:py-24` para `py-10 md:py-24`

**Hero / LampContainer (linhas 92-128):**
- Reduzir logo mobile: de `w-72 md:w-96` para `w-56 md:w-96`
- Botão CTA: adicionar `w-full sm:w-auto` para ocupar 100% no mobile
- Badges inferiores (linhas 112-127): reduzir `bottom-8` para `bottom-4 md:bottom-8` e diminuir texto dos badges para `text-[10px] md:text-xs`
- Texto central "Tecnologia · Contabilidade...": esconder em mobile muito pequeno ou reduzir para `text-[10px]`

**Beneficios grid (linha 140):**
- De `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` para `grid-cols-2 lg:grid-cols-3` (2 colunas desde mobile)
- Reduzir padding dos cards: de `p-6` para `p-4 md:p-6`
- Reduzir icone container: de `w-12 h-12` para `w-10 h-10 md:w-12 md:h-12`
- Reduzir titulo card: de `text-lg` para `text-sm md:text-lg`
- Reduzir desc: de `text-sm` para `text-xs md:text-sm`

**Quem Trabalha Aqui grid (linha 165):**
- De `grid-cols-1 sm:grid-cols-2` para `grid-cols-1 sm:grid-cols-2` (manter, pois cards tem mais conteudo)
- Reduzir padding: de `p-6` para `p-4 md:p-6`
- Reduzir icone: de `w-14 h-14` para `w-10 h-10 md:w-14 md:h-14`
- Reduzir gap: de `gap-6` para `gap-4 md:gap-6`

**Subtitulos das secoes (mb-12):**
- Reduzir `mb-12` para `mb-8 md:mb-12` em todas as secoes

**Mapa Google (linhas 217-227):**
- Adicionar `min-h-[250px]` no container do iframe para mobile

**Evento card (linhas 237-254):**
- Botao CTA: `w-full sm:w-auto`

#### 2. `src/components/ui/lamp.tsx`

- Reduzir `min-h-[85vh]` para `min-h-[70vh] md:min-h-[85vh]` para o hero nao ocupar tanto espaco no mobile
- Reduzir translate do content: de `-translate-y-20` para `-translate-y-10 md:-translate-y-20`

#### 3. `src/pages/Estrutura.tsx`

- Reduzir `pt-24` para `pt-20 md:pt-24`
- Reduzir `mb-16` do header para `mb-10 md:mb-16`
- Titulo: de `text-4xl md:text-5xl` para `text-3xl md:text-5xl`
- Subtitulo galeria `mb-8` para `mb-6 md:mb-8`
- Blocos `mt-20` para `mt-12 md:mt-20`
- Subtitulo blocos `mb-12` para `mb-8 md:mb-12`
- Blocos internos `mt-16` para `mt-10 md:mt-16`
- Titulo bloco `text-xl` para `text-lg md:text-xl`

#### 4. `src/pages/Contato.tsx`

- Reduzir `pt-24` para `pt-20 md:pt-24`
- Reduzir `mb-16` do header para `mb-10 md:mb-16`
- Titulo: de `text-4xl md:text-5xl` para `text-3xl md:text-5xl`
- Botao WhatsApp: `w-full sm:w-auto`
- Grid contato: `gap-8` para `gap-6 md:gap-8`

#### 5. `src/components/Footer.tsx`

- Reduzir `py-12` para `py-8 md:py-12`
- Logo: de `h-14` para `h-10 md:h-14`
- Gap grid: de `gap-8` para `gap-6 md:gap-8`

### Detalhes tecnicos

- Todas as alteracoes usam classes responsivas do Tailwind (`sm:`, `md:`)
- Padrao mobile-first: valores menores como default, maiores com prefixo `md:`
- Nenhuma logica funcional alterada
- Foco em proporcionalidade: o que funciona bem no desktop deve ter a mesma proporcao visual no mobile

### Resultado esperado

Todas as paginas do site principal (Home, Estrutura, Contato) com layout mobile compacto e proporcional ao desktop: grids 2 colunas, espacamentos reduzidos, botoes full-width, hero mais curto e tipografia ajustada.

