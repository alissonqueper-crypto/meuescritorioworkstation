

## Plano: Refinar tipografia e UI com fontes icônicas do GTA San Andreas

### Resumo

Adicionar as fontes **Pricedown** (via CDN), **Diplomata SC** e **Chivo** (Google Fonts), configurá-las no Tailwind e aplicá-las na página "Corrida de Bar em Bar" para títulos, destaques e elementos de HUD. Também refinar os cards, botões e cores para se aproximar ainda mais da estética do jogo.

### Alterações

#### 1. `index.html` — Carregar fontes

- Adicionar `<link>` para **Diplomata SC** e **Chivo** do Google Fonts (junto ao `<link>` existente de Poppins/Orbitron/Bungee)
- Adicionar `<link>` para a fonte **Pricedown** via CDN do onlinewebfonts.com
- Usar `rel="preload"` ou `media="print" onload` para carregamento assíncrono sem bloquear render

#### 2. `tailwind.config.ts` — Registrar novas famílias

Adicionar ao `fontFamily`:
- `"gta-title": ["Pricedown", "Bungee", "Impact", "sans-serif"]`
- `"gta-script": ["Diplomata SC", "serif"]`
- `"gta-hud": ["Chivo", "sans-serif"]`

#### 3. `src/pages/CorridaDeBarEmBar.tsx` — Aplicar tipografia e refinamentos visuais

**Títulos (H1, H2):**
- Trocar `font-gta` por `font-gta-title` em todos os `<h1>` e `<h2>`
- Adicionar `style={{ textShadow: "3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000" }}` nos títulos principais para o efeito de contorno clássico

**Destaque "San Andreas Edition":**
- Trocar `font-gta` por `font-gta-script` na linha do subtítulo "GTA San Andreas Edition"

**Elementos de HUD (chips, labels, botões):**
- Trocar `font-gta` por `font-gta-hud` nos chips HUD, números de passos, e labels de interface
- Adicionar `uppercase italic font-bold` onde apropriado

**Corpo de texto:**
- Reduzir `leading` nos parágrafos descritivos para `leading-snug` (mais compacto, estilo menu de jogo)

**Botões principais:**
- Adicionar `border-2 border-black shadow-[0_0_10px_rgba(34,197,94,0.3)]` nos `.btn-gta` para borda preta + brilho externo

**Cards de personagem (ingressos):**
- Adicionar `bg-black/60 backdrop-blur-sm` para fundo semi-transparente escuro estilo menu de pausa
- Bordas levemente mais arredondadas

**Cores de valor monetário:**
- Preços: trocar `text-gta-green-light` por `text-[#22c55e]` (verde neon exato)
- Alertas (como "⚠ Sem devolver o copo..."): usar `text-[#ef4444]`

#### 4. `src/index.css` — Refinamentos nos utilitários GTA

- Atualizar `.btn-gta` para incluir `border: 2px solid #000` e `box-shadow` com brilho verde
- Atualizar `.gta-mission-card` para os cards de personagem com `backdrop-filter: blur`

### Detalhes técnicos

- As fontes Diplomata SC e Chivo são carregadas do Google Fonts com `display=swap` para não bloquear render
- Pricedown é carregada via CDN externo; o `<link>` usa atributo `crossorigin` para garantir cache correto
- O fallback de Pricedown é Bungee (já carregada), garantindo que mesmo se o CDN falhar, o visual GTA se mantém
- Nenhuma lógica funcional, formulário ou rota será alterada

### Resultado esperado

A página terá a tipografia autêntica do GTA San Andreas: títulos em Pricedown com contorno preto, destaques cursivos em Diplomata SC, interface em Chivo condensada. Botões com borda preta e brilho, cards estilo menu de pausa, e cores de status fiéis ao jogo.

