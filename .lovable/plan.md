

## Plano: Sistema de numeração aleatória para participantes

### Resumo
Criar uma tabela `numeros_participantes` com 1000 números aleatórios únicos (não sequenciais). Cada número é atribuído a um participante no momento da compra. Os participantes que já compraram receberão números via uma migração inicial.

### 1. Migração SQL

Criar tabela `numeros_participantes` e popular com 1000 números aleatórios únicos (entre 1000 e 9999, por exemplo, para parecerem "placas"):

```sql
CREATE TABLE public.numeros_participantes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  numero integer UNIQUE NOT NULL,
  inscricao_id uuid REFERENCES public.inscricoes(id) ON DELETE SET NULL,
  atribuido_em timestamptz
);

ALTER TABLE public.numeros_participantes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read numeros" ON public.numeros_participantes
  FOR SELECT USING (true);

-- Gerar 1000 números aleatórios únicos (entre 1000-9999)
INSERT INTO public.numeros_participantes (numero)
SELECT n FROM (
  SELECT DISTINCT floor(random() * 9000 + 1000)::integer AS n
  FROM generate_series(1, 5000)
) sub
LIMIT 1000;

-- Atribuir números aos participantes já existentes
WITH disponíveis AS (
  SELECT id, numero, ROW_NUMBER() OVER (ORDER BY random()) AS rn
  FROM public.numeros_participantes WHERE inscricao_id IS NULL
),
inscritos AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at) AS rn
  FROM public.inscricoes
)
UPDATE public.numeros_participantes np
SET inscricao_id = i.id, atribuido_em = now()
FROM disponíveis d
JOIN inscritos i ON d.rn = i.rn
WHERE np.id = d.id;
```

### 2. Atualizar Edge Function `create-checkout`

Após inserir a inscrição, atribuir automaticamente um número disponível:

- Buscar um número com `inscricao_id IS NULL`, ordenado por `random()`, limit 1
- Fazer UPDATE setando `inscricao_id` e `atribuido_em`

### 3. Atualizar página "Meu Ingresso"

- Na query de consulta, fazer um join ou query separada em `numeros_participantes` para buscar o número atribuído
- Exibir o número no card do ingresso como "Número do participante"

### 4. Atualizar types.ts

Será atualizado automaticamente após a migração para incluir a nova tabela.

