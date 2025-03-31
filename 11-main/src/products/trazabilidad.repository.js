import Trazabilidad from './trazabilidad.model.js';

export const getByProductId = async (productId) => {
  try {
    return await Trazabilidad.findOne({ producto: productId }).populate('producto').populate('eventos.usuario');
  } catch (error) {
    throw error;
  }
};

export const create = async (trazabilidadData) => {
  try {
    const trazabilidad = new Trazabilidad(trazabilidadData);
    return await trazabilidad.save();
  } catch (error) {
    throw error;
  }
};

export const addEvento = async (productId, eventoData) => {
  try {
    let trazabilidad = await Trazabilidad.findOne({ producto: productId });
    
    // Si no existe trazabilidad para este producto, crearla
    if (!trazabilidad) {
      trazabilidad = new Trazabilidad({
        producto: productId,
        eventos: []
      });
    }
    
    // Añadir el nuevo evento
    trazabilidad.eventos.push(eventoData);
    
    return await trazabilidad.save();
  } catch (error) {
    throw error;
  }
};

export const getEventosByProductId = async (productId) => {
  try {
    const trazabilidad = await Trazabilidad.findOne({ producto: productId });
    return trazabilidad ? trazabilidad.eventos : [];
  } catch (error) {
    throw error;
  }
};

export const removeEvento = async (productId, eventoId) => {
  try {
    return await Trazabilidad.findOneAndUpdate(
      { producto: productId },
      { $pull: { eventos: { _id: eventoId } } },
      { new: true }
    );
  } catch (error) {
    throw error;
  }
};