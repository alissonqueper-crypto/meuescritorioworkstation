
-- Inserir Kassiely Santos (feminino)
INSERT INTO inscricoes (nome, telefone, tipo_ingresso, valor_pago, numero_placa, status_pagamento, indicacao)
VALUES ('Kassiely Santos', '49998170592', 'feminino', 55.00, 1003, 'aprovado', 'Meu Escritório – Workstation');

-- Inserir Vitor Dapper (masculino)
INSERT INTO inscricoes (nome, telefone, tipo_ingresso, valor_pago, numero_placa, status_pagamento, indicacao)
VALUES ('Vitor Dapper', '49998166574', 'masculino', 110.00, 1004, 'aprovado', 'Meu Escritório – Workstation');

-- Vincular placa 1003 à Kassiely
UPDATE numeros_participantes 
SET inscricao_id = (SELECT id FROM inscricoes WHERE nome = 'Kassiely Santos' AND tipo_ingresso = 'feminino' ORDER BY created_at DESC LIMIT 1),
    atribuido_em = now()
WHERE numero = 1003;

-- Vincular placa 1004 ao Vitor
UPDATE numeros_participantes 
SET inscricao_id = (SELECT id FROM inscricoes WHERE nome = 'Vitor Dapper' AND tipo_ingresso = 'masculino' ORDER BY created_at DESC LIMIT 1),
    atribuido_em = now()
WHERE numero = 1004;
