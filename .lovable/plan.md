

## Plano: Substituir a imagem de capa da página Corrida de Bar em Bar

### O que será feito

Copiar a imagem enviada pelo usuário (IMG_5359.PNG) para `src/assets/` e atualizar o import em `src/pages/CorridaDeBarEmBar.tsx` para usar a nova imagem no hero da página.

### Alterações

1. **Copiar arquivo**: `user-uploads://IMG_5359.PNG` → `src/assets/corrida-hero-gta.png`

2. **`src/pages/CorridaDeBarEmBar.tsx`** (linha 15):
   - Alterar o import de `import eventHeroImg from "@/assets/event-hero.jpg"` para `import eventHeroImg from "@/assets/corrida-hero-gta.png"`

Nenhuma outra alteração necessária — a variável `eventHeroImg` já é usada no `<img>` do hero (linha 139), então a troca será automática.

