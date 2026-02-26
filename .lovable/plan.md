

## Plano: Substituir fotos da Copa & Cozinha por fotos reais

### Alterações

1. **Copiar 3 fotos** para `src/assets/`:
   - `user-uploads://WhatsApp_Image_2026-02-26_at_19.55.47_1.jpeg` → `src/assets/copa-1.jpg` (visão geral copa com geladeira e balcão)
   - `user-uploads://WhatsApp_Image_2026-02-26_at_19.55.47_2.jpeg` → `src/assets/copa-2.jpg` (geladeira com bebidas)
   - `user-uploads://WhatsApp_Image_2026-02-26_at_19.55.47.jpeg` → `src/assets/copa-3.jpg` (cozinha com pia e armários)

2. **`src/pages/Estrutura.tsx`** — No bloco "Copa & Cozinha" do array `structureBlocks`:
   - Importar as 3 imagens no topo do arquivo
   - Reduzir o array `photos` de 6 itens para 3, usando as fotos reais como `src`
   - Atualizar nomes e descrições para refletir o espaço real:
     - Foto 1: "Copa & Recepção" — visão geral do balcão com geladeira e canecas
     - Foto 2: "Geladeira de Bebidas" — produtos disponíveis para compra
     - Foto 3: "Cozinha Compartilhada" — pia, purificador e utensílios

