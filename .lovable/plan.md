

## Plano: Corrigir seção de localização do evento (mobile + endereço)

### Alterações em `src/pages/CorridaDeBarEmBar.tsx` (linhas 439-452)

1. **Atualizar endereço do iframe** — trocar query genérica por endereço específico:
   - `src="https://maps.google.com/maps?q=R.+Visc.+de+Mauá,+175+-+Centro,+Caçador+-+SC&output=embed"`

2. **Ajustar proporção mobile** — trocar `aspect-video min-h-[250px]` por `aspect-[4/3] md:aspect-video min-h-[300px]` para o mapa ficar mais alto e legível no mobile

3. **Adicionar botão "Abrir no Maps"** flutuante sobre o mapa (como na screenshot), com link externo para:
   - `https://www.google.com/maps/search/R.+Visc.+de+Mauá,+175+-+Centro,+Caçador+-+SC`

4. **Adicionar endereço textual** abaixo do subtítulo: "R. Visc. de Mauá, 175 - Centro, Caçador - SC, 89500-259"

