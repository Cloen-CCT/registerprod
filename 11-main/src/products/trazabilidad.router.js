import { Router } from 'express';
import * as trazabilidadController from './trazabilidad.controller.js';

const router = Router();

router.get('/product/:productId', trazabilidadController.getByProductId);
router.get('/product/:productId/eventos', trazabilidadController.getEventosByProductId);
router.post('/product/:productId/evento', trazabilidadController.addEvento);
router.delete('/product/:productId/evento/:eventoId', trazabilidadController.removeEvento);

export default router;