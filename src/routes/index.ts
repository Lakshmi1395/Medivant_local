import { Express } from "express";
import healthCheck from "./v1/healthCheck.route";
import users from "./v1/users.routes";

const initializeRoutes = (app: Express) => {
  // Routes
  app.use("/v1", healthCheck);
  app.use("/v1/user", users);
};



export default initializeRoutes;
