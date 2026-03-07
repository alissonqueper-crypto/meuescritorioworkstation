

## Plano: Inserir participante Gilson manualmente + investigar erro

### Dados do participante (da screenshot)
- **Nome**: Gilson Rogério Varotto
- **Telefone**: 49999118801
- **Ingresso**: masculino / CJ Hardcore (R$ 110)
- **Status**: aprovado
- **Número disponível**: 5761

### Execução
Uma migração SQL para inserir o registro na tabela `inscricoes` e atribuir o número 5761 da tabela `numeros_participantes`.

### Investigação
Os logs da edge function não mostram nenhuma tentativa de registro do Gilson, o que sugere que o erro pode estar no frontend (a requisição nem chega à edge function). Após inserir o participante, vou investigar o código do frontend para entender por que o submit está falhando silenciosamente.

