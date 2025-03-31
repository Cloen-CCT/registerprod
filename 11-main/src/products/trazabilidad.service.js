import * as trazabilidadRepository from './trazabilidad.repository.js';
import * as productsRepository from './products.repository.js';

export const getByProductId = async (productId) => {
  try {
    // Verificar si el producto existe
    const product = await productsRepository.getById(productId);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    
    // Obtener la trazabilidad
    const trazabilidad = await trazabilidadRepository.getByProductId(productId);
    
    // Si no existe trazabilidad, crear una con el evento de fabricación
    if (!trazabilidad) {
      const newTrazabilidad = {
        producto: productId,
        eventos: [{
          tipo: 'Fabricación',
          fecha: product.fechaFabricacion,
          detalles: `Fabricado por ${product.proveedor.nombre}`
        }]
      };
      
      // Si el producto tiene fecha de registro, añadir ese evento también
      if (product.fechaRegistro) {
        newTrazabilidad.eventos.push({
          tipo: 'Registro',
          fecha: product.fechaRegistro,
          detalles: `Registrado en ${product.paisRegistro || 'No especificado'}`
        });
      }
      
      return await trazabilidadRepository.create(newTrazabilidad);
    }
    
    return trazabilidad;
  } catch (error) {
    throw error;
  }
};

export const addEvento = async (productId, eventoData) => {
  try {
    // Verificar si el producto existe
    const product = await productsRepository.getById(productId);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    
    // Añadir el evento
    return await trazabilidadRepository.addEvento(productId, eventoData);
  } catch (error) {
    throw error;
  }
};

export const getEventosByProductId = async (productId) => {
  try {
    // Verificar si el producto existe
    const product = await productsRepository.getById(productId);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    
    return await trazabilidadRepository.getEventosByProductId(productId);
  } catch (error) {
    throw error;
  }
};

export const removeEvento = async (productId, eventoId) => {
  try {
    // Verificar si el producto existe
    const product = await productsRepository.getById(productId);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    
    return await trazabilidadRepository.removeEvento(productId, eventoId);
  } catch (error) {
    throw error;
  }
};

export const registrarGarantiaExtendida = async (productId, garantiaData) => {
  try {
    // Verificar si el producto existe
    const product = await productsRepository.getById(productId);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    
    // Añadir evento de garantía extendida
    const eventoData = {
      tipo: 'Garantía Extendida',
      fecha: new Date(),
      detalles: `Garantía extendida registrada: ${garantiaData.tipoGarantia} - Válida hasta ${garantiaData.fechaFin.toLocaleDateString()}`
    };
    
    return await trazabilidadRepository.addEvento(productId, eventoData);
  } catch (error) {
    throw error;
  }
};