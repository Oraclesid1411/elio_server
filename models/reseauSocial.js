import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export const ReseauSocial = sequelize.define('ReseauSocial', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

  userId: DataTypes.INTEGER,
  facebook: DataTypes.STRING,
  linkedin: DataTypes.STRING,
  whatsapp: DataTypes.STRING,
  instagram: DataTypes.STRING,
  site_web: DataTypes.STRING
}, {
  tableName: 'reseaux_sociaux'
});

export default ReseauSocial;
