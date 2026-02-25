

## Plano: Remover cards e adicionar 6 blocos de carrosséis

### O que será feito

Remover a grid de 6 cards com ícones (linhas 69-84). Manter a seção "Galeria de Fotos" como está (linhas 86-104). Adicionar abaixo dela uma nova seção "Nossa Estrutura" com 6 blocos empilhados verticalmente, cada um com título + ícone e seu próprio `CircularTestimonials` com 3 fotos Unsplash representativas do espaço.

### Alterações em `src/pages/Estrutura.tsx`

- **Remover** o bloco `<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">` com os 6 cards (linhas 69-84)
- **Manter** a seção "Galeria de Fotos" intacta (linhas 86-104)
- **Adicionar** após a galeria uma nova seção com título "Nossa Estrutura" e 6 blocos verticais:

Cada bloco terá:
- Título com ícone (ex: `<Monitor />` + "Estações de Trabalho") e descrição curta
- Um `CircularTestimonials` próprio com 3 fotos Unsplash daquele espaço
- Envolvido em `ScrollDiv` para animação de entrada
- Espaçamento `mt-16` entre blocos

Os 6 blocos e suas fotos:

1. **Estações de Trabalho** — 3 fotos de mesas/desks de coworking
2. **Salas de Reunião** — 3 fotos de salas de reunião
3. **Copa & Cozinha** — 3 fotos de copa/cozinha de escritório
4. **Área Comum** — 3 fotos de áreas de convivência
5. **Recepção** — 3 fotos de recepções
6. **Lounge** — 3 fotos de lounges

Cada carrossel usará as mesmas cores de branding já configuradas. O array `spaces` será mantido para referência de ícones/cores nos títulos dos blocos.

```text
┌─────────────────────────────────────┐
│     Nossa Estrutura (título H1)      │
├─────────────────────────────────────┤
│     Galeria de Fotos (existente)     │
│     [Carrossel 3D geral]             │
├─────────────────────────────────────┤
│     Nossa Estrutura (título H2)      │
├─────────────────────────────────────┤
│  📺 Estações de Trabalho             │
│  [Carrossel 3D · 3 fotos]           │
├─────────────────────────────────────┤
│  👥 Salas de Reunião                 │
│  [Carrossel 3D · 3 fotos]           │
├─────────────────────────────────────┤
│  ☕ Copa & Cozinha                   │
│  [Carrossel 3D · 3 fotos]           │
├─────────────────────────────────────┤
│  🪑 Área Comum                      │
│  [Carrossel 3D · 3 fotos]           │
├─────────────────────────────────────┤
│  🚪 Recepção                        │
│  [Carrossel 3D · 3 fotos]           │
├─────────────────────────────────────┤
│  🛋 Lounge                          │
│  [Carrossel 3D · 3 fotos]           │
└─────────────────────────────────────┘
```

### Resultado esperado

Página com a galeria geral no topo seguida de 6 carrosséis dedicados empilhados, cada um mostrando fotos específicas de um espaço do escritório com animação de scroll e cores da marca.

