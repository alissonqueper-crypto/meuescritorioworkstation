

## Plano: Redesign Visual Completo com Identidade da Logo

Analisei toda a base de código e a logo enviada. As cores da marca são: **vermelho (#E31E24)**, **azul (#3B6FB6)**, **verde/teal (#2DBDB1)** e **amarelo/dourado (#F2C12E)**. O site atual usa apenas ciano e laranja genéricos. Vou criar uma identidade visual única baseada na logo.

---

### 1. Nova Paleta de Cores (`src/index.css`)

Substituir as variáveis CSS atuais por cores extraídas da logo:
- **Primary:** Vermelho vibrante da logo (0 85% 50%)
- **Accent:** Azul da logo (215 55% 47%)
- **Teal:** Verde/teal da logo (174 70% 46%) — nova cor custom
- **Gold:** Amarelo da logo (43 88% 57%) — nova cor custom
- Manter fundo escuro mas ajustar para tons mais sofisticados

### 2. Logo no Header e Footer (`Header.tsx`, `Footer.tsx`)

- Copiar a imagem da logo para `src/assets/logo.png`
- Substituir o texto "Meu Escritório – WORKSTATION" pela imagem da logo (h-10 no header, h-14 no footer)
- Manter fallback de texto acessível via `alt`

### 3. Animações Originais (`src/index.css`)

Remover animações genéricas e criar novas:
- **`animate-logo-pulse`**: Pulsação sutil com glow nas cores da marca (vermelho → azul → teal)
- **`animate-gradient-shift`**: Background gradient que muda entre as 4 cores da logo em loop
- **`animate-slide-in-left` / `animate-slide-in-right`**: Entradas laterais alternadas para cards
- **`animate-typewriter`**: Efeito de digitação para títulos do hero
- **`animate-border-glow`**: Borda animada que percorre as 4 cores da marca
- **`animate-parallax-float`**: Movimento parallax suave em camadas
- **`animate-stagger`**: Delays escalonados para grids (cada card entra com delay progressivo)
- Hover em cards: `hover:translate-y-[-4px] hover:shadow-[0_8px_30px_rgba(227,30,36,0.15)]` com transição suave

### 4. Hero da Página Inicial (`Index.tsx`)

- Adicionar gradient animado no fundo (shift entre as 4 cores da logo)
- Título com efeito de texto gradiente usando as cores da marca
- Badges de destaque com border-glow animado
- CTA buttons: Primary em vermelho, Secondary em azul da logo

### 5. Cards e Componentes Globais

- Border-radius mais arredondado nos cards
- Hover com glow sutil na cor primária
- Ícones usando as 4 cores da logo alternadamente nos grids (vermelho, azul, teal, dourado)
- Separadores com gradient horizontal nas cores da marca

### 6. Página do Evento (`CorridaDeBarEmBar.tsx`)

- Manter a estética neon/GTA separada (já tem identidade própria)
- Apenas atualizar os neon colors para harmonizar com a nova paleta

### 7. Preparação para Fotos e Vídeos

- Criar componente `MediaGallery` reutilizável em `src/components/MediaGallery.tsx`
- Grid responsivo com lightbox (Dialog) para fotos em tela cheia
- Suporte a vídeos embed (YouTube/iframe)
- Seção na página Estrutura com placeholder "Adicione suas fotos aqui"
- Seção na Index com galeria de destaque

### 8. Tailwind Config (`tailwind.config.ts`)

- Adicionar cores `brand-red`, `brand-blue`, `brand-teal`, `brand-gold`
- Registrar novas keyframes e animations
- Adicionar font display alternativa

---

### Detalhes Técnicos

**Arquivos modificados:**
- `src/index.css` — nova paleta + animações customizadas
- `tailwind.config.ts` — cores da marca + keyframes
- `src/components/Header.tsx` — logo image + animação sutil
- `src/components/Footer.tsx` — logo image
- `src/pages/Index.tsx` — hero redesign + gradient animado + galeria preview
- `src/pages/Estrutura.tsx` — preparação para galeria de fotos
- `src/pages/Planos.tsx` — cards com cores da marca
- `src/pages/Contato.tsx` — accent colors atualizados

**Novo arquivo:**
- `src/components/MediaGallery.tsx` — componente de galeria reutilizável

**Asset copiado:**
- `user-uploads://Design_sem_nome_10-2.png` → `src/assets/logo.png`

As animações são todas CSS puro (keyframes), sem bibliotecas externas. Cada animação é única e pensada para o contexto do coworking — nada genérico de template.

