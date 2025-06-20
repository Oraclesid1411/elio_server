//const { DataTypes } = require('sequelize');
import { DataTypes } from 'sequelize'
//const sequelize = require('../config/database');
import sequelize from '../config/database.js';
import Ville from './ville.js';
import Categorie from './categorie.js';

export const User = sequelize.define('User', {
  nom: { type: DataTypes.STRING(255), allowNull: false},
  type_profil: { type: DataTypes.STRING(255), allowNull: true},
  email: { type: DataTypes.STRING(255), allowNull: false },
  password: { type: DataTypes.STRING(255), allowNull: false },
  role: { type: DataTypes.STRING(255), allowNull: false, defaultValue: 'Prestataire' },
  statut_verification: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 }, // 0 compte non verifié, 1 compte verifié
  statut_abonnement: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 }, // 0 compte non abonné, 1 compte abonné
  plan_abonnement: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 }, // 0 non abonné, 1 plan 1, 2 plan 2, 3 plan 3
  intitule_service: { type: DataTypes.STRING(255), allowNull: true},
  description_service: {   type: DataTypes.STRING(255), allowNull: true},
  prix_minimum_service: { type: DataTypes.DOUBLE, allowNull: true, defaultValue: 0},
  imagebanniere: { type: DataTypes.STRING(255), allowNull: true },
  logo: { type: DataTypes.STRING(255), allowNull: true },
  ville_residence_id: { type: DataTypes.INTEGER, allowNull: true },
  categorie_id: { type: DataTypes.INTEGER, allowNull: true },
  resetToken: { type: DataTypes.STRING(255), allowNull: true },
  resetTokenExpiry: { type: DataTypes.DATE, allowNull: true },
}, { 
      timestamps: true,
      indexes: [
        { fields: ['intitule_service'], using: 'BTREE' },
        { fields: ['categorie_id'] },
        { fields: ['ville_residence_id'] },
        { type: 'FULLTEXT', fields: ['intitule_service', 'description_service'] }, // Pour les recherches textuelles
      ],
    }, {tableName: 'users'});

User.belongsTo(Ville, { foreignKey: 'ville_residence_id', as: 'ville' });

User.belongsTo(Categorie, { foreignKey: 'categorie_id', as: 'categorie' });
Categorie.hasMany(User, { foreignKey: 'categorie_id' });

export default User;
