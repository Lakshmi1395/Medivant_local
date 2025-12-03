// //Env
// import path, { join } from "path";
// import dotenv from "dotenv";
// import { argv } from "process";
// let env = dotenv.config({ path: join(__dirname, "..", `${argv[2]}`) });
// //Middleware npm
// import express from "express";
// import helmet from "helmet";
// import cors from "cors";
// import compression from "compression";
// import bodyParser from "body-parser";
// import { createServer } from "http";
// import { Server } from "socket.io";
// //Middlewares
// import Router from "./routes";
// //Database connection
// import { verifyDBConnection } from "./config/sequelize";
// import Encryption from "./encryption/encrypt";
// import ErrorHandler from "./middleware/errorHandler.middleware";
// import cron from "node-cron";

// const PORT = process.env.PORT;
// const app = express();

// app.use(bodyParser.json({ limit: "50mb" }));
// app.use(express.json({ limit: "50mb" }));
// app.use(express.json());
// app.use(express.static("public"));
// app.use(express.json());
// app.use(express.text());
// app.use(express.raw());
// // app.use(helmet());

// app.use(
//   helmet({
//     crossOriginOpenerPolicy: false,
//     crossOriginEmbedderPolicy: false,
//     originAgentCluster: false,
//   })
// );

// app.use(
//   cors({
//     origin: "*",
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//   })
// );


// app.use(compression());

// //Logger
// // app.use(appLogger.requestDetails(appLogger));

// //Encryption Method
// app.use(async (req: any, res: any, next) => {
//   try {
//     req.start = Date.now();
//     if (process.env.REQ_DECRYPTION == "true") {
//       console.log("REQ_DECRYPTION");
//       await Encryption.decryptReq(req, res);
//     }
//     if (process.env.RES_ENCRYPTION == "true") {
//       console.log("RES_ENCRYPTION");
//       await Encryption.encryptRes(req, res);
//     }

//     if (process.env.REQ_DECRYPTION != "true") {
//       // console.log("REQ_DECRYPTION FALSE");
//       // await Encryption.checkForEncryption(req,res)
//     }

//     next();
//   } catch (e) {
//     console.error("Error in requestDecryption", e);
//   }
// });

// //Router path
// Router(app);
// app.use(ErrorHandler);


// verifyDBConnection()
//   .then(() => {
//     console.log("Database connected successfully");

//     app.listen(PORT, () => {
//       console.log("Server is running on port", PORT);
//     });

//   })
//   .catch((e) => {
//     console.error(e);
//     console.error("Database connection failed");
//     process.exit(1);
//   });



import path, { join } from "path";
import dotenv from "dotenv";
import { argv } from "process";

// Load environment
dotenv.config({ path: join(__dirname, "..", `${argv[2]}`) });

import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";

import Router from "./routes";
import { verifyDBConnection, syncDatabase } from "./config/sequelize";
import { loadModels } from "./config/loadModel";
import Encryption from "./encryption/encrypt";
import ErrorHandler from "./middleware/errorHandler.middleware";
import { setupSwagger } from "./swagger";

const PORT = process.env.PORT || 8000;
const app = express();

/* -----------------------------------------------------
   Middlewares
----------------------------------------------------- */

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("public"));

app.use(
  helmet({
    crossOriginOpenerPolicy: false,
    crossOriginEmbedderPolicy: false,
    originAgentCluster: false,
  })
);

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

app.use(compression());

/* -----------------------------------------------------
   Encryption Layer
----------------------------------------------------- */

app.use(
  async (
    req: Request & { start?: number },
    res: Response,
    next: NextFunction
  ) => {
    try {
      req.start = Date.now();

      if (process.env.REQ_DECRYPTION === "true") {
        await Encryption.decryptReq(req, res);
      }

      if (process.env.RES_ENCRYPTION === "true") {
        await Encryption.encryptRes(req, res);
      }

      next();
    } catch (err) {
      console.error("Error in request encryption/decryption:", err);
      next(err);
    }
  }
);

/* -----------------------------------------------------
   Routes
----------------------------------------------------- */

Router(app);
app.use(ErrorHandler);
setupSwagger(app);

/* -----------------------------------------------------
   DB + Server Init
----------------------------------------------------- */

verifyDBConnection()
  .then(() => {
    console.log("Database connected successfully");
    // Load all models automatically
    loadModels();

    // Sync all tables
    syncDatabase();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed", err);
    process.exit(1);
  });
