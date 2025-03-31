import * as paeService from './pae.service.js';
import mongoose from 'mongoose';

export async function create(req, res) {
  try {
    const { Lugar, Zona, Familia, Subfamilia, Codigo, Color, Dimensiones, Material, Capacidad, Funciones, Programas, PanelDigital, LCD, Bluetooth, Potencia, Voltaje, FechaFab, Proveedor, Localizacion } = req.body;

    if (!Lugar || !Zona || !Familia || !Subfamilia || !Codigo || !Color || !Dimensiones || !Material || !Capacidad || !Funciones || !Programas || !PanelDigital || !LCD || !Bluetooth || !Potencia || !Voltaje || !FechaFab || !Proveedor || !Localizacion) {
      return res.status(400).json({ error: "Faltan campos necesarios." });
    }

    const newPae = await paeService.create(req.body);
    res.json(newPae);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}

export async function getAll(req, res) {
  try {
    const paes = await paeService.getAll();
    res.json(paes);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}

export async function update(req, res) {
  const { id } = req.params;
  const { Lugar, Zona, Familia, Subfamilia, Codigo, Color, Dimensiones, Material, Capacidad, Funciones, Programas, PanelDigital, LCD, Bluetooth, Potencia, Voltaje, FechaFab, Proveedor, Localizacion, CódGen } = req.body;

  if (!Lugar || !Zona || !Familia || !Subfamilia || !Codigo || !Color || !Dimensiones || !Material || !Capacidad || !Funciones || !Programas || !PanelDigital || !LCD || !Bluetooth || !Potencia || !Voltaje || !FechaFab || !Proveedor || !Localizacion) {
    return res.status(400).json({ error: "Faltan campos necesarios." });
  }

  const updatedPae = await paeService.update(id, req.body);
  res.json(updatedPae);
}

export async function patch(req, res) {
  const { id } = req.params;
  const updatedFields = req.body;

  const updatedPae = await paeService.patch(id, updatedFields);
  res.json(updatedPae);
}

export async function getById(req, res) {
  try {
    const { id } = req.params;
    console.log(`Received request to get PAE with ID: ${id}`);

    // Validar que el ID sea un ObjectId válido de MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("Invalid ID format");
      return res.status(400).json({ error: "ID no válido." });
    }

    const pae = await paeService.getById(id);
    if (!pae) {
      console.log("PAE not found");
      return res.status(404).json({ error: "Documento no encontrado." });
    }
    console.log("PAE found:", pae);
    res.json(pae);
  } catch (error) {
    console.log("Error occurred:", error);
    res.status(500).json({ error: error.toString() });
  }
}