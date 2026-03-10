

## Plano: Flexibilizar a comparação de telefone na busca

### Problema
Os dois registros do Cassiano têm telefones ligeiramente diferentes no banco (`4988232778` vs `49988232778`). O filtro atual compara os dígitos exatamente, então só um dos registros é retornado.

### Solução
Em `src/pages/MeuIngresso.tsx`, na função `handleSubmit`, ao invés de comparar os dígitos exatos do telefone, comparar apenas os **últimos 8 dígitos** de ambos os números. Isso acomoda variações de DDD e dígito 9.

### Alteração

**`src/pages/MeuIngresso.tsx`** (linha 53):
```typescript
// De:
const matches = data?.filter((r) => digitsOnly(r.telefone) === inputDigits) ?? [];

// Para:
const last8 = (s: string) => digitsOnly(s).slice(-8);
const matches = data?.filter((r) => last8(r.telefone) === last8(telefone)) ?? [];
```

Isso garante que variações como `49`, `049`, presença/ausência do dígito `9` não impeçam o match.

