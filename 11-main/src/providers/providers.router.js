import { Router } from 'express';
import * as providersController from './providers.controller.js';

const router = Router();

router.get('/', providersController.getAll);
router.get('/:id', providersController.getById);
router.post('/', providersController.create);
router.put('/:id', providersController.update);
router.delete('/:id', providersController.remove);

export default router;