

## Plano: Descer a logo e conteúdo no Hero

### Problema
A logo está colada no topo do hero, sobrepondo o header, porque o container de children usa `-translate-y-48` que puxa tudo para cima demais.

### Alteração em `src/components/ui/lamp.tsx`

Reduzir o `translate-y` negativo do container de children de `-translate-y-48` para `-translate-y-20` (ou até `translate-y-0`), fazendo a logo descer para o centro/meio-inferior da seção hero, abaixo da barra teal e dos feixes de luz.

**Linha afetada:** a div que envolve `{children}` — mudar de `-translate-y-48` para `-translate-y-20`.

### Resultado esperado
Logo centralizada verticalmente no hero, abaixo do efeito de luz, com espaço adequado entre a barra teal e a logo.

