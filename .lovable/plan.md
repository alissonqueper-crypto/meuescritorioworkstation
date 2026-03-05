

## Plano: Corrigir busca de ingressos

### Problema
1. Nomes no banco têm espaços extras no final (ex: `"Adrielly Gelinski "`), fazendo a busca exata falhar
2. Telefones estão em formatos variados no banco (`(49) 99186-9961` vs `49991291416`), então a comparação exata falha

### Solução

**Arquivo: `src/pages/MeuIngresso.tsx`**

1. Usar `%` wildcard no `.ilike` para nome: `.ilike("nome", `%${nome.trim()}%`)`
2. Para o telefone, extrair apenas os dígitos e buscar com um filtro que ignore formatação. Como o Supabase não tem uma função nativa de "strip non-digits" no PostgREST, a melhor abordagem é:
   - Extrair apenas os dígitos do telefone digitado pelo usuário
   - Buscar todos os registros que contenham o nome (com wildcard)
   - Filtrar pelo telefone no lado do cliente, comparando apenas dígitos

Alternativamente, buscar apenas pelo nome com wildcard e filtrar telefone no JS comparando dígitos.

### Alterações
- `MeuIngresso.tsx`: mudar a query para usar wildcard no nome, remover o filtro `.eq("telefone")`, e filtrar telefone no cliente comparando apenas dígitos

