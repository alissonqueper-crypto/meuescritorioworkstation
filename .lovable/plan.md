

## Plano: Corrigir hero mobile da página inicial — logo maior e layout coeso

### Problema identificado

Na screenshot mobile (390px), o hero tem problemas claros:
1. Muito espaço vazio entre o efeito lamp (vermelho/azul) e a logo
2. Logo pequena demais (w-56 = 224px), pouco impactante
3. Badges (Coworking Premium, Caçador-SC) e texto central ficam sobrepostos na mesma linha inferior
4. O hero ocupa ~70vh mas o conteúdo útil está concentrado na metade inferior

### Alterações

#### 1. `src/components/ui/lamp.tsx`

- Reduzir altura mobile de `min-h-[70vh]` para `min-h-[60vh] md:min-h-[85vh]`
- Ajustar translate do conteúdo de `-translate-y-10` para `-translate-y-4 md:-translate-y-20` para subir menos e ficar mais próximo do efeito lamp

#### 2. `src/pages/Index.tsx` — Hero badges e logo

**Logo (linha 104):**
- Aumentar de `w-56 md:w-96` para `w-64 md:w-96` para dar mais destaque no mobile

**Badges (linhas 112-127):**
- Remover os 3 blocos absolutos separados (left, right, center) que se sobrepõem no mobile
- Substituir por um único container absoluto centralizado:
  - `absolute bottom-3 md:bottom-8 left-0 right-0 z-50 flex flex-col items-center gap-1 px-4`
  - Primeira linha: dois badges lado a lado com `flex gap-2 flex-wrap justify-center`
  - Segunda linha: texto "Tecnologia · Contabilidade · Marketing · IA"
- Isso elimina toda sobreposição no mobile

### Detalhes técnicos

- O efeito lamp (conic gradients) continua idêntico, apenas o container fica menor
- Os badges passam de posicionamento absoluto individual para um flex column centralizado
- Logo ganha ~32px a mais no mobile (de 224px para 256px)
- Desktop permanece inalterado com `md:` breakpoints

### Resultado esperado

Hero mobile compacto com logo em destaque, badges organizados sem sobreposição, e menos espaço vazio entre o efeito lamp e o conteúdo.

