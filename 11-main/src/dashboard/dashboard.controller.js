import * as dashboardService from './dashboard.service.js';

export const getEstadisticasGenerales = async (req, res) => {
  try {
    const estadisticas = await dashboardService.getEstadisticasGenerales();
    res.json(estadisticas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductosPorProveedor = async (req, res) => {
  try {
    const productos = await dashboardService.getProductosPorProveedor();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductosConGarantia = async (req, res) => {
  try {
    const productos = await dashboardService.getProductosConGarantia();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getGarantiasPorTipo = async (req, res) => {
  try {
    const garantias = await dashboardService.getGarantiasPorTipo();
    res.json(garantias);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEventosRecientes = async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const eventos = await dashboardService.getEventosRecientes(limit);
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};