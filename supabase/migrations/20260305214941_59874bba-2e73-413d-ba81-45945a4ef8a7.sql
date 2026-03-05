
CREATE TABLE public.numeros_participantes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  numero integer UNIQUE NOT NULL,
  inscricao_id uuid REFERENCES public.inscricoes(id) ON DELETE SET NULL,
  atribuido_em timestamptz
);

ALTER TABLE public.numeros_participantes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read numeros" ON public.numeros_participantes
  FOR SELECT USING (true);

CREATE POLICY "Service can update numeros" ON public.numeros_participantes
  FOR UPDATE USING (true) WITH CHECK (true);

-- Gerar 1000 números aleatórios únicos (entre 1000-9999)
INSERT INTO public.numeros_participantes (numero)
SELECT n FROM (
  SELECT DISTINCT floor(random() * 9000 + 1000)::integer AS n
  FROM generate_series(1, 5000)
) sub
LIMIT 1000;

-- Atribuir números aos participantes já existentes
WITH disponiveis AS (
  SELECT id, numero, ROW_NUMBER() OVER (ORDER BY random()) AS rn
  FROM public.numeros_participantes WHERE inscricao_id IS NULL
),
inscritos AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at) AS rn
  FROM public.inscricoes
)
UPDATE public.numeros_participantes np
SET inscricao_id = i.id, atribuido_em = now()
FROM disponiveis d
JOIN inscritos i ON d.rn = i.rn
WHERE np.id = d.id;
