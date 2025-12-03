import { Request, Response } from "express";

import { BaseController } from "./baseController";

interface PingResponse {
  message: string;
}

class HealthCheck extends BaseController {
  /**
   * @description This is healthcheck Api
   * @param req
   * @param res
   * @returns
   */
  async healthCheck(req: any, res: any) {
    try {
      return res.send({ message: "Health check working" });
    } catch (e) {
      console.error("healthCheck", e);
      return res.send({ message: "Health check faile" });
    }
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  async healthCheckData(req: Request, res: Response) {
    try {
      console.log("healthCheckData controller inside");

      console.log("^^^^^^^^^^^^^^ req.body", req.body);
      console.log("^^^^^^^^^^^^^^ req.query", req.query);
      let datas = req.query.data;
      console.log("^^^^^^^^^^^^^^ req.query data", datas);
      return res.send({ message: "Health check data working" });
    } catch (e) {
      console.error(" healthCheckData controller error", e);
      return await this.errors(
        req,
        res,
        this.status.HTTP_INTERNAL_SERVER_ERROR,
        this.exceptions.internalServerErr(req, e)
      );
    }
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  async healthCheckMiddleware(req: any, res: Response) {
    try {
      console.log("healthCheckMiddleware controller inside");

      console.log("^^^^^^^^^^^^^^ req.body", req.body);
      console.log("^^^^^^^^^^^^^^ req.query", req.query);
      console.log("^^^^^^^^^^^^^^ req.query", req.user);

    } catch (e) {
      console.error("healthCheckMiddleware controller error", e);
      return await this.errors(
        req,
        res,
        this.status.HTTP_INTERNAL_SERVER_ERROR,
        this.exceptions.internalServerErr(req, e)
      );
    }
  }
}
export default new HealthCheck();
