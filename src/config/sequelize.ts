import { Sequelize } from "sequelize-typescript";
import { dbConfig } from "./dbConfig";
import path from "path";

export const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    dialectOptions: dbConfig.dialectOptions,
    pool: dbConfig.pool,
    // models: [path.join(__dirname, "..", "models", "*.model.{ts,js}")],
  }
);

export const verifyDBConnection = async () => {
  // Verify Database connection
  return await sequelize.authenticate();
};

export const syncDatabase = async () => {
  try {
    sequelize.Sequelize = Sequelize;

    await sequelize.sync({ alter: true }); 
    console.log("📦 Database synced successfully");
  } catch (err) {
    console.error("❌ Database sync failed:", err);
  }
};
