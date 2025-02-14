const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Definições do Swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Seven API",
      version: "1.0.0",
      description: "API para gerenciamento de usuários, produtos e pedidos",
      contact: {
        name: "Suporte",
        email: "suporte@seven.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Servidor Local",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes/*.js"], // Caminho para buscar as definições das rotas
};

// Gerar a especificação do Swagger
const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerSpec, swaggerUi };