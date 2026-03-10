-- Insert Josaphat Kocan
INSERT INTO inscricoes (nome, telefone, tipo_ingresso, valor_pago, numero_placa, status_pagamento)
VALUES ('Josaphat Kocan', '49999713674', 'masculino', 110, 1001, 'aprovado');

-- Link placa 1001
UPDATE numeros_participantes
SET inscricao_id = (SELECT id FROM inscricoes WHERE nome = 'Josaphat Kocan' AND telefone = '49999713674' LIMIT 1),
    atribuido_em = now()
WHERE numero = 1001;