

## Plano: Substituir fotos das salas de reunião na seção "Nossos Espaços" (Index)

### Alterações

1. **Copiar 3 fotos** para `src/assets/`:
   - `user-uploads://WhatsApp_Image_2026-02-24_at_19.32.23.jpeg` → `src/assets/sala-1.jpg`
   - `user-uploads://WhatsApp_Image_2026-02-24_at_19.32.24.jpeg` → `src/assets/sala-2.jpg`
   - `user-uploads://WhatsApp_Image_2026-02-24_at_19.32.22.jpeg` → `src/assets/sala-3.jpg`

2. **`src/pages/Index.tsx`** — No array `officeSpaces`:
   - Importar `sala1`, `sala2`, `sala3` de `@/assets/`
   - Substituir o `src` das 3 entradas "Sala de Reunião 1/2/3" pelas fotos reais
   - Atualizar nomes e descrições para refletir os espaços reais:
     - Sala 1: "Sala Executiva" — mesa ampla com vista
     - Sala 2: "Sala de Reunião Compacta" — poltrona e cadeira
     - Sala 3: "Escritório Privativo" — estação com estante e impressora

