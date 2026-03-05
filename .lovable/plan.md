

## Plano: Otimizações mobile, reconciliação de pagamentos e limpeza de duplicatas

Há 3 problemas distintos para resolver:

### 1. Textos "apagados" no mobile Android

O problema está nas classes CSS que usam opacidade baixa e cores com pouca visibilidade em telas mobile. As principais causas:

- `text-muted-foreground` (definido como `215 12% 55%`) é muito escuro no fundo GTA
- `bg-background/50` nos inputs tem opacidade muito baixa
- `text-foreground/80` nos labels reduz visibilidade
- `-webkit-text-stroke` no `.text-gta-gradient` pode renderizar mal em Android

**Alterações em `src/pages/MeuIngresso.tsx`:**
- Trocar `text-foreground/80` → `text-foreground` nos labels
- Trocar `bg-background/50` → `bg-background/80` nos inputs
- Aumentar contraste dos textos do ticket card
- Adicionar `text-base` nos inputs para evitar zoom automático no iOS/Android (inputs < 16px causam zoom)

**Alterações em `src/index.css`:**
- Ajustar `.text-gta-gradient` para usar `text-shadow` sem `-webkit-text-stroke` em telas pequenas (stroke pode causar texto "apagado" em Android)
- Aumentar opacidade do `.gta-mission-card` background

### 2. Atualizar status cruzando com InfinitePay

A edge function `check-payments` já existe e faz exatamente isso. Precisa ser **executada** para reconciliar os 37 registros pendentes. Vou:

- Adicionar ao `check-payments` a lógica de **limpeza de duplicatas**: após verificar pagamentos, identificar registros com mesmo `nome+telefone` onde nenhum está aprovado e manter apenas o mais recente
- Adicionar um botão na página MeuIngresso (ou chamar automaticamente) para triggerar a verificação

**Alteração em `supabase/functions/check-payments/index.ts`:**
- Após o loop de verificação de pagamentos, adicionar etapa de limpeza:
  - Agrupar por `nome` + `telefone`
  - Para cada grupo com duplicatas:
    - Se algum está `aprovado` → deletar todos os outros
    - Se nenhum está `aprovado` → manter apenas o mais recente, deletar o resto

### 3. Limpeza de nomes duplicados

Dados atuais mostram duplicatas significativas (ex: Alexandre com 9 registros, todos pendentes). A limpeza será feita na edge function conforme descrito acima.

Resumo dos dados:
- 37 registros, todos `pendente`
- 5 grupos de duplicatas identificados
- Alexandre Angelo Catapam: 9 registros duplicados

### Alterações por arquivo

| Arquivo | O que muda |
|---|---|
| `src/pages/MeuIngresso.tsx` | Aumentar contraste de labels, inputs e textos para mobile |
| `src/index.css` | Ajustar `.text-gta-gradient` e `.gta-mission-card` para melhor legibilidade mobile |
| `supabase/functions/check-payments/index.ts` | Adicionar etapa de limpeza de duplicatas após reconciliação |

Após implementar, vou executar a edge function para reconciliar todos os pagamentos pendentes e limpar duplicatas de uma vez.

