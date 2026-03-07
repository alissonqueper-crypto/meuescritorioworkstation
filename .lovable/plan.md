

## Plano: Inserir 2 participantes manualmente

Como os clientes tiveram problemas no cadastro após o pagamento, vou inserir diretamente no banco via migração SQL:

### Participante 1 (da mensagem anterior)
- **Nome**: Kátila Thaiana Stefanes
- **Telefone**: 48984847915
- **Ingresso**: feminino (R$ 55)
- **Status**: aprovado

### Participante 2
- **Nome**: Denis Eduardo Morona
- **Telefone**: 47988373308
- **Ingresso**: masculino (R$ 110)
- **Status**: aprovado

### Execução
Uma migração SQL que:
1. Insere os 2 registros na tabela `inscricoes` com `status_pagamento = 'aprovado'` e `numero_placa = 0`
2. Atribui números de participante disponíveis da tabela `numeros_participantes` (3936 e 2574 estão livres)
3. Atualiza `numero_placa` nas inscrições com os números atribuídos

