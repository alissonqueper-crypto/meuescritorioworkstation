

## Plano: Ajustar proporção do mapa da página inicial no mobile

### Problema
O container do mapa na seção Localização da página inicial (`src/pages/Index.tsx`, linha 218) usa `max-w-4xl` que causa overflow no mobile, idêntico ao problema já corrigido na página do evento.

### Alteração em `src/pages/Index.tsx` (linha 218)

Trocar as classes do container do mapa de:
```
relative rounded-2xl overflow-hidden border border-border aspect-[4/3] md:aspect-video min-h-[300px] max-w-4xl mx-auto
```
Para:
```
relative rounded-2xl overflow-hidden border border-border aspect-[4/3] md:aspect-video min-h-[250px] md:min-h-[350px] w-full max-w-full mx-auto
```

Mesma correção aplicada anteriormente na página do evento.

