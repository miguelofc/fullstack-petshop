
# 🐾 PetShop Fullstack — Sistema Completo (Angular + Node.js + SQLite + JWT + Swagger)

Sistema completo para gerenciamento de Pets, Tutores, Agendamentos, Serviços, Produtos e Usuários.

Inclui:
- Frontend Angular com PrimeNG e layout inspirado no **Sakai**  
- Backend Node.js com Express  
- Banco SQLite  
- Autenticação JWT  
- Documentação Swagger completa  

## 📌 Tecnologias

### **Frontend**
- Angular 16+
- PrimeNG
- PrimeFlex
- JWT Interceptor
- Componentização modular
- Layout completo com sidebar, topbar e tema dinâmico

### **Backend**
- Node.js + Express
- SQLite3
- bcryptjs (hash de senha)
- jsonwebtoken
- swagger-ui-express
- cors

---

# 📁 Estrutura do Projeto

## **Frontend (/frontend)**

```
src/app/
 ├── auth/                # Login
 ├── core/
 │    └── guards/         # AuthGuard (protege rotas)
 ├── layout/              # Layout principal
 ├── main/
 │    ├── home/           # Tela Home
 │    ├── pets/
 │    ├── tutors/
 │    ├── services/
 │    ├── products/
 │    ├── agendamentos/
 │    └── users/
 └── shared/
```

## **Backend (/backend)**

```
backend/
 ├── db/database.sqlite   # Banco
 ├── models/              # Models
 ├── routes/              # Rotas Express
 ├── swagger.js           # Documentação Swagger
 ├── app.js               # Configuração principal
 └── bin/www              # Start
```

---

# 🔐 Autenticação

✔ Login via `/auth/login`  
✔ Registro via `/auth/register`  
✔ Geração de JWT  
✔ Validação automática de token  
✔ Rotas protegidas com middleware `authenticateToken`

---

# 📖 Swagger

Acesse:

```
http://localhost:3000/api-docs
```

Inclui:
- Auth
- Users
- Pets
- Tutors
- Services
- Products
- Agendamentos
- Esquemas completos
- bearerAuth configurado

---

# ▶ Como Rodar

## Backend

```
cd backend
npm install
npm start
```

## Frontend

```
cd frontend
npm install
npm start
```

---

# 🧪 Testar Registro (Swagger)

```
POST /auth/register
{
  "name": "Miguel",
  "email": "miguel@petshop.com",
  "password": "123456",
  "role": "admin"
}
```

---

# 🧪 Testar Login

```
POST /auth/login
{
  "email": "miguel@petshop.com",
  "password": "123456"
}
```

Retorno:

```
{
  "message": "Login bem-sucedido",
  "token": "JWT_AQUI"
}
```

Use o token no Swagger → **Authorize** → Cole o token

---

# 👤 Listar Usuários (precisa token)

```
GET /users
Authorization: Bearer TOKEN
```

---

# 🎨 Tela Inicial

Frontend exibe:
- Cards modernos
- Navegação lateral
- Dashboard limpo e funcional inspirado no Sakai

---

