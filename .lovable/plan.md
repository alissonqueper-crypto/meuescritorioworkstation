

## Plano: Centralizar logo do evento no mobile

A imagem da logo (`<img>`) na linha 126 de `CorridaDeBarEmBar.tsx` não está centralizada porque falta a classe `mx-auto`. Elementos `<img>` não são afetados por `text-center` do pai.

### Alteração

**`src/pages/CorridaDeBarEmBar.tsx`** (linha 126):
- Adicionar `mx-auto` à classe da imagem para centralizá-la horizontalmente.

De:
```tsx
<img src={corridaLogo} alt="Corrida de Bar em Bar" className="w-64 sm:w-80 md:w-96 lg:w-[28rem] mb-4" />
```

Para:
```tsx
<img src={corridaLogo} alt="Corrida de Bar em Bar" className="w-64 sm:w-80 md:w-96 lg:w-[28rem] mb-4 mx-auto" />
```

