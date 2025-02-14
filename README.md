# 🏥 Seven API - Sistema de Usuários, Pedidos e Produtos

Seven API é uma API RESTful desenvolvida em **Node.js com Express** para gerenciar um sistema de **usuários, pedidos e produtos**. 

Ela inclui **CRUD de usuários, produtos e pedidos**, além de **autenticação JWT, validação de dados, testes automatizados e documentação com Swagger**.

## 🚀 Tecnologias Utilizadas

- **Node.js + Express** - Backend rápido e modular
- **MySQL + Prisma ORM** - Banco de dados relacional moderno
- **JWT (JSON Web Token)** - Autenticação segura
- **Docker + Docker Compose** - Deploy facilitado
- **Swagger (OpenAPI)** - Documentação interativa da API
- **Jest + Supertest** - Testes automatizados

---

## 📦 Instalação e Configuração

### 1. Clone o repositório

```sh
git clone https://github.com/seuusuario/seven-api.git
cd seven-api

### 2. Instale as dependências

yarn install


### 3. Configure as variáveis de ambiente (.env)

DATABASE_URL="mysql://user:password@db:3306/mydb"
JWT_SECRET="seusegredoaqui"
PORT=3000

### 4. Suba o ambiente com Docker

docker-compose up -d

### 5. Rodar as migrações do banco de dados

docker exec -it my_api yarn prisma migrate dev --name init

### 6. Iniciar o servidor em modo desenvolvimento

yarn dev


📜 Documentação da API (Swagger)
Após iniciar a API, acesse a documentação interativa:

📌 Swagger UI: http://localhost:3000/api-docs

A documentação inclui exemplos de requisições e respostas para cada endpoint.

🔑 Autenticação
A API utiliza JWT (JSON Web Token) para autenticação. Após fazer login, inclua o token no cabeçalho das requisições protegidas:

Authorization: Bearer SEU_TOKEN_AQUI


🔹 Criar um usuário (POST /api/users/register)

{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "123456"
}


🔹 Fazer login (POST /api/users/login)

{
  "email": "joao@example.com",
  "password": "123456"
}

Resposta:

{
  "token": "seu_token_jwt"
}


🛍️ Endpoints Principais
🧑 Usuários
POST /api/users/register - Criar um novo usuário
POST /api/users/login - Fazer login e obter um token JWT
GET /api/users - Listar todos os usuários (🔒 autenticado)
GET /api/users/:id - Buscar um usuário pelo ID (🔒 autenticado)
PUT /api/users/:id - Atualizar um usuário (🔒 autenticado)
DELETE /api/users/:id - Remover um usuário (🔒 autenticado)
🛒 Produtos
POST /api/products - Criar um novo produto (🔒 autenticado)
GET /api/products - Listar todos os produtos
GET /api/products/:id - Buscar um produto pelo ID
PUT /api/products/:id - Atualizar um produto (🔒 autenticado)
DELETE /api/products/:id - Remover um produto (🔒 autenticado)

Exemplo de criação de produto (POST /api/products)


  "name": "Perfume X",
  "description": "Um perfume exclusivo e marcante",
  "price": 199.99,
  "stock": 10
}
📦 Pedidos
POST /api/orders - Criar um novo pedido (🔒 autenticado)
GET /api/orders - Listar todos os pedidos do usuário autenticado (🔒 autenticado)
GET /api/orders/:id - Buscar um pedido pelo ID (🔒 autenticado)
PUT /api/orders/:id - Atualizar o status do pedido (🔒 autenticado)
DELETE /api/orders/:id - Remover um pedido (🔒 autenticado)
Exemplo de criação de pedido (POST /api/orders)

{
  "products": [
    { "productId": "123e4567-e89b-12d3-a456-426614174000", "quantity": 2 },
    { "productId": "123e4567-e89b-12d3-a456-426614174001", "quantity": 1 }
  ]
}

✅ Testes Automatizados
Os testes utilizam Jest + Supertest. Para rodar os testes:

yarn test
Isso valida o funcionamento do CRUD de usuários, produtos e pedidos.

🏗 Arquitetura do Projeto
A API segue uma estrutura modular e escalável:

/src
│── /config        # Configurações globais (DB, JWT, Swagger, etc.)
│── /controllers   # Controladores (lógica de negócios)
│── /routes        # Rotas da API separadas por entidade
│── /middlewares   # Middlewares (autenticação, validação, etc.)
│── /tests         # Testes automatizados (Jest e Supertest)
│── /docs          # Documentação Swagger/OpenAPI
│── app.js         # Configuração principal do Express
│── server.js      # Inicialização do servidor
O Prisma ORM é usado para modelagem do banco de dados, e Docker facilita a execução do projeto.

