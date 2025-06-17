import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export const Tombola = sequelize.define('Tombola', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

  titre: DataTypes.STRING,
  description: DataTypes.TEXT,
  lot: DataTypes.STRING,
  date_debut: DataTypes.DATE,
  date_fin: DataTypes.DATE,
  est_termine: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
  tableName: 'tombola'
});

export default Tombola;
