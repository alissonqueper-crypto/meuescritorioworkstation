

## Plano: Atualizar registros existentes + Proteger página de inscrição

### 3 objetivos:
1. **Atualizar todos os registros existentes** para `status_pagamento = 'aprovado'`
2. **Validar pagamento na página de inscrição** — antes de mostrar o formulário, verificar na InfinitePay se o `order_nsu` foi realmente pago
3. **Impedir cadastro duplicado** — se já existe inscrição com aquele `order_nsu`, mostrar mensagem ao invés do formulário

### Alterações por arquivo

**Banco de dados (UPDATE via insert tool)**
- `UPDATE inscricoes SET status_pagamento = 'aprovado' WHERE status_pagamento = 'pendente'`

**`supabase/functions/register-participant/index.ts`**
- Antes de inserir, verificar pagamento na API InfinitePay (`payment_check` com o `order_nsu`)
- Se `success: false`, rejeitar com erro "Pagamento não confirmado"
- Manter verificação de duplicata existente (já implementada)

**`src/pages/CorridaInscricao.tsx`**
- Ao carregar a página, chamar `register-participant` em modo de verificação OU verificar diretamente se já existe inscrição com aquele `order_nsu` no banco
- Se já existe inscrição → mostrar tela de "já cadastrado" com dados do ingresso
- Adicionar um estado de validação inicial (`verificando`) que checa o `order_nsu` antes de exibir o formulário

### Fluxo protegido

```text
[Página carrega com order_nsu]
       ↓
[Verifica se order_nsu já foi usado] → SIM → "Inscrição já realizada"
       ↓ NÃO
[register-participant verifica pagamento na InfinitePay]
       ↓ PAGO
[Salva inscrição como aprovado]
       ↓ NÃO PAGO
[Erro: "Pagamento não confirmado"]
```

### Resumo
| O que | Como |
|---|---|
| Aprovar todos pendentes | UPDATE direto no banco |
| Proteger URL contra acesso indevido | Edge function valida pagamento na InfinitePay antes de aceitar cadastro |
| Impedir cadastro duplicado | Verificação de `order_nsu` existente (já funciona) + check no frontend ao carregar página |

