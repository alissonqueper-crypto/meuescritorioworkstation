

## Plano: Reorganizar Hero com Lamp — Layout conforme o print

Entendi as 3 anotações do print:

1. **"quero que o início comece aqui"** — O efeito lamp (feixes de luz) deve começar mais acima, perto do topo da página, não no meio da tela
2. **"a logo aqui no meio subindo"** — A logo deve ficar centralizada na área do efeito lamp, subindo com a animação
3. **"os botões no meio após a logo"** — Os CTAs (WhatsApp + Ver planos) ficam logo abaixo da logo, no centro
4. **"as informações adicionais do site minimalista nos cantos"** — Badges e subtítulo posicionados nos cantos inferiores da seção hero, de forma minimalista

---

### Alterações

#### 1. `src/components/ui/lamp.tsx` — Ajustar posicionamento vertical

- Reduzir `min-h-screen` para `min-h-[85vh]` para que o efeito não ocupe tanta altura
- Mover o ponto de origem dos feixes de luz para mais acima (ajustar `top-1/2` e `translate-y` dos elementos do gradiente cônico para ficarem mais próximos do topo)
- Ajustar o `translate-y` do container de children para que o conteúdo fique mais centralizado verticalmente

#### 2. `src/pages/Index.tsx` — Reorganizar layout do hero

**Centro (dentro do motion.div que sobe):**
- Logo (animação de subida)
- Botões CTA logo abaixo da logo

**Cantos inferiores (fora do motion.div, posicionados com absolute):**
- Badge "Coworking Premium" no canto inferior esquerdo
- Badge "Caçador – SC" no canto inferior direito
- Subtítulo "Tecnologia, contabilidade, marketing e IA..." posicionado discretamente embaixo, centralizado

---

### Detalhes Técnicos

**Arquivos modificados:**
- `src/components/ui/lamp.tsx` — ajuste de posição vertical dos feixes e do container
- `src/pages/Index.tsx` — reorganização do layout hero: logo + botões no centro, badges nos cantos

Sem novas dependências ou arquivos.

