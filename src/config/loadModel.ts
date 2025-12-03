import { readdirSync } from "fs";
import { join } from "path";

export const loadModels = () => {
  const modelsPath = join(__dirname, "../models");

  const files = readdirSync(modelsPath);

  files
    .filter((file) => file.endsWith(".js") || file.endsWith(".ts"))
    .forEach((file) => {
      require(join(modelsPath, file));
    });
};
