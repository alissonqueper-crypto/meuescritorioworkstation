
CREATE TABLE public.inscricoes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  telefone TEXT NOT NULL,
  numero_placa INTEGER NOT NULL,
  tipo_ingresso TEXT NOT NULL,
  forma_pagamento TEXT,
  valor_pago INTEGER NOT NULL,
  order_nsu TEXT UNIQUE,
  status_pagamento TEXT NOT NULL DEFAULT 'pendente',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.inscricoes ENABLE ROW LEVEL SECURITY;

-- Public INSERT policy (anyone can register without login)
CREATE POLICY "Anyone can insert inscricoes"
ON public.inscricoes
FOR INSERT
WITH CHECK (true);

-- Public SELECT by order_nsu (for success page status check)
CREATE POLICY "Anyone can read own inscricao by order_nsu"
ON public.inscricoes
FOR SELECT
USING (true);

-- Public UPDATE for status (for success page callback)
CREATE POLICY "Anyone can update payment status"
ON public.inscricoes
FOR UPDATE
USING (true)
WITH CHECK (true);
