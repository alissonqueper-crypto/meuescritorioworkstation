INSERT INTO inscricoes (nome, telefone, tipo_ingresso, valor_pago, numero_placa, indicacao, status_pagamento, forma_pagamento)
VALUES 
  ('Jessica Mioto', '49999339171', 'feminino', 55.00, 1005, 'Meu Escritório – Workstation', 'aprovado', 'manual'),
  ('Dionatan Zini', '49999997426', 'masculino', 110.00, 1006, 'Meu Escritório – Workstation', 'aprovado', 'manual');

UPDATE numeros_participantes SET inscricao_id = (SELECT id FROM inscricoes WHERE nome = 'Jessica Mioto' AND telefone = '49999339171' LIMIT 1), atribuido_em = now() WHERE numero = 1005;
UPDATE numeros_participantes SET inscricao_id = (SELECT id FROM inscricoes WHERE nome = 'Dionatan Zini' AND telefone = '49999997426' LIMIT 1), atribuido_em = now() WHERE numero = 1006;