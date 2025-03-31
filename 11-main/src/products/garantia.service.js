import * as garantiaRepository from './garantia.repository.js';
import * as productsRepository from './products.repository.js';

export const getAll = async () => {
  try {
    return await garantiaRepository.getAll();
  } catch (error) {
    throw error;
  }
};

export const getById = async (id) => {
  try {
    const garantia = await garantiaRepository.getById(id);
    if (!garantia) {
      throw new Error('Garantía no encontrada');
    }
    return garantia;
  } catch (error) {
    throw error;
  }
};

export const getByProductId = async (productId) => {
  try {
    // Verificar si el producto existe
    const product = await productsRepository.getById(productId);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    
    return await garantiaRepository.getByProductId(productId);
  } catch (error) {
    throw error;
  }
};

export const create = async (garantiaData) => {
  try {
    // Verificar si el producto existe
    const product = await productsRepository.getById(garantiaData.producto);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    
    // Verificar si ya existe una garantía con el mismo número de póliza
    const existingGarantia = await garantiaRepository.getByNumeroPoliza(garantiaData.numeroPoliza);
    if (existingGarantia) {
      throw new Error('Ya existe una garantía con este número de póliza');
    }
    
    // Crear la garantía
    const newGarantia = await garantiaRepository.create(garantiaData);
    
    // Actualizar el producto para marcar que tiene garantía extendida
    await productsRepository.update(garantiaData.producto, { garantiaExtendida: true });
    
    return newGarantia;
  } catch (error) {
    throw error;
  }
};

export const update = async (id, garantiaData) => {
  try {
    // Verificar si la garantía existe
    const garantia = await garantiaRepository.getById(id);
    if (!garantia) {
      throw new Error('Garantía no encontrada');
    }
    
    // Si se está actualizando el número de póliza, verificar que no exista otra garantía con ese número
    if (garantiaData.numeroPoliza && garantiaData.numeroPoliza !== garantia.numeroPoliza) {
      const existingGarantia = await garantiaRepository.getByNumeroPoliza(garantiaData.numeroPoliza);
      if (existingGarantia && existingGarantia._id.toString() !== id) {
        throw new Error('Ya existe una garantía con este número de póliza');
      }
    }
    
    return await garantiaRepository.update(id, garantiaData);
  } catch (error) {
    throw error;
  }
};

export const remove = async (id) => {
  try {
    // Verificar si la garantía existe
    const garantia = await garantiaRepository.getById(id);
    if (!garantia) {
      throw new Error('Garantía no encontrada');
    }
    
    // Eliminar la garantía
    const result = await garantiaRepository.remove(id);
    
    // Verificar si el producto tiene otras garantías activas
    const otrasGarantias = await garantiaRepository.getByProductId(garantia.producto);
    if (otrasGarantias.length === 0) {
      // Si no hay más garantías, actualizar el producto
      await productsRepository.update(garantia.producto, { garantiaExtendida: false });
    }
    
    return result;
  } catch (error) {
    throw error;
  }
};

export const getActiveGarantias = async () => {
  try {
    return await garantiaRepository.getActiveGarantias();
  } catch (error) {
    throw error;
  }
};

export const getExpiredGarantias = async () => {
  try {
    return await garantiaRepository.getExpiredGarantias();
  } catch (error) {
    throw error;
  }
};