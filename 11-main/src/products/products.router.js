import { Router } from 'express';
import * as productsController from './products.controller.js';

const router = Router();

router.get('/', productsController.getAll);
router.get('/:id', productsController.getById);
router.get('/proveedor/:proveedorId', productsController.getByProveedor);
router.post('/', productsController.create);
router.put('/:id', productsController.update);
router.delete('/:id', productsController.remove);
router.get('/trazabilidad/:id', productsController.getTrazabilidad);

export default router;