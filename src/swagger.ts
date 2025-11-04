import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "CoopCred API",
    description: "API RESTful da Cooperativa de Crédito",
    version: "1.0.0",
  },
  tags: [
    {
      name: "Users",
      description: "Gerenciamento de usuários (registro, login, perfil)",
    },
    { name: "Accounts", description: "Contas e saldos" },
    { name: "Transactions", description: "Depósitos, saques e transferências" },
    { name: "Reports", description: "Relatórios e agregações financeiras" },
  ],
  host: "localhost:3000",
  schemes: ["http"],
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description: "Token JWT no formato: Bearer <token>",
    },
  },
  security: [{ bearerAuth: [] }],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = [
  "./src/routes/index.ts",
  "./src/routes/userRoutes.ts",
  "./src/routes/accountRoutes.ts",
  "./src/routes/transactionRoutes.ts",
  "./src/routes/reportRoutes.ts",
];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
