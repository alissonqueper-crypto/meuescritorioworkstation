

## Plano: Adicionar 2 ingressos com indicação "Meu Escritório – Workstation"

### Registros:
1. **Kassiely Santos** — Feminino (R$ 55) — Tel: 49998170592
2. **Vitor Dapper** — Masculino (R$ 110) — Tel: 49998166574

Ambos com `indicacao = 'Meu Escritório – Workstation'`, `status_pagamento = 'aprovado'`.

### Execução
Migration SQL que:
1. Insere os dois registros na tabela `inscricoes` com `numero_placa = 0`
2. A trigger `atribuir_numero_participante` já existente atribuirá os números automaticamente

