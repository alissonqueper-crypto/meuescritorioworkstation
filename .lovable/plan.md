

## Plano: Exibir status do pagamento no card do ingresso

**Arquivo: `src/pages/MeuIngresso.tsx`**

Adicionar uma linha "Status" no card do ingresso que mostra o status do pagamento com cores diferenciadas:

- **aprovado** → verde, texto "Aprovado ✅"
- **pendente** → amarelo, texto "Pendente ⏳"
- **expirado** → cinza, texto "Expirado"
- **outros** → cinza padrão

A função `statusColor` já existe no componente mas não está sendo usada. Vou adicionar a linha de status ao array de informações do ticket, usando um elemento estilizado com a cor correspondente ao invés de texto simples.

### Alteração

No array de rows (linha ~152), adicionar após "Data da compra":

```typescript
{ label: "Status", value: ingresso.status_pagamento }
```

E renderizar essa linha com a cor via `statusColor()` já existente, com um badge ou texto colorido para destaque visual.

