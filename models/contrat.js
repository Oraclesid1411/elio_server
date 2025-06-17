import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export const Contrat = sequelize.define('Contrat', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

  societe_nom: DataTypes.STRING,
  produitId: DataTypes.INTEGER,
  commission: DataTypes.DECIMAL(5, 2),
  date_debut: DataTypes.DATE,
  date_fin: DataTypes.DATE,
  details: DataTypes.TEXT
}, {
  tableName: 'contrats'
});

export default Contrat;
