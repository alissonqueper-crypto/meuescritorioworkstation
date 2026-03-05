

## Plano: Criar Edge Function para verificar pagamentos na InfinitePay

### Problema
Inscrições ficam como "pendente" eternamente quando a pessoa não completa o pagamento ou quando completa mas o redirect falha. Atualmente o status só muda no client-side (`CorridaSuccess.tsx`), o que é inseguro.

### Solução

Criar uma edge function `check-payments` que consulta a API pública da InfinitePay para cada inscrição pendente e atualiza o status no banco.

### Endpoint da InfinitePay

```text
POST https://api.infinitepay.io/invoices/public/checkout/payment_check
Body: { "handle": "meu-escritorio", "order_nsu": "CORRIDA_xxx" }
```

Retorna `{ "success": true/false }` — endpoint público, sem necessidade de API key.

### Alterações

**1. Criar `supabase/functions/check-payments/index.ts`**
- Busca todas as inscrições com `status_pagamento = 'pendente'` e `order_nsu IS NOT NULL`
- Para cada uma, chama `payment_check` na InfinitePay
- Se `success: true` → atualiza para `"aprovado"`
- Se `success: false` e criado há mais de 48h → atualiza para `"expirado"`
- Retorna resumo: `{ aprovados: N, expirados: N, ainda_pendentes: N }`

**2. Atualizar `supabase/config.toml`**
- Registrar `[functions.check-payments]` com `verify_jwt = false`

**3. Corrigir `src/pages/CorridaSuccess.tsx`**
- Em vez de atualizar status diretamente no client, chamar a edge function `check-payments` passando o `order_nsu` específico para verificar aquele pagamento via InfinitePay antes de marcar como aprovado

### Fluxo

```text
check-payments (Edge Function)
  │
  ├─ Se recebe order_nsu → verifica só aquele pedido
  ├─ Se não recebe → verifica todos os pendentes (batch)
  │
  ├─ POST infinitepay/payment_check { handle, order_nsu }
  │   ├─ success: true  → UPDATE status = 'aprovado'
  │   └─ success: false + >48h → UPDATE status = 'expirado'
  │
  └─ Retorna resumo
```

### Uso
- Automaticamente chamada na página de sucesso (substitui update direto)
- Pode ser chamada manualmente para reconciliar todos os pendentes
- Futuramente pode ser agendada com pg_cron

