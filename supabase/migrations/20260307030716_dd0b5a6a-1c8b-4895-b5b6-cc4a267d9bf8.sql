
DO $$
DECLARE
  katila_id uuid;
  denis_id uuid;
BEGIN
  -- Insert Kátila
  INSERT INTO inscricoes (nome, telefone, tipo_ingresso, status_pagamento, valor_pago, numero_placa)
  VALUES ('Kátila Thaiana Stefanes', '48984847915', 'feminino', 'aprovado', 55.00, 0)
  RETURNING id INTO katila_id;

  -- Insert Denis
  INSERT INTO inscricoes (nome, telefone, tipo_ingresso, status_pagamento, valor_pago, numero_placa)
  VALUES ('Denis Eduardo Morona', '47988373308', 'masculino', 'aprovado', 110.00, 0)
  RETURNING id INTO denis_id;

  -- Assign number 3936 to Kátila
  UPDATE numeros_participantes SET inscricao_id = katila_id, atribuido_em = now() WHERE numero = 3936 AND inscricao_id IS NULL;
  UPDATE inscricoes SET numero_placa = 3936 WHERE id = katila_id;

  -- Assign number 2574 to Denis
  UPDATE numeros_participantes SET inscricao_id = denis_id, atribuido_em = now() WHERE numero = 2574 AND inscricao_id IS NULL;
  UPDATE inscricoes SET numero_placa = 2574 WHERE id = denis_id;
END $$;
