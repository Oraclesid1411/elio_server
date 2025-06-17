import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export const FichierUpload = sequelize.define('FichierUpload', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

  userId: DataTypes.INTEGER,
  serviceId: DataTypes.INTEGER,
  type_fichier: DataTypes.ENUM('image', 'video', 'document'),
  chemin: DataTypes.STRING,
  resolution: DataTypes.STRING,
  date_upload: DataTypes.DATE
}, {
  tableName: 'fichiers_uploads'
});

export default FichierUpload;
