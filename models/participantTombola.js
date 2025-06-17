import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export const ParticipantTombola = sequelize.define('ParticipantTombola', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

  tombolaId: DataTypes.INTEGER,
  userId: DataTypes.INTEGER,
  date_participation: DataTypes.DATE
}, {
  tableName: 'participants_tombola'
});

export default ParticipantTombola;
