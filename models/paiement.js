import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export const Paiement = sequelize.define('Paiement', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

  userId: DataTypes.INTEGER,
  abonnementId: DataTypes.INTEGER,
  montant: DataTypes.DECIMAL(10, 2),
  methode: DataTypes.ENUM('espece', 'cheque', 'airtel', 'moov', 'mobile_money'),
  reference: DataTypes.STRING,
  statut: { type: DataTypes.ENUM('en_attente', 'valide', 'echoue'), defaultValue: 'en_attente' }
}, {
  tableName: 'paiements'
});

export default Paiement;
