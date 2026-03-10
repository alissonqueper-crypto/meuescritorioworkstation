

## Plano: Exibir múltiplos ingressos na busca

### Problema
Atualmente o código usa `.find()` que retorna apenas o primeiro match. Cassiano tem dois registros e só um aparece.

### Alteração: `src/pages/MeuIngresso.tsx`

1. Trocar o state `ingresso` (single) por `ingressos` (array)
2. Usar `.filter()` em vez de `.find()` para pegar todos os matches por telefone
3. Renderizar um card para cada ingresso encontrado (loop com `.map()`)
4. Ajustar mensagem de erro e botão "Nova consulta" para o novo estado

