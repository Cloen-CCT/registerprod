import * as productsRepository from './products.repository.js';
import * as providersRepository from '../providers/providers.repository.js';

export const getAll = async () => {
  try {
    return await productsRepository.getAll();
  } catch (error) {
    throw error;
  }
};

export const getById = async (id) => {
  try {
    const product = await productsRepository.getById(id);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    return product;
  } catch (error) {
    throw error;
  }
};

export const getByProveedor = async (proveedorId) => {
  try {
    // Verificar si el proveedor existe
    const provider = await providersRepository.getById(proveedorId);
    if (!provider) {
      throw new Error('Proveedor no encontrado');
    }
    
    return await productsRepository.getByProveedor(proveedorId);
  } catch (error) {
    throw error;
  }
};

export const create = async (productData) => {
  try {
    // Verificar si ya existe un producto con el mismo número de serie
    const existingProduct = await productsRepository.getByNumeroSerie(productData.numeroSerie);
    if (existingProduct) {
      throw new Error('Ya existe un producto con este número de serie');
    }
    
    // Verificar si el proveedor existe
    const provider = await providersRepository.getById(productData.proveedor);
    if (!provider) {
      throw new Error('Proveedor no encontrado');
    }
    
    return await productsRepository.create(productData);
  } catch (error) {
    throw error;
  }
};

export const update = async (id, productData) => {
  try {
    // Verificar si el producto existe
    const product = await productsRepository.getById(id);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    
    // Si se está actualizando el número de serie, verificar que no exista otro producto con ese número
    if (productData.numeroSerie && productData.numeroSerie !== product.numeroSerie) {
      const existingProduct = await productsRepository.getByNumeroSerie(productData.numeroSerie);
      if (existingProduct && existingProduct._id.toString() !== id) {
        throw new Error('Ya existe un producto con este número de serie');
      }
    }
    
    // Si se está actualizando el proveedor, verificar que exista
    if (productData.proveedor && productData.proveedor !== product.proveedor.toString()) {
      const provider = await providersRepository.getById(productData.proveedor);
      if (!provider) {
        throw new Error('Proveedor no encontrado');
      }
    }
    
    return await productsRepository.update(id, productData);
  } catch (error) {
    throw error;
  }
};

export const remove = async (id) => {
  try {
    // Verificar si el producto existe
    const product = await productsRepository.getById(id);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    
    return await productsRepository.remove(id);
  } catch (error) {
    throw error;
  }
};

export const getTrazabilidad = async (id) => {
  try {
    const product = await productsRepository.getById(id);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    
    // Construir objeto de trazabilidad
    const trazabilidad = {
      producto: product,
      eventos: [
        {
          tipo: 'Fabricación',
          fecha: product.fechaFabricacion,
          detalles: `Fabricado por ${product.proveedor.nombre}`
        }
      ]
    };
    
    // Agregar evento de registro si existe
    if (product.fechaRegistro) {
      trazabilidad.eventos.push({
        tipo: 'Registro',
        fecha: product.fechaRegistro,
        detalles: `Registrado en ${product.paisRegistro || 'No especificado'}`
      });
    }
    
    return trazabilidad;
  } catch (error) {
    throw error;
  }
};