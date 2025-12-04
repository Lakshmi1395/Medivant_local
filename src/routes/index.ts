import { Express } from "express";
import healthCheck from "./v1/healthCheck.route";
import users from "./v1/users.routes";
import role from "./v1/role.route";
import attribute from "./v1/attribute.route";
import RoleAttribute from "./v1/role-attribute.route";

const initializeRoutes = (app: Express) => {
  // Routes
  app.use("/api/", healthCheck);
  app.use("/api/user", users);
  app.use("/api/role", role);
  app.use("/api/attribute", attribute);
  app.use("/api/role-attribute", RoleAttribute);
};



export default initializeRoutes;
