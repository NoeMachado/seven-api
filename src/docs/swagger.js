const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Pedidos e Produtos",
      version: "1.0.0",
      description: "Documentação da API usando Swagger",
    },
    servers: [{ url: "http://localhost:3000" }],
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsdoc(options);
module.exports = specs;
