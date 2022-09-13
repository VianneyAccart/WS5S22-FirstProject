const { getWilderRepository } = require("../../database/utils");

async function initializeWilders() {
  const wilderRepository = await getWilderRepository();
  await wilderRepository.clear();
  await wilderRepository.save({ name: "Vianney Accart" });
}

async function getWilders() {
  const wilderRepository = await getWilderRepository();
  return wilderRepository.find();
}

async function createWilder() {
  return;
}

module.exports = { initializeWilders, createWilder, getWilders };