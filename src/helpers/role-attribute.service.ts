import { BaseController } from "../controllers/baseController";
import { RoleAttribute } from "../models/role_attributes";
import { APIError } from "../utils/apiError.utils";
import { CreateRoleAttributeDTO } from "../types/role-attribute";
import pagination from "../utils/pagination";
import { Role } from "../models/role";
import { Attribute } from "../models/attribute";

class RoleAttributeService extends BaseController {
  async create(createData: CreateRoleAttributeDTO) {
    try {
      let data = await RoleAttribute.create(createData);
      return data;
    } catch (error) {
      throw new APIError(error.message, error.statusCode);
    }
  }

  async findOne(where: any) {
    try {
        const data = await RoleAttribute.findOne({
          ...where,
          include: [
              'role',       
              'attribute'  
          ]
        });
      return data;
    } catch (error) {
      throw new APIError(error.message, error.statusCode);
    }
  }

  async findMany(limit: number, page:number, searchQuery:any) {
    try {

      let data: any = await RoleAttribute.findAndCountAll({
        where: searchQuery,
        limit: limit,
        include: [
            'role',       
            'attribute'  
        ]
      });

      const result = pagination.paginationData(limit, page, data);

      return result;
    } catch (error) {
      console.error("BadgesService getBadgesList", error);
      throw new APIError(error.message, error.statusCode);
    }
  }

  async update(id: string,updateData: CreateRoleAttributeDTO) {
    try {
      return await RoleAttribute.update(updateData, {
        where: { id }
      });
    } catch (error) {
      throw new APIError(error.message, error.statusCode);
    }
  }

  async delete(id: string) {
    try {
      const deleteData = {}

      return await RoleAttribute.update(deleteData, {
        where: { id }
      });
    } catch (error) {
      throw new APIError(error.message, error.statusCode);
    }
  }

   async destroy(id: string) {
    try {
      return await RoleAttribute.destroy({
        where: { id }
      });
    } catch (error) {
      throw new APIError(error.message, error.statusCode);
    }
  }
}

export default new RoleAttributeService();