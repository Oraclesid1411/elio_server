import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export const Admin = sequelize.define('Admin', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
  nom: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  mot_de_passe: DataTypes.TEXT,
  role: { type: DataTypes.ENUM('admin', 'superadmin'), defaultValue: 'admin' }
}, {
  tableName: 'admins'
});

export default Admin;
