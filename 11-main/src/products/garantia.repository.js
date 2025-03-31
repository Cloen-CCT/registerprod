import Garantia from './garantia.model.js';

export const getAll = async () => {
  try {
    return await Garantia.find({}).populate('producto');
  } catch (error) {
    throw error;
  }
};

export const getById = async (id) => {
  try {
    return await Garantia.findById(id).populate('producto');
  } catch (error) {
    throw error;
  }
};

export const getByProductId = async (productId) => {
  try {
    return await Garantia.find({ producto: productId }).populate('producto');
  } catch (error) {
    throw error;
  }
};

export const getByNumeroPoliza = async (numeroPoliza) => {
  try {
    return await Garantia.findOne({ numeroPoliza }).populate('producto');
  } catch (error) {
    throw error;
  }
};

export const create = async (garantiaData) => {
  try {
    const garantia = new Garantia(garantiaData);
    return await garantia.save();
  } catch (error) {
    throw error;
  }
};

export const update = async (id, garantiaData) => {
  try {
    return await Garantia.findByIdAndUpdate(id, garantiaData, { new: true });
  } catch (error) {
    throw error;
  }
};

export const remove = async (id) => {
  try {
    return await Garantia.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};

export const getActiveGarantias = async () => {
  try {
    return await Garantia.find({ activa: true }).populate('producto');
  } catch (error) {
    throw error;
  }
};

export const getExpiredGarantias = async () => {
  try {
    const currentDate = new Date();
    return await Garantia.find({
      fechaFin: { $lt: currentDate },
      activa: true
    }).populate('producto');
  } catch (error) {
    throw error;
  }
};