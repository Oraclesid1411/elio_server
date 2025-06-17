import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export const GagnantTombola = sequelize.define('GagnantTombola', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

  tombolaId: DataTypes.INTEGER,
  userId: DataTypes.INTEGER,
  rang: DataTypes.INTEGER,
  lot_gagne: DataTypes.STRING,
  date_gagnant: DataTypes.DATE
}, {
  tableName: 'gagnants_tombola'
});

export default GagnantTombola;
