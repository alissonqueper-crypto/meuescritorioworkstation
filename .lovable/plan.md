

## Plano: Remover preços/planos e ajustar Hero

### Resumo

Três mudanças principais:
1. **Remover botão "Ver planos"** do hero — fica só o botão WhatsApp
2. **Remover seção inteira de Planos** da página inicial (com preços R$ 49, R$ 499, R$ 899) e o array `plans`
3. **Hero**: logo maior (`w-72 md:w-96`), botão WhatsApp desce mais (maior `mb` entre logo e botão)

Também vou:
- Remover link "Planos" do Header (`src/components/Header.tsx`)
- Remover rota `/planos` do `App.tsx` e o import de `Planos`
- Remover `src/pages/Planos.tsx`

---

### Alterações por arquivo

**`src/pages/Index.tsx`**
- Remover array `plans` (linhas 54-76)
- Hero: aumentar logo para `w-72 md:w-96`, adicionar `mb-16` para empurrar o botão pra baixo
- Remover botão "Ver planos" e o `Link to="/planos"`
- Remover seção "PLANOS PREVIEW" inteira (linhas 221-253)
- Remover import de `ArrowRight` se não usado em outro lugar (ainda é usado nas salas de reunião, então mantém)

**`src/components/Header.tsx`**
- Remover `{ to: "/planos", label: "Planos" }` do array `navLinks`

**`src/App.tsx`**
- Remover `import Planos` e a `<Route path="/planos" ...>`

**`src/pages/Planos.tsx`**
- Deletar o arquivo

