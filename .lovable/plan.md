

## Problema: Labels e valores colados no Android

No screenshot, as linhas como "ParticipanteCamilla Heusser De Oliveira" e "IngressoSweet – Modo Light..." estão sem espaçamento entre label e valor. Isso acontece porque o `flex justify-between` não funciona bem quando o conteúdo é longo demais e não há `min-width` ou `shrink` controlado — o texto quebra e fica colado.

### Correção em `src/pages/MeuIngresso.tsx`

Mudar o layout das linhas do ticket de `flex justify-between` (horizontal) para um layout empilhado (vertical) nos itens com texto longo, e adicionar `shrink-0` no label + `text-right` no valor para os itens curtos:

**Linha 161-164** — Trocar de:
```tsx
<div className="flex justify-between border-b border-border/20 pb-2 last:border-0">
  <span className="text-muted-foreground">{row.label}</span>
  <span className="font-medium text-foreground">{row.value}</span>
</div>
```

Para:
```tsx
<div className="flex justify-between gap-4 border-b border-border/20 pb-2 last:border-0">
  <span className="text-muted-foreground shrink-0">{row.label}</span>
  <span className="font-medium text-foreground text-right">{row.value}</span>
</div>
```

As mudanças:
- `gap-4` garante espaçamento mínimo entre label e valor
- `shrink-0` no label impede que ele encolha
- `text-right` no valor mantém alinhamento limpo quando quebra linha

Mesma correção na linha 149-152 (Nº do Participante) — adicionar `gap-4` e `shrink-0`.

Também aplicar no header do ticket (linha 139) que mostra o título longo — reduzir o `text-2xl` para `text-lg md:text-2xl` para telas menores.

