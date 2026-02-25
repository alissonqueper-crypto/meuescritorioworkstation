

## Plano: Mover o efeito Lamp para mais acima (barra teal no topo, conteúdo mais embaixo)

O objetivo é que a **barra horizontal teal** (a linha de luz) fique posicionada mais acima, logo abaixo do header, e o conteúdo (logo + botão) desça naturalmente para o centro/parte inferior da seção hero.

### Alterações em `src/components/ui/lamp.tsx`

**Reposicionar os feixes de luz e a barra para o topo da seção:**

1. Mudar o container dos feixes de `items-center` para `items-start` com padding-top, para que os gradientes cônicos fiquem ancorados no topo
2. Ajustar a barra teal (`-translate-y-[7rem]`) para ficar mais acima — algo como `top-[10rem]` em vez de centrada
3. Ajustar o bloco de background que mascara acima da barra (`-translate-y-[12.5rem]`) proporcionalmente
4. Mover o `translate-y` do container de children de `-translate-y-48` para algo menor (ex: `-translate-y-20` ou `translate-y-0`) para que a logo e botão fiquem mais abaixo, no centro visual da seção

**Resultado visual:** Os feixes de luz saem do topo (como se a barra teal estivesse logo após o header), e a logo com o botão ficam mais abaixo no hero, com mais espaço respirando.

### Arquivo modificado
- `src/components/ui/lamp.tsx` — reposicionamento vertical dos feixes, barra teal e conteúdo

