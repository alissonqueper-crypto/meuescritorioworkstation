

## Plano: Atualizar indicações nulas e exibir no ingresso

### 1. Atualizar dados no banco
Usar o insert tool para setar `indicacao = 'Meu Escritório – Workstation'` em todos os registros onde `indicacao IS NULL` (18 registros identificados).

### 2. Exibir indicação no card do ingresso
Em `src/pages/MeuIngresso.tsx`:
- Adicionar `indicacao` na interface `Inscricao` e na query do Supabase
- Adicionar uma linha "Indicação" no corpo do card, exibindo o valor quando existir

