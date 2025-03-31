import Product from '../products/products.model.js';
import Provider from '../providers/providers.model.js';
import User from '../users/users.model.js';
import Garantia from '../products/garantia.model.js';
import Trazabilidad from '../products/trazabilidad.model.js';

// Estadísticas generales
export const getEstadisticasGenerales = async () => {
  try {
    const totalProductos = await Product.countDocuments({});
    const totalProveedores = await Provider.countDocuments({});
    const totalUsuarios = await User.countDocuments({ deleted: false });
    const totalGarantias = await Garantia.countDocuments({});
    const garantiasActivas = await Garantia.countDocuments({ activa: true });
    const garantiasExpiradas = await Garantia.countDocuments({
      fechaFin: { $lt: new Date() },
      activa: true
    });
    
    return {
      totalProductos,
      totalProveedores,
      totalUsuarios,
      totalGarantias,
      garantiasActivas,
      garantiasExpiradas
    };
  } catch (error) {
    throw error;
  }
};

// Productos por proveedor
export const getProductosPorProveedor = async () => {
  try {
    const result = await Product.aggregate([
      {
        $group: {
          _id: '$proveedor',
          count: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'Providers',
          localField: '_id',
          foreignField: '_id',
          as: 'proveedorInfo'
        }
      },
      {
        $unwind: '$proveedorInfo'
      },
      {
        $project: {
          proveedor: '$proveedorInfo.nombre',
          count: 1,
          _id: 0
        }
      }
    ]);
    
    return result;
  } catch (error) {
    throw error;
  }
};

// Productos con garantía extendida
export const getProductosConGarantia = async () => {
  try {
    const conGarantia = await Product.countDocuments({ garantiaExtendida: true });
    const sinGarantia = await Product.countDocuments({ garantiaExtendida: false });
    
    return {
      conGarantia,
      sinGarantia
    };
  } catch (error) {
    throw error;
  }
};

// Garantías por tipo
export const getGarantiasPorTipo = async () => {
  try {
    const result = await Garantia.aggregate([
      {
        $group: {
          _id: '$tipoGarantia',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          tipo: '$_id',
          count: 1,
          _id: 0
        }
      }
    ]);
    
    return result;
  } catch (error) {
    throw error;
  }
};

// Eventos de trazabilidad recientes
export const getEventosRecientes = async (limit = 10) => {
  try {
    const result = await Trazabilidad.aggregate([
      { $unwind: '$eventos' },
      { $sort: { 'eventos.fecha': -1 } },
      { $limit: limit },
      {
        $lookup: {
          from: 'Products',
          localField: 'producto',
          foreignField: '_id',
          as: 'productoInfo'
        }
      },
      { $unwind: '$productoInfo' },
      {
        $project: {
          tipo: '$eventos.tipo',
          fecha: '$eventos.fecha',
          detalles: '$eventos.detalles',
          producto: '$productoInfo.numeroSerie',
          _id: 0
        }
      }
    ]);
    
    return result;
  } catch (error) {
    throw error;
  }
};