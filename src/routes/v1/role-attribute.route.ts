import { Router } from "express";
const RoleAttribute = Router();
import roleAttributeController from "../../controllers/role-attribute.controller";


RoleAttribute.post('/', roleAttributeController.create)

RoleAttribute.get('/', roleAttributeController.findMany);

RoleAttribute.get('/:id', roleAttributeController.findOne);

RoleAttribute.patch('/:id', roleAttributeController.update);

RoleAttribute.delete('/:id', roleAttributeController.delete);


export default RoleAttribute;