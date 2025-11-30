const swaggerUi = require('swagger-ui-express');

/**
 * SWAGGER COMPLETO DA API PETSHOP
 * Inclui AUTH, USERS, PETS, TUTORS, SERVICES, PRODUCTS, AGENDAMENTOS
 */
const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "API PetShop Fullstack",
    version: "1.0.0",
    description:
      "API REST do sistema PetShop com autenticação JWT e CRUD completo: pets, tutores, serviços, produtos e agendamentos.",
  },

  servers: [
    {
      url: "http://localhost:3000",
      description: "Servidor Local",
    },
  ],

  // -----------------------------------------------------
  // SECURITY
  // -----------------------------------------------------
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },

    // -----------------------------------------------------
    // SCHEMAS (MODELOS DAS ENTIDADES)
    // -----------------------------------------------------
    schemas: {
      LoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", example: "admin@petshop.com" },
          password: { type: "string", example: "123456" },
        },
      },

      LoginResponse: {
        type: "object",
        properties: {
          token: { type: "string" },
        },
      },

      RegisterRequest: {
        type: "object",
        required: ["nome", "email", "senha"],
        properties: {
          nome: { type: "string", example: "Administrador" },
          email: { type: "string", example: "admin@petshop.com" },
          senha: { type: "string", example: "123456" },
          role: { type: "string", example: "admin" },
        },
      },

      User: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          nome: { type: "string" },
          email: { type: "string" },
          role: { type: "string" },
        },
      },

      Tutor: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          nome: { type: "string", example: "João Silva" },
          telefone: { type: "string", example: "(81) 99999-9999" },
          email: { type: "string", example: "joao@email.com" },
          endereco: { type: "string", example: "Rua Tal, Centro" },
        },
      },

      Pet: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          nome: { type: "string", example: "Rex" },
          especie: { type: "string", example: "Cachorro" },
          raca: { type: "string", example: "Pitbull" },
          sexo: { type: "string", example: "Macho" },
          idade: { type: "integer", example: 3 },
          tutorId: { type: "integer", example: 1 },
        },
      },

      Service: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          nome: { type: "string" },
          descricao: { type: "string" },
          preco: { type: "number", example: 79.9 },
        },
      },

      Product: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          nome: { type: "string" },
          descricao: { type: "string" },
          preco: { type: "number", example: 199.9 },
          estoque: { type: "integer", example: 10 },
        },
      },

      Agendamento: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          petId: { type: "integer" },
          tutorId: { type: "integer" },
          serviceId: { type: "integer" },
          data: { type: "string", example: "2024-11-26" },
          hora: { type: "string", example: "14:30" },
        },
      },

      ErrorResponse: {
        type: "object",
        properties: {
          error: { type: "boolean", example: true },
          message: { type: "string", example: "Erro inesperado" },
        },
      },
    },
  },

  // -----------------------------------------------------
  // TAGS — para organizar no Swagger
  // -----------------------------------------------------
  tags: [
    { name: "Auth", description: "Login e registro" },
    { name: "Users", description: "Usuários do sistema" },
    { name: "Tutors", description: "Tutores dos pets" },
    { name: "Pets", description: "Pets cadastrados" },
    { name: "Services", description: "Serviços prestados" },
    { name: "Products", description: "Produtos vendidos" },
    { name: "Agendamentos", description: "Agendamentos do pet" },
  ],

  // -----------------------------------------------------
  // ROTAS
  // -----------------------------------------------------
  paths: {
    // ---------------- AUTH ----------------
    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login do usuário",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginRequest" },
            },
          },
        },
        responses: {
          200: {
            description: "Login realizado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/LoginResponse" },
              },
            },
          },
          401: { description: "Credenciais inválidas" },
        },
      },
    },

    "/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Registrar novo usuário",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/RegisterRequest" },
            },
          },
        },
        responses: {
          201: { description: "Usuário criado" },
          400: { description: "Email já cadastrado" },
        },
      },
    },

    // ---------------- USERS ----------------
    "/users": {
      get: {
        tags: ["Users"],
        summary: "Listar usuários",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Lista de usuários" },
        },
      },
    },

    // ---------------- TUTORS ----------------
    "/tutors": {
      get: {
        tags: ["Tutors"],
        summary: "Listar tutores",
        security: [{ bearerAuth: [] }],
      },
      post: {
        tags: ["Tutors"],
        summary: "Criar tutor",
        security: [{ bearerAuth: [] }],
      },
    },
    "/tutors/{id}": {
      get: {
        tags: ["Tutors"],
        summary: "Obter tutor por ID",
        security: [{ bearerAuth: [] }],
      },
      put: {
        tags: ["Tutors"],
        summary: "Atualizar tutor",
        security: [{ bearerAuth: [] }],
      },
      delete: {
        tags: ["Tutors"],
        summary: "Excluir tutor",
        security: [{ bearerAuth: [] }],
      },
    },

    // ---------------- PETS ----------------
    "/pets": {
      get: {
        tags: ["Pets"],
        summary: "Listar pets",
        security: [{ bearerAuth: [] }],
      },
      post: {
        tags: ["Pets"],
        summary: "Criar pet",
        security: [{ bearerAuth: [] }],
      },
    },
    "/pets/{id}": {
      get: { tags: ["Pets"], security: [{ bearerAuth: [] }] },
      put: { tags: ["Pets"], security: [{ bearerAuth: [] }] },
      delete: { tags: ["Pets"], security: [{ bearerAuth: [] }] },
    },

    // ---------------- SERVICES ----------------
    "/services": {
      get: { tags: ["Services"], security: [{ bearerAuth: [] }] },
      post: { tags: ["Services"], security: [{ bearerAuth: [] }] },
    },
    "/services/{id}": {
      get: { tags: ["Services"], security: [{ bearerAuth: [] }] },
      put: { tags: ["Services"], security: [{ bearerAuth: [] }] },
      delete: { tags: ["Services"], security: [{ bearerAuth: [] }] },
    },

    // ---------------- PRODUCTS ----------------
    "/products": {
      get: { tags: ["Products"], security: [{ bearerAuth: [] }] },
      post: { tags: ["Products"], security: [{ bearerAuth: [] }] },
    },
    "/products/{id}": {
      get: { tags: ["Products"], security: [{ bearerAuth: [] }] },
      put: { tags: ["Products"], security: [{ bearerAuth: [] }] },
      delete: { tags: ["Products"], security: [{ bearerAuth: [] }] },
    },

    // ---------------- AGENDAMENTOS ----------------
    "/agendamentos": {
      get: { tags: ["Agendamentos"], security: [{ bearerAuth: [] }] },
      post: { tags: ["Agendamentos"], security: [{ bearerAuth: [] }] },
    },
    "/agendamentos/{id}": {
      get: { tags: ["Agendamentos"], security: [{ bearerAuth: [] }] },
      put: { tags: ["Agendamentos"], security: [{ bearerAuth: [] }] },
      delete: { tags: ["Agendamentos"], security: [{ bearerAuth: [] }] },
    },
  },
};

module.exports = { swaggerUi, swaggerSpec };