# DeliveryApp - Sistema de Delivery Completo

Sistema completo de delivery desenvolvido com React, TypeScript, Vite, Tailwind CSS e Lucide React. Inclui funcionalidades para clientes e restaurantes, com autenticação, gerenciamento de produtos, carrinho de compras e pedidos.

## 🚀 Demonstração

### Página de Login
![Login](https://github.com/user-attachments/assets/313f7632-98ac-4694-a46b-147df0a5584f)

### Página Inicial - Cliente
![Home Cliente](https://github.com/user-attachments/assets/ef72b6b2-0681-4d7b-8a41-ebf37d118952)

## ✨ Funcionalidades

### Para Clientes
- ✅ Visualização de produtos com filtros por categoria
- ✅ Busca de produtos por nome/descrição
- ✅ Adicionar produtos ao carrinho
- ✅ Ajustar quantidades no carrinho
- ✅ Finalizar pedidos
- ✅ Visualizar histórico de pedidos
- ✅ Acompanhar status dos pedidos

### Para Restaurantes
- ✅ Dashboard de gerenciamento de produtos
- ✅ CRUD completo de produtos
- ✅ Visualizar pedidos recebidos
- ✅ Atualizar status dos pedidos
- ✅ Controlar disponibilidade de produtos

### Funcionalidades Gerais
- ✅ Autenticação com tipos de usuário (Cliente/Restaurante)
- ✅ Rotas protegidas por tipo de usuário
- ✅ Persistência de dados no localStorage
- ✅ Interface responsiva (mobile-first)
- ✅ Feedback visual para ações do usuário
- ✅ Design moderno com cores personalizadas

## 🛠️ Tecnologias Utilizadas

### Core
- **React 18.3.1** - Biblioteca JavaScript para interfaces
- **TypeScript 5.5.3** - Tipagem estática
- **Vite 5.4.2** - Build tool e dev server
- **React Router DOM 6.22.0** - Roteamento

### Estilização
- **Tailwind CSS 3.4.1** - Framework CSS utilitário
- **PostCSS** e **Autoprefixer** - Processamento CSS

### Ícones e Assets
- **Lucide React 0.344.0** - Biblioteca de ícones

### HTTP Client
- **Axios 1.6.7** - Cliente HTTP (preparado para backend real)

### Qualidade de Código
- **ESLint 8.57.0** - Linter
- **TypeScript ESLint** - Rules específicas para TypeScript

## 📋 Pré-requisitos

- Node.js 18+ 
- npm 9+

## 🔧 Instalação

1. Clone o repositório
```bash
git clone https://github.com/Shidoshi93/delivery-test.git
cd delivery-test
```

2. Instale as dependências
```bash
npm install
```

## 🚀 Como Executar

### Modo Desenvolvimento
```bash
npm run dev
```
O aplicativo estará disponível em `http://localhost:5173`

### Build para Produção
```bash
npm run build
```
Os arquivos otimizados estarão na pasta `dist/`

### Preview da Build
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

## 🔐 Credenciais de Teste

### Cliente
- **Email:** cliente@teste.com
- **Senha:** qualquer senha (sistema mockado)

### Restaurante
- **Email:** restaurante@teste.com
- **Senha:** qualquer senha (sistema mockado)

## 📁 Estrutura do Projeto

```
src/
├── assets/              # Imagens e recursos estáticos
├── components/          # Componentes reutilizáveis
│   ├── common/         # Botões, Inputs, Cards, Modal, etc.
│   ├── layout/         # Header, Footer, Sidebar
│   ├── products/       # ProductCard, ProductList, ProductFilter, ProductForm
│   └── cart/           # CartItem, CartSummary, CartButton
├── contexts/            # Context API providers
│   ├── AuthContext.tsx      # Gerencia autenticação
│   ├── CartContext.tsx      # Gerencia carrinho de compras
│   └── ProductContext.tsx   # Gerencia produtos
├── pages/               # Páginas da aplicação
│   ├── auth/           # Login, Register
│   ├── client/         # Home, Cart, Orders
│   └── restaurant/     # Dashboard, ManageProducts, RestaurantOrders
├── services/            # Serviços de API
│   ├── api.ts                # Configuração do Axios
│   ├── authService.ts        # Serviço de autenticação
│   ├── productService.ts     # Serviço de produtos
│   └── orderService.ts       # Serviço de pedidos
├── types/               # TypeScript interfaces
│   ├── user.ts
│   ├── product.ts
│   ├── order.ts
│   └── cart.ts
├── hooks/               # Custom hooks
│   ├── useAuth.ts
│   ├── useCart.ts
│   └── useProducts.ts
├── utils/               # Funções utilitárias
│   ├── formatters.ts        # Formatação de moeda e data
│   └── validators.ts        # Validação de formulários
├── data/                # Dados mockados
│   └── mockData.ts
├── routes/              # Configuração de rotas
│   ├── AppRoutes.tsx
│   ├── PrivateRoute.tsx
│   └── PublicRoute.tsx
├── App.tsx              # Componente principal
├── main.tsx             # Entry point
└── index.css            # Estilos globais com Tailwind
```

## 🎨 Paleta de Cores

- **Cor Primária (Laranja):** #FF6B00
- **Cor Primária Escura:** #E55D00
- **Cor Primária Clara:** #FF8533
- **Cor de Fundo:** #F5F1E8 (Bege claro)
- **Cor de Card:** #FFFFFF (Branco)

## 🧪 Sistema de Mock

O sistema atualmente utiliza dados mockados para simular um backend. Todos os serviços estão preparados para serem facilmente integrados com uma API real.

### Dados Mockados Incluem:
- 2 usuários (1 cliente e 1 restaurante)
- 8 produtos de exemplo (pizzas, lanches, bebidas e sobremesas)
- Sistema de pedidos funcional

## 🔄 Próximos Passos

- [ ] Integração com backend real (Node.js + Express)
- [ ] Banco de dados (MongoDB ou PostgreSQL)
- [ ] Autenticação JWT real
- [ ] Upload de imagens de produtos
- [ ] Sistema de notificações em tempo real
- [ ] Integração com sistemas de pagamento
- [ ] Cálculo de frete baseado em localização
- [ ] Sistema de avaliações e comentários
- [ ] Painel de analytics para restaurantes
- [ ] Aplicativo mobile (React Native)

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run preview` - Preview da build de produção
- `npm run lint` - Executa o ESLint

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 👨‍💻 Autor

Desenvolvido por [Shidoshi93](https://github.com/Shidoshi93)

---

⭐ Se este projeto foi útil para você, considere dar uma estrela!
