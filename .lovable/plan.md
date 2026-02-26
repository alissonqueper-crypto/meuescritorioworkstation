

## Plano: Corrigir hero fullscreen mobile — elementos bem posicionados

### Problema

Na screenshot, o efeito lamp (gradientes cônicos vermelho/azul) está dominando toda a metade superior da tela com cores sólidas. Isso acontece porque:
1. O container do efeito lamp usa `flex-1` que expande para preencher 100dvh inteiro
2. O `scale-y-125` amplifica os gradientes além do necessário no mobile
3. O conteúdo (logo + botão) fica empurrado para baixo, quase colidindo com os badges
4. Os badges e o botão CTA se sobrepõem no rodapé

### Alterações

#### 1. `src/components/ui/lamp.tsx` — Reestruturar para mobile

- Reduzir o `scale-y-125` para `scale-y-100 md:scale-y-125` no container do efeito lamp, evitando que os gradientes ocupem área excessiva no mobile
- Limitar a altura do container do efeito: adicionar `max-h-[40vh] md:max-h-none` para que o efeito lamp ocupe no máximo 40% da tela no mobile
- Remover `flex-1` e usar altura fixa no container do efeito: `h-[35vh] md:flex-1` para controlar melhor a distribuição
- Ajustar o container do conteúdo: trocar `-translate-y-4` por `translate-y-0` e usar `pb-24 md:pb-0` para dar espaço aos badges no bottom
- Mudar o layout geral para `justify-end md:justify-center` no mobile, posicionando o conteúdo na metade inferior da tela com o efeito lamp acima

#### 2. `src/pages/Index.tsx` — Ajustar posicionamento

- Logo: manter `w-72 md:w-96` (tamanho bom)
- Botão CTA: adicionar `mb-16 md:mb-0` para criar espaço entre o botão e os badges no mobile
- Badges container: manter `bottom-6` mas garantir que não colide com o botão adicionando espaço via margin no conteúdo acima

### Detalhes técnicos

- O problema principal é o `scale-y-125` no div do efeito lamp — ele escala os gradientes cônicos de 224px (h-56) para quase 280px, e como o container é `flex-1` dentro de 100dvh, os gradientes preenchem a tela toda com vermelho/azul sólido
- A solução limita a altura do efeito lamp no mobile e remove a escala vertical, mantendo o efeito visual mas sem dominar a tela
- Desktop continua com `md:scale-y-125` e `md:flex-1` preservando o layout original
- O conteúdo (logo + CTA) fica centralizado verticalmente abaixo do efeito lamp, com badges ancorados no bottom

### Resultado esperado

Hero fullscreen no mobile com: efeito lamp contido na parte superior (~35% da tela), logo grande e centralizada no meio, botão CTA abaixo da logo, e badges no rodapé — tudo sem sobreposição e com boa distribuição visual.

