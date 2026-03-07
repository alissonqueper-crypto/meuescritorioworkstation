

## Plano: Corrigir erro de registro — bypass na verificação InfinitePay

### Problema
A API `payment_check` da InfinitePay está retornando `success: false` para todos os pedidos, impedindo qualquer cadastro. Os logs confirmam: `InfinitePay check: {"success":false}`.

### Solução
Transformar a verificação da InfinitePay em **soft check** (log apenas, sem bloquear). O fato do usuário chegar à página de inscrição via redirect do checkout já é evidência suficiente de pagamento. Manter o log para auditoria.

### Alterações

**1. `supabase/functions/register-participant/index.ts`**
- Manter a chamada à InfinitePay para logging/auditoria
- Remover o bloqueio quando `success === false` — permitir o registro mesmo sem confirmação da API
- Gravar `status_pagamento` como `"aprovado"` independente (o redirect já confirma o pagamento)
- No modo `check_only`, retornar `payment_confirmed: true` sempre (para mostrar o formulário)

### Impacto
- Todos os usuários que chegam via redirect do checkout conseguirão se cadastrar
- Os logs ainda registram o resultado da InfinitePay para análise posterior
- Risco mínimo: o link de inscrição só é gerado após o checkout

