
-- Insert Gilson Rogério Varotto manually
INSERT INTO inscricoes (nome, telefone, tipo_ingresso, valor_pago, numero_placa, status_pagamento, indicacao)
VALUES ('Gilson Rogério Varotto', '49999118801', 'masculino', 110, 5761, 'aprovado', null);

-- Link numero 5761 to his inscription
UPDATE numeros_participantes
SET inscricao_id = (SELECT id FROM inscricoes WHERE nome = 'Gilson Rogério Varotto' AND telefone = '49999118801' LIMIT 1),
    atribuido_em = now()
WHERE numero = 5761;
