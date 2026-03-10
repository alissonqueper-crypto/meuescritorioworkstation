

## Plano: Excluir ingresso feminino de Cassiano Rocha de Lara Picolotto

### Dados do registro a excluir
- **ID**: `5efedbd9-6c0d-42bb-8dbe-2a598001de01`
- **Nome**: Cassiano Rocha de Lara Picolotto
- **Tipo**: feminino
- **Placa**: 9636

### Execução
1. DELETE na tabela `inscricoes` pelo ID
2. UPDATE na tabela `numeros_participantes` para liberar a placa 9636 (setar inscricao_id = NULL)

### Arquivo
`supabase/migrations/` com timestamp único

