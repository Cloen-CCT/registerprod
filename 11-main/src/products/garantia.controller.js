import * as garantiaService from './garantia.service.js';
import * as trazabilidadService from './trazabilidad.service.js';

export const getAll = async (req, res) => {
  try {
    const garantias = await garantiaService.getAll();
    res.json(garantias);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const garantia = await garantiaService.getById(req.params.id);
    res.json(garantia);
  } catch (error) {
    if (error.message === 'Garantía no encontrada') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

export const getByProductId = async (req, res) => {
  try {
    const garantias = await garantiaService.getByProductId(req.params.productId);
    res.json(garantias);
  } catch (error) {
    if (error.message === 'Producto no encontrado') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const { producto, fechaInicio, fechaFin, tipoGarantia, cobertura, numeroPoliza, documentoURL } = req.body;
    
    // Validar campos requeridos
    if (!producto || !fechaInicio || !fechaFin || !tipoGarantia || !cobertura || !numeroPoliza) {
      return res.status(400).json({ message: 'Todos los campos son requeridos excepto documentoURL' });
    }
    
    const newGarantia = await garantiaService.create(req.body);
    
    // Registrar evento en la trazabilidad
    await trazabilidadService.registrarGarantiaExtendida(producto, newGarantia);
    
    res.status(201).json(newGarantia);
  } catch (error) {
    if (error.message === 'Producto no encontrado' || 
        error.message === 'Ya existe una garantía con este número de póliza') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const updatedGarantia = await garantiaService.update(req.params.id, req.body);
    res.json(updatedGarantia);
  } catch (error) {
    if (error.message === 'Garantía no encontrada') {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === 'Ya existe una garantía con este número de póliza') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    await garantiaService.remove(req.params.id);
    res.status(204).send();
  } catch (error) {
    if (error.message === 'Garantía no encontrada') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

export const getActiveGarantias = async (req, res) => {
  try {
    const garantias = await garantiaService.getActiveGarantias();
    res.json(garantias);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getExpiredGarantias = async (req, res) => {
  try {
    const garantias = await garantiaService.getExpiredGarantias();
    res.json(garantias);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};