import * as providersRepository from './providers.repository.js';

export const getAll = async () => {
  try {
    return await providersRepository.getAll();
  } catch (error) {
    throw error;
  }
};

export const getById = async (id) => {
  try {
    const provider = await providersRepository.getById(id);
    if (!provider) {
      throw new Error('Proveedor no encontrado');
    }
    return provider;
  } catch (error) {
    throw error;
  }
};

export const create = async (providerData) => {
  try {
    // Verificar si ya existe un proveedor con el mismo código de fábrica
    const existingProvider = await providersRepository.getByCodigoFabrica(providerData.codigoFabrica);
    if (existingProvider) {
      throw new Error('Ya existe un proveedor con este código de fábrica');
    }
    
    return await providersRepository.create(providerData);
  } catch (error) {
    throw error;
  }
};

export const update = async (id, providerData) => {
  try {
    // Verificar si el proveedor existe
    const provider = await providersRepository.getById(id);
    if (!provider) {
      throw new Error('Proveedor no encontrado');
    }
    
    // Si se está actualizando el código de fábrica, verificar que no exista otro proveedor con ese código
    if (providerData.codigoFabrica && providerData.codigoFabrica !== provider.codigoFabrica) {
      const existingProvider = await providersRepository.getByCodigoFabrica(providerData.codigoFabrica);
      if (existingProvider && existingProvider._id.toString() !== id) {
        throw new Error('Ya existe un proveedor con este código de fábrica');
      }
    }
    
    return await providersRepository.update(id, providerData);
  } catch (error) {
    throw error;
  }
};

export const remove = async (id) => {
  try {
    // Verificar si el proveedor existe
    const provider = await providersRepository.getById(id);
    if (!provider) {
      throw new Error('Proveedor no encontrado');
    }
    
    return await providersRepository.remove(id);
  } catch (error) {
    throw error;
  }
};