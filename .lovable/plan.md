

## Plano: Efeito Lamp no Hero com Logo Subindo

A ideia é adaptar o componente Lamp (Aceternity UI) ao hero da home. Em vez de um título subindo, a **logo** sobe com a animação de luz cônica, e as informações do hero (badges, subtítulo, CTAs) ficam distribuídas de forma minimalista ao redor.

---

### O que muda

**1. Instalar `framer-motion`**
- Nova dependência necessária para o efeito Lamp.

**2. Criar `src/components/ui/lamp.tsx`**
- Componente LampContainer adaptado com as **cores da marca** (vermelho, azul, teal) no gradiente cônico em vez das cores padrão cyan.
- O feixe de luz usa `--brand-red` e `--brand-blue` para manter identidade visual.
- Fundo escuro (`--background`) para o efeito funcionar bem.

**3. Redesenhar o Hero em `src/pages/Index.tsx`**
- Substituir o hero atual pelo LampContainer.
- A **logo** (`src/assets/logo.png`) é o elemento central que sobe com `motion.div` (translateY de 100px para 0, com spring).
- Remover a imagem `coworking-hero.jpg` do hero (o efeito de luz substitui).
- Layout minimalista:
  - Logo centralizada sobe com a animação.
  - Abaixo da logo: subtítulo curto em texto pequeno e elegante.
  - Badges "Coworking Premium" e "Caçador – SC" posicionados sutilmente.
  - CTAs centralizados abaixo, aparecendo com fade-in após a logo subir.

### Detalhes Técnicos

**Nova dependência:** `framer-motion`

**Novo arquivo:** `src/components/ui/lamp.tsx`

**Arquivo modificado:** `src/pages/Index.tsx` — hero redesenhado com LampContainer + logo animada

**Cores do efeito lamp:**
- Gradiente cônico: `--brand-red` (vermelho) e `--brand-blue` (azul)
- Linha horizontal de luz: `--brand-teal`
- Glow central: `--brand-gold`

O restante da página (benefícios, residentes, planos, etc.) permanece inalterado.

