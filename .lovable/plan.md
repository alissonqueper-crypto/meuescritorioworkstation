

## Plano: Animações mais suaves e lentas na página inicial

### O que será feito

Tornar todas as animações da página inicial mais lentas e suaves para criar uma experiência de "revelação" que surpreenda o visitante.

### Alterações

**1. `src/components/ui/lamp.tsx`** — Efeito de luz do hero
- Aumentar `duration` dos feixes de luz de `0.8s` para `1.8s`
- Aumentar `delay` de `0.3s` para `0.5s`

**2. `src/pages/Index.tsx`** — Animação da logo e botão no hero
- Aumentar `duration` do motion.div de `0.8s` para `1.6s`
- Aumentar `delay` de `0.3s` para `0.6s`

**3. `src/index.css`** — Animações globais de scroll e stagger
- Scroll reveal: aumentar transição de `0.7s` para `1.2s` e usar `ease-in-out`
- Stagger delays: aumentar intervalos (de 0.05-0.3s para 0.1-0.6s)
- `reveal-up` e `reveal-scale`: aumentar duração de `0.7s`/`0.5s` para `1.2s`/`0.8s`
- Slide-in animations: de `0.7s` para `1.2s`

### Resultado esperado
Animações fluidas e cinematográficas — o hero se revela gradualmente e as seções aparecem com calma ao rolar, dando uma sensação premium ao site.

