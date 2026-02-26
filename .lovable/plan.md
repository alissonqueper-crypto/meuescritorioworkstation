

## Plano: Aplicar fonte Pricedown no título "CORRIDA DE BAR EM BAR"

### Alterações

1. **Copiar fonte** para `public/fonts/Pricedown_Bl.otf`

2. **`src/index.css`** — Adicionar `@font-face` no topo:
```css
@font-face {
  font-family: 'Pricedown';
  src: url('/fonts/Pricedown_Bl.otf') format('opentype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
```

3. **`tailwind.config.ts`** — Adicionar em `fontFamily`:
```ts
"gta-price": ["Pricedown", "Bungee", "Impact", "sans-serif"],
```

4. **`src/pages/CorridaDeBarEmBar.tsx`** linha 151 — Trocar `font-gta-title` por `font-gta-price`:
```tsx
<h1 className="font-gta-price text-3xl sm:text-5xl ..."
```

