import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const ProductSchema = new Schema({
  numeroSerie: {
    type: String,
    required: true,
    unique: true
  },
  tipoProducto: {
    type: String,
    required: true,
    enum: ['Placa de inducción', 'PAE']
  },
  fechaFabricacion: {
    type: Date,
    required: true
  },
  proveedor: {
    type: Schema.Types.ObjectId,
    ref: 'Provider',
    required: true
  },
  paisRegistro: {
    type: String,
    required: false
  },
  usuarioAsociado: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  fechaRegistro: {
    type: Date,
    required: false
  },
  garantiaExtendida: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { collection: 'Products' });

const Product = models.Product || model('Product', ProductSchema);

export default Product;