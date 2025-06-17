import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export const ParametreSite = sequelize.define('ParametreSite', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

  cle: { type: DataTypes.STRING, unique: true },
  valeur: DataTypes.TEXT,
  description: DataTypes.TEXT
}, {
  tableName: 'parametres_site'
});

export default ParametreSite;
