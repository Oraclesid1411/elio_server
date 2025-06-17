import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Utilisation de l'import avec l'extension .js

export const Ville = sequelize.define('Ville', {
  nom : { type: DataTypes.STRING, allowNull: false, 
    validate: { 
      notEmpty: {
        msg: 'Le libellé de la catégorie est requis.',
      },
    }, 
  },
  province : { type: DataTypes.STRING, allowNull: true,},
}, {tableName: 'villes'});

export default Ville;

