

## Plano: Adicionar Informações Reais do Coworking

Com base no que você descreveu, o escritório é um coworking que oferece salas de reunião por hora e abriga profissionais de diversas áreas: software empresarial (OMIE), contabilidade, agência de marketing digital e social media, e uma equipe de desenvolvimento de inteligência artificial para empresas.

---

### Alterações Planejadas

### 1. Nova Seção "Quem Trabalha Aqui" na Home (`Index.tsx`)

Adicionar uma seção entre Benefícios e Planos mostrando as empresas/profissionais residentes:

- **Software Empresarial (OMIE)** — Implementação e suporte do sistema de gestão OMIE para empresas
- **Contabilidade** — Escritório contábil com atendimento presencial e digital
- **Marketing Digital & Social Media** — Agência completa de marketing digital, gestão de redes sociais e criação de conteúdo
- **Inteligência Artificial** — Equipe de desenvolvimento de soluções de IA para empresas

Cada item será um card com ícone relevante (Code, Calculator, Megaphone, Brain), usando as 4 cores da marca alternadamente.

### 2. Atualizar Benefícios na Home (`Index.tsx`)

Substituir "Comunidade Ativa" (genérico) por algo mais específico:
- **Networking Multidisciplinar** — "Trabalhe ao lado de profissionais de tecnologia, contabilidade, marketing e IA."

### 3. Seção "Salas de Reunião" na Home (`Index.tsx`)

Adicionar destaque para o aluguel de salas de reunião por hora, com CTA para WhatsApp:
- Equipadas com TV e quadro branco
- Aluguel por hora avulso (sem necessidade de plano)
- Ideal para reuniões com clientes, apresentações e videoconferências

### 4. Atualizar Planos (`Planos.tsx`)

Adicionar um novo plano/opção:
- **Sala de Reunião Avulsa** — R$ sob consulta / por hora — com features: TV, quadro branco, videoconferência, café incluso, até X pessoas

### 5. Atualizar Página Estrutura (`Estrutura.tsx`)

Atualizar as descrições dos espaços para refletir os profissionais residentes:
- Mencionar nas áreas comuns a convivência entre profissionais de diferentes áreas
- Salas de reunião: enfatizar aluguel por hora

### 6. Atualizar Textos Gerais

- Hero subtitle: mencionar "tecnologia, contabilidade, marketing e IA" ao invés de genérico
- Footer: atualizar descrição para refletir as áreas de atuação

---

### Detalhes Técnicos

**Arquivos modificados:**
- `src/pages/Index.tsx` — nova seção "Quem Trabalha Aqui", seção salas de reunião, atualizar benefícios e hero
- `src/pages/Planos.tsx` — adicionar opção de sala de reunião avulsa
- `src/pages/Estrutura.tsx` — atualizar descrições dos espaços
- `src/components/Footer.tsx` — atualizar texto descritivo

**Ícones novos do Lucide:** `Code`, `Calculator`, `Megaphone`, `Brain`, `Clock`

**Sem novos arquivos ou dependências.** Apenas alterações em dados estáticos e textos.

