import path from "path";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

export const setupSwagger = (app: Express) => {
  // Path to swagger.yaml inside src/swagger/
  const swaggerPath = path.join(__dirname, "swagger.yaml");

  const swaggerDocument = YAML.load(swaggerPath);

  // Dynamic servers section
  swaggerDocument.servers = [
    {
      url: process.env.BASE_URL || `http://localhost:${process.env.PORT || 8000}`,
    },
  ];

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  console.log("📄 Swagger documentation is available");
};
