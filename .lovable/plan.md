

## Plano: Ajustar proporção do mapa na versão mobile

### Problema
Na screenshot, o mapa está mais largo que o restante do conteúdo da página no mobile. O container do mapa usa `max-w-4xl` mas o `aspect-[4/3]` com `min-h-[300px]` faz ele ocupar mais espaço vertical/horizontal que o necessário no mobile.

### Alterações em `src/pages/CorridaDeBarEmBar.tsx` (linha 447)

1. **Remover `min-h-[300px]`** — no mobile, deixar o aspect ratio controlar a altura naturalmente
2. **Trocar `max-w-4xl`** por `max-w-full` para que o mapa respeite o padding do container pai (`px-4`)
3. **Adicionar `min-h-[250px] md:min-h-[350px]`** para garantir altura mínima razoável apenas em telas maiores

Classe final do container do mapa:
```
relative rounded-xl overflow-hidden border border-gta-green/20 aspect-[4/3] md:aspect-video min-h-[250px] md:min-h-[350px] w-full
```

