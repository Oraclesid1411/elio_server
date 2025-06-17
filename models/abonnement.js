import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Utilisation de l'import avec l'extension .js

export const Abonnement = sequelize.define('Abonnement', {
  prestataireId : { type: DataTypes.INTEGER, allowNull: false, 
    validate: { 
      notEmpty: {
        msg: 'id du prestataire est requis.',
      },
    }, 
  },
  type_abonnement : { type: DataTypes.STRING, allowNull: false,}, //Mensuel, Annuel
  date_debut : { type: DataTypes.DATE, allowNull: false, },
  date_fin : { type: DataTypes.DATE, allowNull: false, },
  statut_abonnement : { type: DataTypes.STRING, allowNull: false,}, //En cours, Terminé
}, {tableName: 'abonnements'});

export default Abonnement;

