const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Caso = sequelize.define('Caso', {
  ID_caso: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tipo_siniestro: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion_siniestro: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ID_Cliente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Usuario',
      key: 'ID_usuario',
    },
  },
  ID_inspector: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Usuario',
      key: 'ID_usuario',
    },
  },
  ID_contratista: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Usuario',
      key: 'ID_usuario',
    },
  },
});

module.exports = Caso;
