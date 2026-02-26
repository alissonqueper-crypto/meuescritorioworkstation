

## Plano: Adicionar imagem do mapa acima dos cards compactos

### Resumo

Adicionar a imagem do mapa do circuito enviada pelo usuário como destaque principal da seção "11 Pontos no Mapa", e reorganizar os cards dos bares em formato compacto (horizontal, menores) logo abaixo da imagem.

### Alterações

#### 1. Salvar a imagem

- Copiar `user-uploads://ChatGPT_Image_23_de_fev._de_2026_19_40_40.png` para `src/assets/mapa-circuito.png`

#### 2. `src/pages/CorridaDeBarEmBar.tsx` (linhas 253-272)

- Importar a imagem: `import mapaCircuito from "@/assets/mapa-circuito.png"`
- Entre o título (linha 259) e o grid de cards (linha 260), inserir:
  - `<img src={mapaCircuito} alt="Mapa do circuito" className="w-full max-w-3xl mx-auto rounded-sm border border-gta-green/30 mb-8" />`
- Alterar o grid de cards (linhas 260-272):
  - De `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4` para `grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2`
  - Reduzir padding dos cards de `p-5` para `p-2`
  - Reduzir tamanho do número de `text-xl` para `text-sm`
  - Reduzir nome do bar de `font-semibold` para `text-xs font-medium`
  - Reduzir ícone MapPin de `w-4 h-4` para `w-3 h-3`

### Resultado esperado

A imagem do mapa aparece grande e centralizada como destaque visual. Abaixo dela, os 11 cards dos bares ficam compactos em 4 colunas, servindo como legenda/lista complementar.

