import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const ProviderSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  codigoFabrica: {
    type: String,
    required: true,
    unique: true
  },
  registroComercial: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/
  },
  telefono: {
    type: String,
    required: true
  },
  direccion: {
    type: String,
    required: true
  },
  pais: {
    type: String,
    required: true
  },
  contactoPrincipal: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { collection: 'Providers' });

const Provider = models.Provider || model('Provider', ProviderSchema);

export default Provider;