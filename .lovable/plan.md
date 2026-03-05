

## Plano: Página "Meu Ingresso" com consulta por nome e telefone

### Resumo
Criar uma nova página `/meu-ingresso` onde o comprador consulta seu ingresso informando nome e telefone. A página exibe os dados do ingresso (tipo, valor, status do pagamento, data da compra, order_nsu).

### Alterações

**1. Nova página `src/pages/MeuIngresso.tsx`**
- Formulário com dois campos: nome completo e telefone
- Ao submeter, consulta a tabela `inscricoes` filtrando por `nome` e `telefone` (case-insensitive com `.ilike` para o nome)
- Se encontrar, exibe um card estilizado no tema GTA com:
  - Nome do participante
  - Tipo de ingresso (CJ Hardcore / Sweet Light)
  - Valor pago (formatado em reais)
  - Status do pagamento
  - Número do pedido (order_nsu)
  - Data da compra
- Se não encontrar, exibe mensagem de erro
- Botão para voltar à página do evento

**2. Rota em `src/App.tsx`**
- Adicionar rota `/meu-ingresso` apontando para o novo componente

**3. Link de acesso**
- Adicionar um botão/link "Ver meu ingresso" na página da corrida e na página de sucesso (`CorridaSuccess.tsx`)

### Sem alterações no banco
A tabela `inscricoes` já tem RLS com SELECT público. Não precisa de migração.

