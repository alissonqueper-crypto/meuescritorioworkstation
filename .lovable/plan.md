

## Plano: Corrigir seção Localização na página inicial

### Problema
O mapa atual usa uma query genérica (`q=Caçador,SC,Brazil`) que mostra a cidade inteira, e o endereço exibido é fictício ("Rua Exemplo, 123"). No mobile, o iframe com `aspect-video` pode ficar desproporcional.

### Alterações em `src/pages/Index.tsx`

1. **Atualizar endereço** de "Rua Exemplo, 123 – Centro, Caçador – SC" para **"R. Vinte e Cinco de Março, 148 – Centro, Caçador – SC, 89500-061"**

2. **Atualizar iframe do Google Maps** — trocar a query do embed para apontar diretamente ao endereço correto:
   - `src="https://maps.google.com/maps?q=R.+Vinte+e+Cinco+de+Março,+148,+Caçador,+SC&output=embed"`

3. **Adicionar botão "Abrir no Maps"** sobre o mapa (como na screenshot de referência) com link para:
   - `https://www.google.com/maps/search/R.+Vinte+e+Cinco+de+Março,+148,+Caçador,+SC`

4. **Ajustar dimensões mobile** — trocar `aspect-video min-h-[250px]` por `aspect-[4/3] md:aspect-video min-h-[300px]` para o mapa ficar mais alto e legível no mobile

