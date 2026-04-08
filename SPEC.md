# RSR Concept Store - SPEC.md

## 1. Project Overview

**Project Name:** RSR Concept Store  
**Type:** E-commerce Website  
**Core Functionality:** Loja online para vendas de produtos artesanais de croché e tricô  
**Target Users:** Pessoas que apreciam artesanato, moda sustentável, produtos artesanais e慢生活 (estilo de vida lento e consciente)

---

## 2. UI/UX Specification

### 2.1 Design Philosophy

O design deve evocar:
- **Conforto Aconchegante** - Sensação de abraço quentinho
- **Artesanalidade** - Texturas que remetem a tricô/croché
- **Minimalismo Elegante** - Clean mas com personalidade
- **Natureza Orgânica** - Cores terrosas e naturais

### 2.2 Color Palette

```css
:root {
  /* Cores Principais */
  --color-cream: #F5F0E8;           /* Fundo principal - tom creme quente */
  --color-terracotta: #C4704B;       /* Cor de destaque - terracota */
  --color-forest: #2D4A3E;           /* Verde floresta profundo */
  --color-rust: #8B4513;             /* Marrom ferrugem */
  
  /* Cores Secundárias */
  --color-sand: #D4C4B0;             /* Areia */
  --color-moss: #6B7B5E;             /* Musgo */
  --color-blush: #E8D5D0;            /* Rosado suave */
  
  /* Cores Neutras */
  --color-charcoal: #2C2C2C;         /* Texto principal */
  --color-stone: #6B6B6B;            /* Texto secundário */
  --color-mist: #F0EDE8;            /* Fundos secundários */
  
  /* Cores de Ação */
  --color-gold: #B8860B;             /* Botões de destaque */
  --color-sage: #87A878;             /* Success/sucesso */
}
```

### 2.3 Typography

```css
/* Fontes */
--font-display: 'Playfair Display', serif;  /* Títulos principais */
--font-body: 'Lora', serif;                  /* Corpo do texto */
--font-accent: 'Josefin Sans', sans-serif;  /* Elementos decorativos */

/* Tamanhos */
--text-xs: 0.75rem;      /* 12px */
--text-sm: 0.875rem;     /* 14px */
--text-base: 1rem;       /* 16px */
--text-lg: 1.125rem;     /* 18px */
--text-xl: 1.25rem;      /* 20px */
--text-2xl: 1.5rem;      /* 24px */
--text-3xl: 1.875rem;    /* 30px */
--text-4xl: 2.25rem;     /* 36px */
--text-5xl: 3rem;        /* 48px */
--text-6xl: 3.75rem;     /* 60px */
```

### 2.4 Layout Structure

#### Header
- Logo centralizado artisticamente
- Navegação com links: Início, Shop, Coleções, Sobre, Contato
- Ícone de carrinho com badge de quantidade
- Design flutuante com blur effect

#### Hero Section
- Imagem grande com overlay texturizado (padrão de tricô)
- Título grande com fonte display
- Subtítulo elegante
- CTA button com hover effect especial

#### Product Grid
- Grid responsivo 2/3/4 colunas
- Cards de produtos com:
  - Imagem com hover zoom
  - Nome do produto
  - Preço
  - Badge de categoria
  - Efeito de sombra suave

#### Footer
- Links de navegação
- Informações de contato
- Redes sociais
- Newsletter signup
- Texto institucional bonito

### 2.5 Responsive Breakpoints

```css
--mobile: 480px;
--tablet: 768px;
--desktop: 1024px;
--wide: 1280px;
--ultra-wide: 1536px;
```

### 2.6 Visual Effects & Animations

- **Page Load:** Fade-in suave com stagger em elementos
- **Hover em Cards:** Slight lift + shadow increase
- **Buttons:** Scale subtle + color transition
- **Images:** Parallax effect no hero
- **Scroll:** Elements fade-in on scroll
- **Loading:** Skeleton com shimmer effect
- **Transitions:** 300ms ease-out default

### 2.7 Components

1. **Header** - Navigation + Cart
2. **Hero** - Banner principal
3. **ProductCard** - Card de produto
4. **ProductGrid** - Grid de produtos
5. **CategoryBanner** - Banner de categoria
6. **Footer** - Rodapé completo
7. **Button** - Botões estilizados
8. **Input** - Campos de formulário
9. **CartDrawer** - Carrinho deslizante
10. **Newsletter** - Assinatura de newsletter

---

## 3. Functionality Specification

### 3.1 Pages

1. **Home (/)** - Página principal
2. **Shop (/shop)** - Todos os produtos
3. **Product (/shop/[slug])** - Detalhes do produto
4. **About (/sobre)** - Página sobre
5. **Contact (/contato)** - Página de contato
6. **Cart (/carrinho)** - Página do carrinho

### 3.2 Products Categories

- **Vestuário:** Suéteres, cardigans, blusas, vestidos
- **Acessórios:** Bolsas, chapéus, luvas, cachecóis
- **Decoração:** Almofadas, mantas, tapetes
- **Kits:** Kits para fazer em casa

### 3.3 Features

- Catálogo de produtos com filtro por categoria
- Busca de produtos
- Carrinho de compras persistente (localStorage)
- Página de detalhes do produto
- Imagens de alta qualidade
- Design responsivo
- Animações suaves

### 3.4 Sample Products Data

```json
[
  {
    "id": "1",
    "name": "Cardigan Oversized Tricô",
    "price": 289.90,
    "category": "Vestuário",
    "image": "/products/cardigan.jpg",
    "description": "Cardigan oversized feito em tricô manual..."
  },
  {
    "id": "2", 
    "name": "Bolsa Croché Argola",
    "price": 159.90,
    "category": "Acessórios",
    "image": "/products/bolsa.jpg",
    "description": "Bolsa artesanal em croché com alça argola..."
  }
]
```

---

## 4. Acceptance Criteria

### Visual
- [ ] Cores exatamente como especificadas
- [ ] Fontes carregando corretamente
- [ ] Layout responsivo funcionando
- [ ] Animações suaves sem lag
- [ ] Imagens otimizadas

### Functional
- [ ] Navegação entre todas as páginas
- [ ] Carrinho adicionando/removendo produtos
- [ ] Persistência do carrinho
- [ ] Filtros funcionando
- [ ] Busca funcionando

### Performance
- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] No layout shifts

---

## 5. Technical Stack

- Next.js 14+ (App Router)
- TypeScript
- CSS Modules / CSS Variables
- No external UI libraries (custom components)
- localStorage for cart persistence
