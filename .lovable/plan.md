

## Plano: Atualizar informações do evento no site

Extraí todas as informações relevantes dos documentos. Vou atualizar a página `CorridaDeBarEmBar.tsx` com os dados reais do evento.

---

### Informações extraídas dos documentos

- **Nome completo:** Corrida de Bar em Bar – em busca do Litrão MAPA 2026
- **Data:** 14 de março de 2026
- **Largada:** 17h
- **Duração máxima:** 2 horas
- **Percurso:** Aproximadamente 2,5 km
- **Local:** Caçador/SC
- **11 bares participantes (na ordem do circuito):**
  1. Cena Indie Bar
  2. Meu Escritório – Workstation
  3. Oeste Pub
  4. Galgo
  5. Pix
  6. Pulse
  7. Império Hamburgueria
  8. Bravo Pub
  9. Kazah Oz
  10. Garagem Bar e Lanchonete
  11. O Boteco dos Amigos

---

### Alterações em `CorridaDeBarEmBar.tsx`

1. **Hero:** Atualizar subtítulo com data (14 de março), horário (17h) e percurso (2,5 km). Adicionar badges com data/hora/distância.

2. **Bares participantes:** Substituir os 6 bares fictícios pelos 11 reais, numerados na ordem do circuito.

3. **Nova seção "Dinâmica do Circuito":** Explicar as 4 mesas em cada bar:
   - 1ª mesa: Copo 300ml → adesivo quadrado
   - 2ª mesa: Copo 200ml → adesivo triângulo
   - 3ª mesa: Copo 100ml ou shot → adesivo bolinha
   - 4ª mesa: Apenas registrar passagem → adesivo X
   - Adesivo entregue mediante devolução do copo ao garçom.

4. **Nova seção "Critérios de Classificação":** Vence quem concluir no menor tempo, passar pelos 11 bares, não ultrapassar 2h, e atingir o volume exato (Masculino: 2,2L / Feminino: 1,1L).

5. **Atualizar seção "Regras & Termos":** Adicionar regras reais:
   - Copos plásticos não reutilizáveis
   - Proibido portar copos fora do ponto de consumo
   - Devolução obrigatória para validação do adesivo
   - Participantes só entram nos bares para uso do sanitário
   - Cada participante é responsável por sua condição física

6. **Atualizar seção "Segurança"** (dentro de Regras ou como seção separada):
   - Equipe de organização em todas as esquinas
   - Ambulância e profissional de enfermagem
   - Apoio da Guarda Municipal
   - Fiscais e cronômetro oficial

7. **Atualizar FAQ** com informações consistentes (volume, duração, número de bares).

8. **Seção "O que está incluso":** Atualizar itens para refletir: placa de identificação individual, mapa do circuito, copos em cada bar, adesivos de controle.

---

### Detalhes Técnicos

- Todas as alterações são no arquivo `src/pages/CorridaDeBarEmBar.tsx`
- Apenas dados estáticos (arrays e textos) — sem mudanças em lógica ou integrações
- Mantém a mesma estrutura visual e componentes existentes (ScrollSection, neon cards, etc.)
- Os 11 bares serão exibidos em grid 3 colunas com numeração do circuito

