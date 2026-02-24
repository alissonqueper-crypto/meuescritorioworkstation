

## Plano: Integração InfinitePay + Tabela de Inscrições

### Resumo

Vou configurar a integração real com a InfinitePay usando o handle `meu-escritorio`, atualizar os ingressos para **Masculino (R$ 110,00)** e **Feminino (R$ 55,00)**, criar uma edge function segura para gerar os links de checkout, e criar uma tabela no Supabase para armazenar as inscrições dos participantes. Antes da compra, o usuário preencherá um formulário com seus dados.

---

### 1. Tabela no Supabase: `inscricoes`

Criar uma migration com a seguinte estrutura:

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | uuid (PK, default gen_random_uuid()) | ID único |
| `nome` | text NOT NULL | Nome completo |
| `telefone` | text NOT NULL | Telefone/WhatsApp |
| `numero_placa` | integer NOT NULL | Numero desejado da placa da corrida |
| `tipo_ingresso` | text NOT NULL | "masculino" ou "feminino" |
| `forma_pagamento` | text | Forma de pagamento (pix, cartao, etc.) |
| `valor_pago` | integer NOT NULL | Valor em centavos |
| `order_nsu` | text UNIQUE | ID do pedido InfinitePay |
| `status_pagamento` | text DEFAULT 'pendente' | pendente, aprovado, cancelado |
| `created_at` | timestamptz DEFAULT now() | Data de criação |

RLS habilitado com policy pública de INSERT (qualquer pessoa pode se inscrever, sem necessidade de login).

---

### 2. Edge Function: `create-checkout`

Nova edge function em `supabase/functions/create-checkout/index.ts` que:

- Recebe via POST: `nome`, `telefone`, `numero_placa`, `tipo_ingresso`
- Calcula o preço: masculino = 11000 centavos, feminino = 5500 centavos
- Gera `order_nsu` único (`CORRIDA_{timestamp}`)
- Salva o registro na tabela `inscricoes` com status "pendente"
- Chama a API InfinitePay (`POST https://api.infinitepay.io/invoices/public/checkout/links`) com:
  - `handle`: `meu-escritorio`
  - `items`: array com quantidade, preço em centavos e descrição
  - `redirect_url`: URL da página de sucesso do site
- Retorna o `checkout_url` para o frontend redirecionar o usuário

---

### 3. Atualização da página `CorridaDeBarEmBar.tsx`

- Trocar os 3 cards de lote por **2 cards**: Masculino (R$ 110,00) e Feminino (R$ 55,00)
- Ao clicar em "Comprar", abrir um **modal/dialog** com formulário pedindo:
  - Nome completo
  - Telefone
  - Numero desejado da placa
- Ao submeter o formulário, chamar a edge function `create-checkout`
- Redirecionar o usuário para o `checkout_url` retornado

---

### 4. Página de sucesso (`CorridaSuccess.tsx`)

- Ao carregar, se houver `order_nsu` na URL, atualizar o status do registro na tabela para "aprovado" (via outra edge function ou chamada direta se a policy permitir)

---

### Detalhes Técnicos

- A API da InfinitePay é pública (não requer API key, apenas o `handle`), então pode ser chamada diretamente da edge function sem secrets adicionais
- A edge function usará o `SUPABASE_SERVICE_ROLE_KEY` (já disponível como secret) para inserir na tabela
- `config.toml` será atualizado com `verify_jwt = false` para a função, pois a compra é pública
- O `redirect_url` usará a URL de preview do projeto: `https://id-preview--e85e8ef7-fc93-426e-bd9b-2ccba3a1ae87.lovable.app/eventos/corrida-de-bar-em-bar/sucesso`

