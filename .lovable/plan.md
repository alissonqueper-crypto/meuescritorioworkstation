

## Plano: Reescrever o efeito Lamp fiel ao original Aceternity

### Problema atual
O componente `lamp.tsx` foi modificado de forma que perdeu o visual original do efeito Aceternity. Faltam propriedades cruciais como `scale-y-125` e `flex-1` no container dos feixes, e o posicionamento manual com valores fixos (`top-[10rem]`, `top-[2rem]`, `top-[14rem]`) quebrou o layout fluido do efeito.

### O que o efeito original faz (referência 21st.dev)
- Barra teal horizontal no topo
- Dois feixes cônicos (esquerdo e direito) que se expandem para baixo, como uma luminária de teto
- O conteúdo (logo + botão) aparece **abaixo** da barra, iluminado pela luz
- A animação faz o conteúdo subir suavemente com fade-in

### Alterações em `src/components/ui/lamp.tsx`

Restaurar o componente para ser fiel ao original Aceternity, com nossas cores:

1. **Container dos feixes**: restaurar `flex-1 scale-y-125 items-center` (em vez de `items-start pt-8`)
2. **Feixes cônicos**: remover `top-8` manual, usar o posicionamento original com `inset-auto`
3. **Elementos de blur/máscara**: restaurar `translate-y-12` e posicionamento relativo ao `top-1/2` (em vez de valores fixos `top-[14rem]`)
4. **Barra teal**: restaurar `-translate-y-[7rem]` (em vez de `top-[10rem]`)
5. **Máscara de background**: restaurar `-translate-y-[12.5rem]` (em vez de `top-[2rem]`)
6. **Container de children**: usar animação de subida com `initial y: 10` (mantendo o `-translate-y-20` ou ajustando para o conteúdo ficar centralizado abaixo da barra)

### Resultado esperado
Visualmente idêntico à referência do 21st.dev: barra teal brilhante no topo, feixes de luz vermelho/azul se expandindo para baixo, logo grande centralizada abaixo da luz, botão WhatsApp embaixo.

### Arquivo modificado
- `src/components/ui/lamp.tsx`

