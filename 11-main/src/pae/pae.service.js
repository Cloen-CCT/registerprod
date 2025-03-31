import * as paeRepo from './pae.repository.js';

export async function getAll() {
  const paes = await paeRepo.getAll();
  return paes;
}

export async function create(data) {
  const newPae = await paeRepo.create(data);
  return newPae;
}

export async function update(id, data) {
  const updatedPae = await paeRepo.update(id, data);
  return updatedPae;
}

export async function patch(id, updatedFields) {
  const updatedPae = await paeRepo.patch(id, updatedFields);
  return updatedPae;
}

export async function getById(id) {
  console.log(`Service: Getting PAE with ID: ${id}`);
  const pae = await paeRepo.getById(id);
  return pae;
}
