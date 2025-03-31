import Provider from './providers.model.js';

export const getAll = async () => {
  try {
    return await Provider.find({ });
  } catch (error) {
    throw error;
  }
};

export const getById = async (id) => {
  try {
    return await Provider.findById(id);
  } catch (error) {
    throw error;
  }
};

export const create = async (providerData) => {
  try {
    const provider = new Provider(providerData);
    return await provider.save();
  } catch (error) {
    throw error;
  }
};

export const update = async (id, providerData) => {
  try {
    return await Provider.findByIdAndUpdate(id, providerData, { new: true });
  } catch (error) {
    throw error;
  }
};

export const remove = async (id) => {
  try {
    return await Provider.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};

export const getByCodigoFabrica = async (codigoFabrica) => {
  try {
    return await Provider.findOne({ codigoFabrica });
  } catch (error) {
    throw error;
  }
};