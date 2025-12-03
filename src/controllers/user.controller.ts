import { Request, Response, NextFunction } from "express";

import { BaseController } from "./baseController";
import UserService from "../helpers/user.service";
import bcrypt from "bcryptjs";
import crypto from "crypto";

class UserController extends BaseController {
  async addUser(req: Request, res: Response, next: NextFunction) {
    try {
      let body = req.body;
      const password = crypto
        .randomBytes(10)
        .toString("base64")
        .replace(/[^a-zA-Z]/g, "")
        .slice(0, 10);

      const hashPassword = await bcrypt.hash(password, 10);
      body.password = hashPassword;
      const addusers = await UserService.addUserService(body);
      addusers.data.password = password;

      if (!addusers.status) {
        return this.errors(
          req,
          res,
          this.status.HTTP_BAD_REQUEST,
          this.exceptions.badRequestErr(req, "Failed to add user")
        );
      } else {
        return await this.success(
          req,
          res,
          this.status.HTTP_OK,
          addusers.data,
          "User added successfully"
        );
      }
    } catch (e) {
      console.error("Add user error", e);
      next(e);
    }
  }

  async listUsers(req: Request, res: Response,  next: NextFunction) {
    try {
      console.log("@Profilecontroller @listSubUser");

      const limit = Number(req.query.limit ?? 10);
      const page = Number(req.query.page ?? 1);
      const searchQuery = (req.query.search ?? "").toString();
      const vendorCheck = await UserService.listUsers(limit, page, searchQuery);

      return await this.success(
        req,
        res,
        this.status.HTTP_OK,
        vendorCheck.data,
        "Vendor fetched successfully"
      );
    } catch (error) {
      return await this.errors(
        req,
        res,
        this.status.HTTP_INTERNAL_SERVER_ERROR,
        this.exceptions.internalServerErr(req, error)
      );
    }
  }

}
export default new UserController();
