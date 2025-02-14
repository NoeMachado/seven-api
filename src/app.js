const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const routes = require("./routes");  // ⚠️ Certifique-se de que está importando as rotas corretamente
const { swaggerSpec, swaggerUi } = require("./config/swagger");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

// Rotas principais da API
app.use("/api", routes);  // ⚠️ Confirma que "/api" está realmente apontando para `routes/index.js`

// Documentação Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

console.log("📄 Swagger UI disponível em: http://localhost:3000/api-docs");

module.exports = app;
