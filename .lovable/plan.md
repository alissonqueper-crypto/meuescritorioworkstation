

## Diagnóstico do Problema

O erro está claro nos logs. A API da InfinitePay retorna o campo **`url`**, mas o código verifica **`checkout_url`**:

```
Response: {"url":"https://checkout.infinitepay.io/meu-escritorio?lenc=..."}
```

Na linha 87, o código faz `!infinitePayData.checkout_url` — que é `undefined` — e retorna erro 502.

## Plano de Correção

### 1. Edge Function `create-checkout/index.ts`

- **Linha 87**: Trocar `infinitePayData.checkout_url` por `infinitePayData.url`
- **Linha 96**: Trocar `infinitePayData.checkout_url` por `infinitePayData.url`
- Retornar `{ checkout_url: infinitePayData.url }` para manter compatibilidade com o frontend

### 2. Frontend `CorridaDeBarEmBar.tsx`

Nenhuma alteração necessária — o frontend já espera `data.checkout_url` e faz `window.location.href = data.checkout_url`, o que está correto.

### 3. Página de Sucesso `CorridaSuccess.tsx`

Verificar se já atualiza o `status_pagamento` para "aprovado" quando o usuário retorna com `order_nsu` na URL. Isso já está implementado.

---

### Detalhes Técnicos

A correção é mínima — apenas 2 linhas na edge function. O campo retornado pela API InfinitePay é `url`, não `checkout_url`. Após a correção, o fluxo será:

1. Usuário preenche formulário → chama edge function
2. Edge function salva inscrição → chama InfinitePay → recebe `url`
3. Frontend recebe `checkout_url` (mapeado de `url`) → redireciona para página externa de pagamento
4. Após pagamento, InfinitePay redireciona para página de sucesso → atualiza status no banco

