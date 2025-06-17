import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export const Notification = sequelize.define('Notification', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

  userId: DataTypes.INTEGER,
  type: DataTypes.ENUM('whatsapp', 'email', 'sms'),
  message: DataTypes.TEXT,
  envoye: { type: DataTypes.BOOLEAN, defaultValue: false },
  date_envoi: DataTypes.DATE
}, {
  tableName: 'notifications'
});

export default Notification;
