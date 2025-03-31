import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const EventoSchema = new Schema({
  tipo: {
    type: String,
    required: true,
    enum: ['Fabricación', 'Registro', 'Garantía Extendida', 'Reparación', 'Devolución', 'Otro']
  },
  fecha: {
    type: Date,
    required: true,
    default: Date.now
  },
  detalles: {
    type: String,
    required: false
  },
  ubicacion: {
    type: String,
    required: false
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false
  }
});

const TrazabilidadSchema = new Schema({
  producto: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  eventos: [EventoSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { collection: 'Trazabilidad' });

const Trazabilidad = models.Trazabilidad || model('Trazabilidad', TrazabilidadSchema);

export default Trazabilidad;