

## Plano: Ajustar título em 3 linhas com espaçamento compacto

### Alteração

**`src/pages/CorridaDeBarEmBar.tsx`** linha 151-153 — Mudar a quebra de linha e o espaçamento:

- Quebrar o título em 3 linhas: `CORRIDA` / `DE BAR` / `EM BAR`
- Trocar `leading-tight` por `leading-[0.85]` (linhas bem próximas)
- Trocar `tracking-wide` por `tracking-tight` (letras compactas)

```tsx
<h1 className="font-gta-price text-3xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 leading-[0.85] text-gta-gradient tracking-tight uppercase" style={{ textShadow: "3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000" }}>
  CORRIDA<br />DE BAR<br />EM BAR
</h1>
```

