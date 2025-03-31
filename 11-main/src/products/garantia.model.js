import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const GarantiaSchema = new Schema({
  producto: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  fechaInicio: {
    type: Date,
    required: true
  },
  fechaFin: {
    type: Date,
    required: true
  },
  tipoGarantia: {
    type: String,
    required: true,
    enum: ['Estándar', 'Extendida', 'Premium']
  },
  cobertura: {
    type: String,
    required: true
  },
  numeroPoliza: {
    type: String,
    required: true,
    unique: true
  },
  activa: {
    type: Boolean,
    default: true
  },
  documentoURL: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { collection: 'Garantias' });

const Garantia = models.Garantia || model('Garantia', GarantiaSchema);

export default Garantia;