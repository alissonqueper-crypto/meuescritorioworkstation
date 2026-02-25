

## Plano: Integrar Carrossel Circular de Fotos do Escritório

### Objetivo
Substituir a seção "Estrutura Preview" (grid de placeholders cinzas) e a seção "Salas de Reunião" na página inicial por um carrossel circular interativo que mostra fotos reais dos espaços do escritório — salas de reunião, mesas de coworking e o ambiente geral.

### Alterações

**1. Criar `src/components/ui/circular-testimonials.tsx`**
- Copiar o componente fornecido, adaptando para não depender de `react-icons` (usar `lucide-react` com `ArrowLeft`/`ArrowRight` no lugar de `FaArrowLeft`/`FaArrowRight`)
- Isso evita instalar `react-icons` como dependência extra já que `lucide-react` já existe no projeto
- Ajustar tipagem dos refs (`useRef<HTMLDivElement>(null)`, `useRef<ReturnType<typeof setInterval>>(null)`)

**2. Modificar `src/pages/Index.tsx`**
- **Remover** a seção "SALAS DE REUNIÃO" (linhas 154-192) e a seção "ESTRUTURA PREVIEW" (linhas 194-213) — substituir ambas por uma única seção com o `CircularTestimonials`
- Criar array de dados com os espaços do escritório, usando o componente como um showcase visual (não como depoimentos):
  - **Sala de Reunião 1** — foto Unsplash de sala de reunião moderna
  - **Sala de Reunião 2** — foto Unsplash de sala de reunião com TV
  - **Sala de Reunião 3** — foto Unsplash de sala de conferência
  - **Mesas de Coworking** — foto Unsplash de coworking
  - **Visão Geral do Escritório** — foto Unsplash de escritório moderno
- O campo `name` será o nome do espaço, `designation` a descrição curta, `quote` os detalhes, `src` a URL da foto
- Configurar `colors` usando as cores do branding:
  - `name`: `hsl(0, 85%, 50%)` (brand-red) ou branco para contraste no fundo escuro
  - `designation`: `hsl(174, 70%, 46%)` (brand-teal)
  - `testimony`: cor do foreground do tema
  - `arrowBackground`: `hsl(215, 55%, 47%)` (brand-blue)
  - `arrowHoverBackground`: `hsl(0, 85%, 50%)` (brand-red)
  - `arrowForeground`: branco

**3. Atualizar `src/pages/Estrutura.tsx`**
- Também integrar o `CircularTestimonials` na seção de galeria (substituindo o `MediaGallery` vazio), com as mesmas fotos dos espaços
- Manter os cards de informação existentes

### Detalhes técnicos
- **Sem nova dependência NPM**: `react-icons` será substituído por `lucide-react` (já instalado), e `framer-motion` já está instalado
- O componente original usa `FaArrowLeft`/`FaArrowRight` — serão trocados por `ArrowLeft`/`ArrowRight` do lucide-react
- As fotos usarão URLs do Unsplash que são conhecidamente válidas (escritórios e salas de reunião)
- O componente tem suporte responsivo nativo (grid muda para coluna única no mobile)
- O JSX do componente fornecido veio parcialmente cortado (faltam tags no render) — será reconstruído seguindo a estrutura lógica do código (refs, estilos inline, classes CSS)

### Resultado esperado
Uma apresentação visual impactante e interativa dos espaços do escritório, com carrossel 3D que rotaciona automaticamente, usando as cores da marca e fotos de alta qualidade.

