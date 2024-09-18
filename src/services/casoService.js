const Caso = require('../models/casoModel');

exports.crearCaso = async (casoData) => {
  try {
    const nuevoCaso = await Caso.create(casoData);
    return nuevoCaso;
  } catch (error) {
    throw new Error('Error al crear el caso: ' + error.message);
  }
};
