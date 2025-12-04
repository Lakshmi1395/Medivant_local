import { BaseController } from "../controllers/baseController";
import { Role } from "../models/role";
import { APIError } from "../utils/apiError.utils";
import { CreateRoleDTO } from "../types/role";
import pagination from "../utils/pagination";

class RoleService extends BaseController {
  async create(createData: CreateRoleDTO) {
    try {
      let data = await Role.create(createData);
      return data;
    } catch (error) {
      throw new APIError(error.message, error.statusCode);
    }
  }

  async findOne(where: any) {
    try {
      let data = await Role.findOne(where);
      return data;
    } catch (error) {
      throw new APIError(error.message, error.statusCode);
    }
  }

  async findMany(limit: number, page:number, searchQuery:any) {
    try {

      let data: any = await Role.findAndCountAll({
        where: searchQuery,
        limit: limit,
      });

      const result = pagination.paginationData(limit, page, data);

      return result;
    } catch (error) {
      console.error("BadgesService getBadgesList", error);
      throw new APIError(error.message, error.statusCode);
    }
  }

  async update(id: string,updateData: CreateRoleDTO) {
    try {
      return await Role.update(updateData, {
        where: { id }
      });
    } catch (error) {
      throw new APIError(error.message, error.statusCode);
    }
  }

  async delete(id: string) {
    try {
      const deleteData = {
          is_deleted: true,
          deleted_at: new Date()
      }

      return await Role.update(deleteData, {
        where: { id }
      });
    } catch (error) {
      throw new APIError(error.message, error.statusCode);
    }
  }
}

export default new RoleService();