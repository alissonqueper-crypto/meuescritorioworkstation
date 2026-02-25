

## Plano: Melhorar os cards da página Estrutura com animações

### O que será feito

Transformar os 6 cards da página `/estrutura` para usar o mesmo estilo animado dos cards de benefícios da página inicial — removendo a área cinza de placeholder (aspect-[4/3]) e aplicando o layout com ícone colorido, hover scale e stagger animations, igual aos cards "Por que escolher nosso Workstation".

### Alterações

**`src/pages/Estrutura.tsx`**

- Remover o bloco de imagem placeholder (`aspect-[4/3] bg-secondary`) de cada card
- Reestruturar cada card para seguir o layout dos cards de benefícios do Index:
  - Ícone em caixa colorida com `group-hover:scale-110`
  - Título em `text-lg font-semibold`
  - Descrição em `text-sm text-muted-foreground`
- Manter as classes `brand-card`, `stagger-{i+1}` e o `ScrollDiv` para animação de scroll
- Adicionar `group` ao card e `transition-transform group-hover:scale-110` ao ícone
- Usar `animationFillMode: "both"` como nos cards do Index

### Resultado esperado

Cards limpos e animados, sem os placeholders cinzas, com hover suave no ícone e aparecimento escalonado ao rolar — mesmo padrão visual da página inicial.

