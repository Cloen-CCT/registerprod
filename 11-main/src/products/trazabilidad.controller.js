import * as trazabilidadService from './trazabilidad.service.js';

export const getByProductId = async (req, res) => {
  try {
    const trazabilidad = await trazabilidadService.getByProductId(req.params.productId);
    res.json(trazabilidad);
  } catch (error) {
    if (error.message === 'Producto no encontrado') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

export const addEvento = async (req, res) => {
  try {
    const { tipo, fecha, detalles, ubicacion, usuario } = req.body;
    
    // Validar campos requeridos
    if (!tipo) {
      return res.status(400).json({ message: 'El tipo de evento es requerido' });
    }
    
    const eventoData = { tipo, fecha: fecha || new Date(), detalles, ubicacion, usuario };
    const updatedTrazabilidad = await trazabilidadService.addEvento(req.params.productId, eventoData);
    
    res.status(201).json(updatedTrazabilidad);
  } catch (error) {
    if (error.message === 'Producto no encontrado') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

export const getEventosByProductId = async (req, res) => {
  try {
    const eventos = await trazabilidadService.getEventosByProductId(req.params.productId);
    res.json(eventos);
  } catch (error) {
    if (error.message === 'Producto no encontrado') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

export const removeEvento = async (req, res) => {
  try {
    const updatedTrazabilidad = await trazabilidadService.removeEvento(req.params.productId, req.params.eventoId);
    res.json(updatedTrazabilidad);
  } catch (error) {
    if (error.message === 'Producto no encontrado') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};