

## Plano: Adicionar campo "Como conheceu" no formulário de inscrição

### 1. Migração no banco de dados

Adicionar coluna `indicacao` (text, nullable) na tabela `inscricoes` para armazenar de onde o participante veio.

```sql
ALTER TABLE public.inscricoes ADD COLUMN indicacao text;
```

### 2. Atualizar Edge Function `create-checkout`

Receber o campo `indicacao` no body e salvá-lo no insert da tabela `inscricoes`.

### 3. Atualizar formulário em `src/pages/CorridaDeBarEmBar.tsx`

- Adicionar `indicacao` ao state do form (default `""`)
- Adicionar um `<Select>` entre o campo de telefone e o botão de confirmar, com label "Como ficou sabendo?" e as opções:
  - Instagram
  - Cena Indie Bar
  - Meu Escritório – Workstation
  - Oeste Pub
  - Galgo
  - Pix
  - Pulse
  - Império Hamburgueria
  - Bravo Pub
  - Kazah Oz
  - Garagem Bar e Lanchonete
  - O Boteco dos Amigos
- Campo obrigatório
- Enviar `indicacao` no body da chamada à edge function

