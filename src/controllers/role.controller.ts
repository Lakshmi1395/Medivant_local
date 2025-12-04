import { Request} from "express";
import { asyncHandler } from "../utils/async-handler";
import RoleService from "../helpers/role.service";
import { Op } from "sequelize";

class roleController {

    create = asyncHandler(async (req: Request) => {
        const values = req.body;
        const createData = {
            name: values.name,
            description: values.description ?? null,
        }

        return await RoleService.create(createData);
    });

    findOne = asyncHandler(async (req: Request) => {
        const id = req.params.id;
        const data = await RoleService.findOne({ where: { id } });

        if (!data) {
            throw new Error("Record not found")
        }
        return data;
    });

    findMany = asyncHandler(async (req: Request) => {
        const limit = Number(req.query.limit ?? 10);
        const page = Number(req.query.page ?? 1);
        const searchQuery: any = {
            is_deleted: false,
        };

        if(req.query.search){
            const q = `%${req.query.search}%`;
            searchQuery[Op.or] = [
                { name: { [Op.iLike ?? Op.like]: q } }, 
                { description: { [Op.iLike ?? Op.like]: q } },
            ];
        }
        return await RoleService.findMany(limit, page,searchQuery);
    });

    update = asyncHandler(async (req: Request) => {
        const id = req.params.id;
        const body = req.body;

        let data = await RoleService.findOne({ where: { id } });
        if (!data) {
            throw new Error("Record not found");
        }
        const updateData = {
            ...body,
            updated_at: new Date()
        }
        return await RoleService.update(id,updateData);
    });

    delete = asyncHandler(async (req: Request) => {
        const id = req.params.id;

        const data = await RoleService.findOne({ where: { id } });
        if (!data) {
            throw new Error("Record not found");
        }

        return await RoleService.delete(id);
    });
}


export default new roleController();