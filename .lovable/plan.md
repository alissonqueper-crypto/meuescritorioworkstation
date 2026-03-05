

## Plano: Substituir título texto pela logo do evento

### Alterações

1. **Copiar imagem** `user-uploads://Design_sem_nome_11.png` → `src/assets/corrida-logo.png`

2. **`src/pages/CorridaDeBarEmBar.tsx`** (linha 125-127)
   - Substituir o `<h1>` com texto "CORRIDA DE BAR EM BAR" por uma `<img>` com a logo
   - Classe: `w-64 sm:w-80 md:w-96 lg:w-[28rem]` para responsividade

3. **`src/pages/Index.tsx`** (linhas 260-262)
   - Substituir o `<h3>` com texto "CORRIDA DE BAR EM BAR" por uma `<img>` com a logo
   - Classe: `w-48 md:w-72` (menor no card)

Ambos importam `corridaLogo from "@/assets/corrida-logo.png"`.

