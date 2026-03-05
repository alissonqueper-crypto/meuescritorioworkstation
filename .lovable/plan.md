

## Problema identificado

A busca está retornando vazio porque o nome digitado não corresponde exatamente ao nome no banco. Exemplo:

- **Banco:** `Cassiane Cardozo dos Santos Nestor`
- **Digitado:** `Cassiane Cardoso dos santos Nestor`

O `ilike` busca o texto inteiro como substring, então "Cardoso" ≠ "Cardozo" faz a busca falhar.

## Solução

Alterar a busca em `src/pages/MeuIngresso.tsx` para ser mais flexível:

1. **Buscar apenas pelo telefone** como filtro primário (já que é único por pessoa)
2. **Usar o nome apenas como confirmação visual** — ou buscar apenas pela primeira palavra do nome (primeiro nome) combinado com telefone

Alternativa mais robusta: dividir o nome em palavras e buscar inscrições que contenham **qualquer uma** das palavras, depois filtrar no client-side pelo telefone.

### Alteração em `MeuIngresso.tsx`

Na função `handleSubmit`, mudar a estratégia:

- Pegar apenas a **primeira palavra** do nome digitado para o `ilike`
- Manter a verificação de telefone no client-side como já funciona
- Isso garante que pequenas variações no sobrenome não impeçam a busca

```typescript
const firstName = nome.trim().split(/\s+/)[0];

const { data, error } = await supabase
  .from("inscricoes")
  .select("id, nome, telefone, tipo_ingresso, valor_pago, status_pagamento, order_nsu, created_at, numero_placa")
  .ilike("nome", `%${firstName}%`);
```

Isso resolve o problema porque "Cassiane" vai encontrar "Cassiane Cardozo dos Santos Nestor" mesmo que o sobrenome tenha sido digitado diferente. O telefone continua sendo validado no client para garantir que é a pessoa certa.

