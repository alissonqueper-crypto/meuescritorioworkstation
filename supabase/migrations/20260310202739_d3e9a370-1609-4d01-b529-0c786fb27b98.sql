
-- Liberar placa 9636
UPDATE numeros_participantes SET inscricao_id = NULL, atribuido_em = NULL WHERE inscricao_id = '5efedbd9-6c0d-42bb-8dbe-2a598001de01';

-- Excluir inscrição feminina do Cassiano
DELETE FROM inscricoes WHERE id = '5efedbd9-6c0d-42bb-8dbe-2a598001de01';
