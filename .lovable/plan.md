

## Plano: Substituir Pricedown por Black Ops One + aplicar text-stroke + refinar glow e cards

### Resumo

Trocar a fonte Pricedown (CDN externo instável) pela **Black Ops One** do Google Fonts para os títulos GTA. Aplicar `-webkit-text-stroke` para o efeito de contorno autêntico. Aumentar o contraste do glow dourado nos títulos e deixar os cards com bordas mais anguladas/urban.

### Alterações

#### 1. `index.html` — Trocar Pricedown por Black Ops One

- Adicionar `Black+Ops+One` ao `<link>` do Google Fonts existente (linha 14)
- **Remover** o `<link>` do CDN Pricedown (linhas 15-16) — elimina dependência de CDN externo instável

#### 2. `tailwind.config.ts` — Atualizar font-family

- Alterar `"gta-title"` de `["Pricedown", "Bungee", ...]` para `["Black Ops One", "Bungee", "Impact", "sans-serif"]`

#### 3. `src/pages/CorridaDeBarEmBar.tsx` — Aplicar text-stroke + glow dourado + cards angulados

**Títulos (todas as ocorrências de `style={{ textShadow: ... }}`):**
- Substituir o `textShadow` simples por um combo de `-webkit-text-stroke` + glow dourado mais intenso:
```
style={{
  WebkitTextStroke: "3px #000000",
  textShadow: "0 0 20px hsl(37 82% 30% / 0.6), 0 0 40px hsl(37 82% 30% / 0.3), 3px 3px 0 #000"
}}
```
- Isso aplica o contorno preto de 3px (estilo logo GTA) + glow dourado com mais contraste

**Cards (gta-mission-card e bg-gta-card):**
- Trocar `rounded-xl` / `rounded-2xl` por `rounded-sm` nos cards para bordas mais anguladas/pixel/urban
- Adicionar `border border-gta-green/30` onde faltar

#### 4. `src/index.css` — Refinar utilitários

- Atualizar `.gta-mission-card` para `border-radius: 4px` (mais angulado)
- Atualizar `.bg-gta-card` com `border-radius: 4px`
- Adicionar variante `.text-gta-gradient` com glow dourado mais intenso via `filter: drop-shadow`

### Detalhes técnicos

- Black Ops One é uma fonte Google Fonts oficial — carregamento confiável com `display=swap`
- `-webkit-text-stroke` tem suporte em todos os navegadores modernos (Chrome, Firefox 4+, Safari, Edge)
- Remover a dependência do CDN onlinewebfonts.com melhora a performance e confiabilidade
- Nenhuma lógica funcional será alterada

### Resultado esperado

Títulos com a fonte Black Ops One (estética militar/gótica similar ao GTA), contorno preto de 3px via text-stroke, glow dourado intenso, e cards com bordas anguladas estilo urban/pixel art.

