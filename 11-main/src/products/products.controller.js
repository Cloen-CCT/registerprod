import * as productsService from './products.service.js';

export const getAll = async (req, res) => {
  try {
    const products = await productsService.getAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const product = await productsService.getById(req.params.id);
    res.json(product);
  } catch (error) {
    if (error.message === 'Producto no encontrado') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

export const getByProveedor = async (req, res) => {
  try {
    const products = await productsService.getByProveedor(req.params.proveedorId);
    res.json(products);
  } catch (error) {
    if (error.message === 'Proveedor no encontrado') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const { numeroSerie, tipoProducto, fechaFabricacion, proveedor } = req.body;
    
    // Validar campos requeridos
    if (!numeroSerie || !tipoProducto || !fechaFabricacion || !proveedor) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }
    
    const newProduct = await productsService.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    if (error.message === 'Ya existe un producto con este número de serie' || 
        error.message === 'Proveedor no encontrado') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const updatedProduct = await productsService.update(req.params.id, req.body);
    res.json(updatedProduct);
  } catch (error) {
    if (error.message === 'Producto no encontrado') {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === 'Ya existe un producto con este número de serie' || 
        error.message === 'Proveedor no encontrado') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    await productsService.remove(req.params.id);
    res.status(204).send();
  } catch (error) {
    if (error.message === 'Producto no encontrado') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

export const getTrazabilidad = async (req, res) => {
  try {
    const trazabilidad = await productsService.getTrazabilidad(req.params.id);
    res.json(trazabilidad);
  } catch (error) {
    if (error.message === 'Producto no encontrado') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};