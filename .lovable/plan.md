

## Plano: Corrigir modal de inscrição e remover campo "número da placa"

### Problema
O `DialogContent` usa a classe `gta-mission-card` que aplica `overflow: hidden` e `position: relative`, quebrando o posicionamento fixo do Dialog do Radix. O conteúdo do modal fica invisível/cortado.

### Alterações em `src/pages/CorridaDeBarEmBar.tsx`

1. **Remover `gta-mission-card` do DialogContent** — substituir por classes Tailwind equivalentes que não conflitem com o Dialog:
   - `bg-black/80 backdrop-blur border border-gta-green/30`

2. **Remover o campo "Número desejado da placa"**:
   - Remover o bloco do input `numero_placa` do formulário (linhas 388-391)
   - Remover `numero_placa` do estado `form` (inicializar sem ele)
   - Remover a validação de `placa` no `handleSubmit` (linhas 102-106)
   - Ajustar o body do `supabase.functions.invoke` para não enviar `numero_placa`

