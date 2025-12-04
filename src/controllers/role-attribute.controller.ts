 import { Request} from "express";
 import { asyncHandler } from "../utils/async-handler";
 import RoleAttributeService from "../helpers/role-attribute.service";
 import { Op } from "sequelize";
 
 class roleAttributeController {
 
     create = asyncHandler(async (req: Request) => {
         const values = req.body;
         const createData = {
             role_id: values.role_id,
             attribute_id: values.attribute_id,
         }
 
         return await RoleAttributeService.create(createData);
     });
 
     findOne = asyncHandler(async (req: Request) => {
         const id = req.params.id;
         const data = await RoleAttributeService.findOne({ where: { id } });
 
         if (!data) {
             throw new Error("Record not found")
         }
         return data;
     });
 
     findMany = asyncHandler(async (req: Request) => {
         const limit = Number(req.query.limit ?? 10);
         const page = Number(req.query.page ?? 1);
        //  const searchQuery: any = {
        //      is_deleted: false,
        //  };
 
        //  if(req.query.search){
        //      const q = `%${req.query.search}%`;
        //      searchQuery[Op.or] = [
        //          { name: { [Op.iLike ?? Op.like]: q } }, 
        //          { description: { [Op.iLike ?? Op.like]: q } },
        //      ];
        //  }
         return await RoleAttributeService.findMany(limit, page, {});
     });
 
     update = asyncHandler(async (req: Request) => {
         const id = req.params.id;
         const body = req.body;
 
         let data = await RoleAttributeService.findOne({ where: { id } });
         if (!data) {
             throw new Error("Record not found");
         }
         const updateData = {
             ...body,
             updated_at: new Date()
         }
         return await RoleAttributeService.update(id,updateData);
     });
 
     delete = asyncHandler(async (req: Request) => {
         const id = req.params.id;
 
         const data = await RoleAttributeService.findOne({ where: { id } });
         if (!data) {
             throw new Error("Record not found");
         }
 
         return await RoleAttributeService.destroy(id);
     });
 }
 
 
 export default new roleAttributeController();