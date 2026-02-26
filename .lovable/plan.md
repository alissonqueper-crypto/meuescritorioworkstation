

## Plano: Substituir fotos da Recepção por fotos reais

### Alterações

1. **Copiar 2 fotos** para `src/assets/`:
   - `user-uploads://WhatsApp_Image_2026-02-26_at_20.18.51.jpeg` → `src/assets/recepcao-1.jpg` (sofá cinza, TV de boas-vindas, logo na parede, sala ao fundo)
   - `user-uploads://WhatsApp_Image_2026-02-26_at_20.18.38.jpeg` → `src/assets/recepcao-2.jpg` (estações de trabalho, planta, teto decorado)

2. **`src/pages/Estrutura.tsx`**:
   - Importar `recepcao1` e `recepcao2` de `@/assets/`
   - No bloco "Recepção" do `structureBlocks`, reduzir de 6 fotos para 2:
     - Foto 1: "Recepção & Lounge" — sofá, TV com mensagem de boas-vindas e vista para as salas
     - Foto 2: "Área de Coworking" — estações de trabalho em ambiente amplo e moderno
   - Atualizar descrições para refletir o que aparece nas fotos reais

