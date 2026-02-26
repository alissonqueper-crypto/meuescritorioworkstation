

## Plano: Hero full-screen no mobile com elementos bem distribuídos

### Problema

Na screenshot, o hero ocupa ~60vh no mobile, deixando espaço desperdiçado. O usuário quer que o hero ocupe **100% da tela** (100dvh) no mobile, com logo, botão CTA e badges bem distribuídos verticalmente, criando uma experiência imersiva de "tela cheia". Ao rolar, aparecem as demais seções.

### Alterações

#### 1. `src/components/ui/lamp.tsx`

- Mudar altura mobile de `min-h-[60vh]` para `min-h-[100dvh]` (dynamic viewport height para lidar com barra de navegação do browser): `min-h-[100dvh] md:min-h-[85vh]`
- Usar `justify-between` em vez de `justify-center` no container principal para distribuir o efeito lamp e o conteúdo verticalmente
- Ajustar translate do conteúdo: de `-translate-y-8 md:-translate-y-20` para `-translate-y-4 md:-translate-y-20` para o conteúdo ficar mais centralizado na tela cheia

#### 2. `src/pages/Index.tsx` — Hero

- Logo: aumentar de `w-64` para `w-72 md:w-96` para maior impacto em tela cheia
- Botão CTA: manter `w-full sm:w-auto` com padding lateral `px-6`
- Badges: mover de `bottom-3` para `bottom-6 md:bottom-8` para ficarem com mais respiro do fundo da tela
- Adicionar `mb-4` ao botão CTA para separar mais da logo

### Detalhes técnicos

- `100dvh` (dynamic viewport height) é preferível a `100vh` no mobile pois desconta a barra de endereço do navegador, evitando scroll indesejado
- O efeito lamp (conic gradients) continua ocupando a parte superior, com o conteúdo (logo + botão) centralizado abaixo
- Os badges ficam ancorados no bottom do container fullscreen
- Desktop permanece inalterado com `md:min-h-[85vh]`

### Resultado esperado

Hero ocupando 100% da tela no mobile, com logo grande e centralizada, botão CTA abaixo, e badges no rodapé da seção. Ao rolar, o usuário vê a seção de benefícios e demais conteúdo.

