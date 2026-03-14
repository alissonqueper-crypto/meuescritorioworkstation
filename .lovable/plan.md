

## Plano: Adicionar 2 novos corredores ao banco de dados

### Registros a inserir:
1. **Jessica Mioto** — Feminino (R$ 55) — Tel: 49999339171
2. **Dionatan Zini** — Masculino (R$ 110) — Tel: 49999997426

Ambos com:
- `indicacao = 'Meu Escritório – Workstation'`
- `status_pagamento = 'aprovado'`
- `numero_placa` será atribuído automaticamente (próximos disponíveis: 1005, 1006)

### Execução:
Usar a ferramenta de inserção SQL para adicionar os dois registros na tabela `inscricoes`. O sistema já atribuirá os números de placa automaticamente a partir dos números disponíveis na tabela `numeros_participantes`.

