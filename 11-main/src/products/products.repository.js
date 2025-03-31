import Product from './products.model.js';

export const getAll = async () => {
  try {
    return await Product.find({}).populate('proveedor');
  } catch (error) {
    throw error;
  }
};

export const getById = async (id) => {
  try {
    return await Product.findById(id).populate('proveedor');
  } catch (error) {
    throw error;
  }
};

export const getByProveedor = async (proveedorId) => {
  try {
    return await Product.find({ proveedor: proveedorId }).populate('proveedor');
  } catch (error) {
    throw error;
  }
};

export const create = async (productData) => {
  try {
    const product = new Product(productData);
    return await product.save();
  } catch (error) {
    throw error;
  }
};

export const update = async (id, productData) => {
  try {
    return await Product.findByIdAndUpdate(id, productData, { new: true });
  } catch (error) {
    throw error;
  }
};

export const remove = async (id) => {
  try {
    return await Product.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};

export const getByNumeroSerie = async (numeroSerie) => {
  try {
    return await Product.findOne({ numeroSerie });
  } catch (error) {
    throw error;
  }
};