import { Router } from "express";
const Attribute = Router();
import attributeController from "../../controllers/attribute.controller";


Attribute.post('/', attributeController.create)

Attribute.get('/:id', attributeController.findOne);

Attribute.get('/', attributeController.findMany);

Attribute.patch('/:id', attributeController.update);

Attribute.delete('/:id', attributeController.delete);



export default Attribute;