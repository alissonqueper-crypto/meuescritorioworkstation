

## Plano: Inverter fluxo — Pagamento primeiro, inscrição depois

### Novo fluxo
1. Usuário clica no botão do ingresso → edge function gera link de checkout (sem pedir dados) → redireciona para InfinitePay
2. Após pagamento, InfinitePay redireciona para página de inscrição com `order_nsu` na URL
3. Usuário preenche nome, telefone, indicação na página de inscrição
4. Dados salvos no banco com `status_pagamento: "aprovado"`

### Alterações por arquivo

**`supabase/functions/create-checkout/index.ts`**
- Receber apenas `tipo_ingresso` (sem nome, telefone, indicacao)
- Não criar registro no banco — apenas gerar o `order_nsu` e o link de checkout
- Redirect URL aponta para nova página de inscrição: `/eventos/corrida-de-bar-em-bar/inscricao?order_nsu=XXX&tipo=masculino`

**`src/pages/CorridaDeBarEmBar.tsx`**
- Remover o modal/dialog de formulário
- Botão de compra chama `create-checkout` diretamente com apenas `tipo_ingresso`
- Redireciona para o checkout_url retornado

**Nova página: `src/pages/CorridaInscricao.tsx`**
- Lê `order_nsu` e `tipo` dos query params
- Formulário: nome, telefone, indicação
- Ao submeter: insere no banco `inscricoes` com `status_pagamento: "aprovado"`, atribui número do participante
- Exibe confirmação com dados do ingresso

**Nova edge function: `supabase/functions/register-participant/index.ts`**
- Recebe `order_nsu`, `tipo_ingresso`, `nome`, `telefone`, `indicacao`
- Verifica se já existe registro com esse `order_nsu` (evitar duplicata)
- Insere na tabela `inscricoes` com status `aprovado`
- Atribui número do participante da tabela `numeros_participantes`
- Retorna dados da inscrição

**`src/App.tsx`**
- Adicionar rota `/eventos/corrida-de-bar-em-bar/inscricao` → `CorridaInscricao`

**`src/pages/CorridaSuccess.tsx`**
- Simplificar ou redirecionar para a nova página de inscrição (pode ser removida se não for mais necessária)

### Resumo do fluxo

```text
[Ticket Button] → create-checkout(tipo_ingresso)
       ↓
[InfinitePay Checkout] → paga
       ↓
[Redirect: /inscricao?order_nsu=X&tipo=Y]
       ↓
[Form: nome, telefone, indicação] → register-participant()
       ↓
[Confirmação com dados do ingresso]
```

