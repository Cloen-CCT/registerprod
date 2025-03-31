import Router from 'express';
import * as paeController from './pae.controller.js';

const router = Router();

router.get('/', paeController.getAll);
router.post('/', paeController.create);
router.put('/:id', paeController.update);
router.patch('/:id', paeController.patch);
router.get('/:id', paeController.getById);

export default router;

