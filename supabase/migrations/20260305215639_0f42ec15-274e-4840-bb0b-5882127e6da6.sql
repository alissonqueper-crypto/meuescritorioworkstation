
-- Convert valor_pago from centavos (integer) to reais (numeric)
ALTER TABLE public.inscricoes 
  ALTER COLUMN valor_pago TYPE numeric(10,2) USING (valor_pago::numeric / 100);

-- Copy numbers from numeros_participantes to inscricoes.numero_placa
UPDATE inscricoes i
SET numero_placa = np.numero
FROM numeros_participantes np
WHERE np.inscricao_id = i.id AND np.numero IS NOT NULL;
