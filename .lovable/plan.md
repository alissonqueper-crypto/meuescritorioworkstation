

## Problema: InfinitePay retorna `success: false` para todos

A edge function `check-payments` verifica pagamentos corretamente, mas a API da InfinitePay retorna que nenhum pagamento foi feito. Precisamos entender o que a API está retornando para diagnosticar.

### Diagnóstico necessario

O código atual verifica `data.success === true` mas não loga a resposta da API. Pode ser que:
1. A resposta use outro campo (ex: `data.paid`, `data.status === "paid"`)
2. Os compradores realmente não finalizaram o pagamento no checkout

### Plano

1. **Adicionar logging detalhado** na edge function `check-payments` para logar a resposta completa da API InfinitePay (`console.log("InfinitePay response:", JSON.stringify(data))`)
2. **Re-executar** para um `order_nsu` específico e verificar nos logs o que exatamente a API retorna
3. **Ajustar a condição** de sucesso se o campo de resposta for diferente de `success`

### Alteração em `supabase/functions/check-payments/index.ts`

Adicionar `console.log` após `const data = await res.json()`:
```typescript
const data = await res.json();
console.log(`InfinitePay response for ${inscricao.order_nsu}:`, JSON.stringify(data));
```

Isso vai nos mostrar exatamente o que a InfinitePay retorna e permitir corrigir a condição.

| Arquivo | O que muda |
|---|---|
| `supabase/functions/check-payments/index.ts` | Adicionar log da resposta da InfinitePay para diagnóstico |

Após ver os logs, ajustaremos a condição de verificação de pagamento se necessário.

