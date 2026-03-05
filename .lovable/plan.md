

## Plano: Copiar números para `numero_placa` e formatar valor

### Resumo
Atualizar a coluna `numero_placa` na tabela `inscricoes` com os números já atribuídos na tabela `numeros_participantes`, e converter `valor_pago` de centavos (integer) para reais (numeric) para exibir como dinheiro no Supabase.

### 1. Copiar números dos participantes para `numero_placa`
Executar um UPDATE para copiar o número de `numeros_participantes` para `inscricoes.numero_placa`:

```sql
UPDATE inscricoes i
SET numero_placa = np.numero
FROM numeros_participantes np
WHERE np.inscricao_id = i.id;
```

### 2. Atualizar Edge Function `create-checkout`
Além de atribuir o número na tabela `numeros_participantes`, também salvar o número em `inscricoes.numero_placa`.

### 3. Formatar `valor_pago` como dinheiro
O `valor_pago` está em centavos (integer). Para exibir como dinheiro no Supabase, duas opções:
- **Converter os valores para reais** (dividir por 100) e mudar o tipo da coluna. Isso exige atualizar todo o código que lê/escreve esse campo.
- **Manter em centavos** e apenas formatar no frontend (já é feito na página MeuIngresso).

A opção mais segura é converter os valores existentes para reais e atualizar a coluna para `numeric(10,2)`, ajustando o código frontend e a Edge Function.

### 4. Atualizar frontend
- `MeuIngresso.tsx`: usar `numero_placa` direto da query de `inscricoes` em vez de buscar em `numeros_participantes` separadamente. Ajustar formatação do valor se mudar para reais.

### Alterações de arquivo
- **Migração SQL**: alterar `valor_pago` de integer para numeric, dividir valores por 100
- **Edge Function**: salvar número em `numero_placa`, enviar valor em reais (não centavos)
- **MeuIngresso.tsx**: simplificar query, ajustar formato do valor
- **types.ts**: atualizar tipo de `valor_pago`
- **CorridaDeBarEmBar.tsx**: ajustar valores de tickets se necessário

