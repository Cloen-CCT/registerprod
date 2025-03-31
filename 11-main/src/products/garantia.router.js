import { Router } from 'express';
import * as garantiaController from './garantia.controller.js';

const router = Router();

router.get('/', garantiaController.getAll);
router.get('/active', garantiaController.getActiveGarantias);
router.get('/expired', garantiaController.getExpiredGarantias);
router.get('/:id', garantiaController.getById);
router.get('/product/:productId', garantiaController.getByProductId);
router.post('/', garantiaController.create);
router.put('/:id', garantiaController.update);
router.delete('/:id', garantiaController.remove);

export default router;