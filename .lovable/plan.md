

## Plano: Substituir fotos das Estações de Trabalho por fotos reais

### Alterações

1. **Copiar 3 fotos** para `src/assets/`:
   - `user-uploads://DSC08033.jpg` → `src/assets/estacao-1.jpg` (mesas lado a lado com cadeiras ergonômicas e vista para a rua)
   - `user-uploads://DSC08038.jpg` → `src/assets/estacao-2.jpg` (mesas com divisória e cadeiras executivas)
   - `user-uploads://WhatsApp_Image_2026-03-02_at_16.53.01.jpeg` → `src/assets/estacao-3.jpg` (visão geral do coworking com rede suspensa e plantas)

2. **`src/pages/Estrutura.tsx`**:
   - Importar `estacao1`, `estacao2`, `estacao3` de `@/assets/`
   - No bloco "Estações de Trabalho", reduzir de 6 fotos placeholder para 3 fotos reais:
     - Foto 1: "Mesa Individual" — mesas ergonômicas com cadeira confortável e vista para a rua
     - Foto 2: "Estação Compartilhada" — mesas com divisória para privacidade e cadeiras executivas
     - Foto 3: "Visão Geral do Coworking" — ambiente amplo com estações de trabalho, rede suspensa colorida e plantas decorativas

