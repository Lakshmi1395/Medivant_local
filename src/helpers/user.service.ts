import { BaseController } from "../controllers/baseController";
import { Users } from "../models/users";
import { APIError } from "../utils/apiError.utils";
import { CreateUserDTO } from "../types/user";
import { Op } from "sequelize";
import pagination from "../utils/pagination";

class UserService extends BaseController {
  async addUserService(body: CreateUserDTO) {
    try {
      let data = await Users.create(body);
      return {status: true, data: data  };
    } catch (error) {
      throw new APIError(error.message, error.statusCode);
    }
  }

  async listUsers(limit: number, page:number, searchQuery:string) {
    console.log("@UserService @listUsers");
    try {
      
      let searchCondition = {};

      // search query
      if (searchQuery) {
        searchCondition = {
          [Op.or]: [
            { name: { [Op.like]: `%${searchQuery}%` } },
            { email: { [Op.like]: `%${searchQuery}%` } },
          ],
        };
      }

      // handle payload
      let payload: any = {
        ...searchCondition,
        is_deleted: false,
      };

      let data: any = await Users.findAndCountAll({
        where: payload,
        limit: limit,
        attributes: [
          "id",
          "name",
          "email",
          "role_id",
          "department",
          "phone",
          "is_active",
        ],
      });

      const result = pagination.paginationData(limit, page, data);

      return {
        status: true,
        data: result,
      };
    } catch (error) {
      console.error("BadgesService getBadgesList", error);
      throw new APIError(error.message, error.statusCode);
    }
  }
}

export default new UserService();