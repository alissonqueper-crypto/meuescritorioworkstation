

## Plano: Substituir galeria geral por fotos reais do escritório

A galeria "Galeria de Fotos" no topo da página Estrutura usa 5 fotos genéricas do Unsplash. Serão substituídas pelas 6 fotos reais enviadas.

### Alterações

1. **Copiar 6 fotos** para `src/assets/`:
   - `WhatsApp_Image_2026-03-02_at_17.05.10_1.jpeg` → `src/assets/galeria-recepcao.jpg` (sofá, TV de boas-vindas, logo)
   - `WhatsApp_Image_2026-03-02_at_17.05.10_2.jpeg` → `src/assets/galeria-rede.jpg` (rede suspensa colorida com telão)
   - `WhatsApp_Image_2026-03-02_at_17.05.10.jpeg` → `src/assets/galeria-fachada.jpg` (fachada do prédio)
   - `WhatsApp_Image_2026-03-02_at_17.05.11.jpeg` → `src/assets/galeria-coworking.jpg` (coworking noturno com rede no teto)
   - `DSC08033-2.jpg` → `src/assets/galeria-estacao.jpg` (estações de trabalho com divisória)
   - `WhatsApp_Image_2026-03-02_at_17.08.36.jpeg` → `src/assets/galeria-escritorio.jpg` (escritório privativo com estante)

2. **`src/pages/Estrutura.tsx`**:
   - Importar os 6 novos assets
   - Substituir o array `gallerySpaces` (5 itens Unsplash → 6 itens reais):
     - "Fachada" — entrada imponente com letreiro Workstation e logos dos parceiros
     - "Recepção & Lounge" — sofá confortável, TV de boas-vindas e logo na parede
     - "Rede Suspensa" — rede colorida iluminada com telão ao fundo
     - "Coworking Noturno" — estações de trabalho sob rede suspensa com iluminação noturna
     - "Estação de Trabalho" — mesas com divisória e cadeiras ergonômicas
     - "Escritório Privativo" — sala privativa com mesa, estante e vista para o coworking

