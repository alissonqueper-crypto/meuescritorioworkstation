

## Plano: Logo scroll-to-top + Navegação com scroll suave para seções

### Problema atual
- A logo já linka para `/`, mas se o usuário já está na home, não faz nada visível (não rola ao topo)
- Os links de navegação levam a páginas separadas, mas na home seria melhor rolar suavemente até as seções correspondentes

### Alterações

**`src/components/Header.tsx`**
- Logo: ao clicar, se já está na `/`, fazer `window.scrollTo({ top: 0, behavior: 'smooth' })` em vez de navegar
- Atualizar `navLinks` para incluir âncoras quando na home page:
  - "Início" → scroll ao topo
  - "Estrutura" → se na home, scroll para `#estrutura`; senão, navega para `/estrutura`
  - "Eventos" → se na home, scroll para `#eventos`; senão, navega para `/eventos/corrida-de-bar-em-bar`
  - "Contato" → se na home, scroll para `#localizacao`; senão, navega para `/contato`
- Criar handler de click que detecta `location.pathname === "/"` e faz `document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })` em vez de navegar

**`src/pages/Index.tsx`**
- Adicionar `id` nas `ScrollSection` correspondentes:
  - Benefícios → `id="beneficios"`
  - Nossos Espaços → `id="estrutura"`
  - Localização → `id="localizacao"`
  - Eventos → `id="eventos"`

### Comportamento
- Na home: cliques no nav rolam suavemente até a seção
- Em outras páginas: cliques navegam normalmente para a rota
- Logo: sempre volta ao topo da home (scroll suave se já na home, navegação se em outra página)
- `scroll-padding-top` no CSS para compensar o header fixo (~80px)

