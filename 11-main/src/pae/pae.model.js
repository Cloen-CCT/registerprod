import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const PaeSchema = new Schema({
  Lugar: String,
  Zona: String,
  Familia: String,
  Subfamilia: String,
  Codigo: String,
  Color: String,
  Dimensiones: String,
  Material: String,
  Capacidad: String,
  Funciones: String,
  Programas: String,
  PanelDigital: String,
  LCD: String,
  Bluetooth: String,
  Potencia: String,
  Voltaje: String,
  FechaFab: String,
  Proveedor: String,
  Localización: String,
  CódGen: String
}, { collection: 'PAE' });

const Pae = models.Pae || model('Pae', PaeSchema);

export default Pae;
