

## Plano: Atualizar card de evento na Index com estética GTA

O card atual na seção "Eventos & Comunidade" da Index usa o estilo genérico neon. Vamos atualizá-lo para refletir a identidade visual GTA San Andreas da página do evento.

### Alterações em `src/pages/Index.tsx`

**Imports adicionais:**
- Importar `eventHeroImg` de `@/assets/corrida-hero-gta.png`
- Importar ícones extras: `Beer`, `Timer`, `Route`, `Crosshair`

**Substituir o card atual (linhas 248-264)** por um card com estética GTA:

- Fundo com imagem hero do evento (semi-transparente) + gradient overlay escuro
- Badge superior com estilo `gta-hud-chip` ("★ NOVA MISSÃO DISPONÍVEL ★")
- Título "CORRIDA DE BAR EM BAR" em `font-gta-price text-gta-gradient` com text-shadow
- Subtítulo "GTA San Andreas Edition" em `font-gta-script text-gta-gold`
- Chips HUD com data, local, distância, nº de bares (mesmo estilo da página do evento)
- Botão com classe `btn-gta` em vez de `variant="neon"`
- Manter o `Link to="/eventos/corrida-de-bar-em-bar"`

### Estrutura visual

```text
┌─────────────────────────────────────────┐
│  [Hero image background + dark overlay] │
│                                         │
│  ★ NOVA MISSÃO DISPONÍVEL ★  (hud chip) │
│                                         │
│     CORRIDA DE BAR EM BAR               │
│     GTA San Andreas Edition             │
│                                         │
│  14/03·17h  Caçador/SC  ~2,5km  11bars  │
│                                         │
│     [ Iniciar missão → ]  (btn-gta)     │
└─────────────────────────────────────────┘
```

### Detalhes técnicos
- Card usa `overflow-hidden relative` com `<img>` absoluto + gradient overlay (mesmo padrão do hero da página do evento)
- Texto e botões ficam em `relative z-10`
- Responsivo: texto menor no mobile, chips com `text-[10px] sm:text-xs`

