

## Plano: Scroll to top ao navegar entre páginas

### Problema
Ao clicar no card do evento na Index, o React Router navega para `/eventos/corrida-de-bar-em-bar` mas mantém a posição de scroll da página anterior, fazendo o usuário cair no meio da página do evento.

### Solução
Criar um componente `ScrollToTop` que escuta mudanças de rota e faz `window.scrollTo(0, 0)` automaticamente.

### Alterações

**Criar `src/components/ScrollToTop.tsx`**
- Componente que usa `useLocation()` + `useEffect` para fazer `window.scrollTo(0, 0)` a cada mudança de `pathname`

**`src/App.tsx`**
- Adicionar `<ScrollToTop />` dentro do `<BrowserRouter>`, antes do `<Header />`

