import { Router } from 'express';
import * as dashboardController from './dashboard.controller.js';

const router = Router();

router.get('/estadisticas', dashboardController.getEstadisticasGenerales);
router.get('/productos-por-proveedor', dashboardController.getProductosPorProveedor);
router.get('/productos-con-garantia', dashboardController.getProductosConGarantia);
router.get('/garantias-por-tipo', dashboardController.getGarantiasPorTipo);
router.get('/eventos-recientes', dashboardController.getEventosRecientes);

export default router;