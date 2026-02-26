

## Plano: Melhorar enquadramento e impacto da imagem hero

### Problema atual

A imagem GTA está muito escurecida pelos gradientes de overlay, fazendo o visual perder impacto. O `object-cover` corta partes importantes da arte. O conteúdo textual ocupa muito espaço vertical, empurrando a imagem para segundo plano.

### Alterações em `src/pages/CorridaDeBarEmBar.tsx`

**Linha 139** — Ajustar o `<img>` para melhor enquadramento:
- Adicionar `object-[center_top]` para posicionar o foco na parte superior da arte (personagem CJ)
- Manter `object-cover` para responsividade

**Linhas 140-141** — Reduzir a opacidade dos overlays para deixar a imagem mais visível:
- Overlay principal: reduzir de `0.8` para `0.5` no `via` e de `0.4` para `0.2` no `to`
- Overlay verde: reduzir de `0.15/0.1` para `0.08/0.05`

**Linha 143** — Ajustar o padding do conteúdo:
- Mudar `py-32` para `pt-40 pb-20` para empurrar o texto mais para baixo, revelando mais da arte no topo

### Resultado esperado

A imagem GTA ficará mais visível e impactante, com o personagem CJ bem enquadrado no topo, os overlays apenas suavizando a leitura sem esconder a arte, e o layout mais bem distribuído verticalmente.

