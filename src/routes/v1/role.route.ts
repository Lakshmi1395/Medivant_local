import { Router } from "express";
const role = Router();
import roleController from "../../controllers/role.controller";


role.post('/', roleController.create)

role.get('/:id', roleController.findOne);

role.get('/', roleController.findMany);

role.patch('/:id', roleController.update);

role.delete('/:id', roleController.delete);



export default role;