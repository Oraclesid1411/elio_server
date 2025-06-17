import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Utilisation de l'import avec l'extension .js
import Categorie from './categorie.js';

export const Souscategorie = sequelize.define('Souscategorie', {
  categorie_id: {
    type: DataTypes.INTEGER,
    allowNull: false, // Champ obligatoire
    validate: {
      isInt: {
        msg: 'L\'ID de la catégorie doit être un entier valide.',
      },
    },
  },
  libelle : { type: DataTypes.STRING, allowNull: false, 
    validate: { 
      notEmpty: {
        msg: 'Le libellé de la sous catégorie est requis.',
      },
    }, 
  },
  userid: {
    type: DataTypes.INTEGER,
    allowNull: false, // Champ obligatoire
    validate: {
      isInt: {
        msg: 'L\'ID utilisateur doit être un entier valide.',
      },
    },
  },
}, {tableName: 'souscategories'});

Souscategorie.belongsTo(Categorie, { foreignKey: 'categorie_id', as: 'categorie' }); // Une categorie appartient à un produit
Categorie.hasMany(Souscategorie, { foreignKey: 'categorie_id' }); // Une categorie peut être dans plusieurs lignes de produit

export default Souscategorie;

