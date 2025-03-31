import paeModel from './pae.model.js';

export async function getAll() {
  const paes = await paeModel.find().lean();
  return paes;
}

export async function create(data) {
  const newPae = await paeModel.create(data);
  return newPae;
}

export async function update(id, data) {
  const updatedPae = await paeModel.findByIdAndUpdate(id, data, { new: true }).lean();
  return updatedPae;
}

export async function patch(id, updatedFields) {
  const updatedPae = await paeModel.findByIdAndUpdate(id, { $set: updatedFields }, { new: true }).lean();
  return updatedPae;
}

export async function getById(id) {
  console.log(`Repository: Finding PAE with ID: ${id}`);
  const pae = await paeModel.findById(id).lean();
  return pae;
}