

## Plano: Atualizar carrossel "Área Comum" com fotos reais e remover bloco "Lounge"

### Alterações

1. **Copiar 3 fotos** para `src/assets/`:
   - `user-uploads://WhatsApp_Image_2026-02-26_at_20.22.54_1.jpeg` → `src/assets/area-comum-1.jpg` (mezanino com rede suspensa e telão)
   - `user-uploads://WhatsApp_Image_2026-02-26_at_20.22.54_2.jpeg` → `src/assets/area-comum-2.jpg` (lounge com sofás e banner)
   - `user-uploads://WhatsApp_Image_2026-02-26_at_20.22.54.jpeg` → `src/assets/area-comum-3.jpg` (rede suspensa com telão e deck)

2. **`src/pages/Estrutura.tsx`**:
   - Importar `areaComum1`, `areaComum2`, `areaComum3` de `@/assets/`
   - No bloco "Área Comum", substituir as 6 fotos placeholder por 3 fotos reais:
     - Foto 1: "Rede Suspensa" — área de descompressão com rede colorida suspensa no mezanino
     - Foto 2: "Lounge" — sofás confortáveis com TV e banner do escritório
     - Foto 3: "Deck de Lazer" — espaço amplo com rede suspensa, telão e área para eventos
   - Remover o import `Sofa` do lucide-react
   - Remover completamente o bloco "Lounge" do array `structureBlocks`

