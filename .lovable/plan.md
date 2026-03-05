

## Plano: Ajustar card do ingresso

Duas alterações no arquivo `src/pages/MeuIngresso.tsx`:

1. **Remover linha "Pedido"** — remover `{ label: "Pedido", value: ingresso.order_nsu || "—" }` do array
2. **Remover horário da data** — alterar `formatDate` para usar apenas `day`, `month`, `year` (sem `hour`/`minute`)
3. **Adicionar info do tipo de ingresso** — na linha "Ingresso", detalhar:
   - Masculino: `"CJ – Modo Hardcore (2,2L)"`
   - Feminino: `"Sweet – Modo Light (1,1L)"`

   Isso já está parcialmente feito. Vou garantir que a descrição esteja completa com o nome temático e o volume.

### Arquivo: `src/pages/MeuIngresso.tsx`
- Linha ~67: remover `hour` e `minute` do `formatDate`
- Linha ~155: manter/ajustar descrição do ingresso com nome temático + volume
- Linha ~157: remover a linha do "Pedido"

