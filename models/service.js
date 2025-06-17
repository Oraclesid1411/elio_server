import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export const Service = sequelize.define('Service', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

  userId: DataTypes.INTEGER,
  categorieId: DataTypes.INTEGER,
  titre: DataTypes.STRING,
  description: DataTypes.TEXT,
  prix: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  disponible: { type: DataTypes.BOOLEAN, defaultValue: true },
  ville: DataTypes.STRING,
  images: DataTypes.JSON,
  est_vendu: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
  tableName: 'services'
});

export default Service;
