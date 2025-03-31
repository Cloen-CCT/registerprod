import * as providersService from './providers.service.js';

export const getAll = async (req, res) => {
  try {
    const providers = await providersService.getAll();
    res.json(providers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const provider = await providersService.getById(req.params.id);
    res.json(provider);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const { nombre, codigoFabrica, registroComercial, email, telefono, direccion, pais, contactoPrincipal } = req.body;
    
    // Validar campos requeridos
    if (!nombre || !codigoFabrica || !registroComercial || !email || !telefono || !direccion || !pais || !contactoPrincipal) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }
    
    // Validar formato de email
    const emailRegex = /.+\@.+\..+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Formato de email inválido' });
    }
    
    const newProvider = await providersService.create(req.body);
    res.status(201).json(newProvider);
  } catch (error) {
    if (error.message === 'Ya existe un proveedor con este código de fábrica') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const updatedProvider = await providersService.update(req.params.id, req.body);
    res.json(updatedProvider);
  } catch (error) {
    if (error.message === 'Proveedor no encontrado') {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === 'Ya existe un proveedor con este código de fábrica') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    await providersService.remove(req.params.id);
    res.status(204).send();
  } catch (error) {
    if (error.message === 'Proveedor no encontrado') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};