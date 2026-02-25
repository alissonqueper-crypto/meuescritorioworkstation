

## Plano: Expandir os carrosséis para 6-8 fotos cada

### O que será feito

Adicionar mais fotos em cada um dos 6 arrays de `structureBlocks` no arquivo `src/pages/Estrutura.tsx`. Atualmente cada bloco tem 3 fotos — vamos expandir para 6 fotos cada, adicionando 3 novas entradas com fotos Unsplash diferentes e descrições relevantes.

O componente `CircularTestimonials` já suporta qualquer quantidade de itens sem alteração — ele exibe 3 por vez (ativo + 2 laterais) e navega pelo array completo.

### Alterações

**`src/pages/Estrutura.tsx`**

Adicionar 3 novas entradas em cada array `photos` dentro de `structureBlocks`:

1. **Estações de Trabalho** — adicionar: Mesa Compartilhada, Estação Dupla, Área de Foco
2. **Salas de Reunião** — adicionar: Sala Compacta, Sala de Brainstorm, Sala de Treinamento
3. **Copa & Cozinha** — adicionar: Área de Snacks, Bancada de Preparo, Espaço Social
4. **Área Comum** — adicionar: Terraço, Área de Jogos, Espaço de Leitura
5. **Recepção** — adicionar: Corredor Principal, Área de Credenciamento, Fachada
6. **Lounge** — adicionar: Varanda Lounge, Espaço Meditação, Bar de Café

Cada nova entrada segue o formato existente: `{ name, designation, quote, src }` com foto Unsplash relevante.

Nenhuma alteração no componente `CircularTestimonials` — ele já funciona com qualquer número de itens.

### Resultado esperado

Cada carrossel terá 6 fotos para navegar em vez de 3, oferecendo uma apresentação mais completa de cada espaço do escritório.

