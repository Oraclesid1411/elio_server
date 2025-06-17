import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export const ProduitPartenaire = sequelize.define('ProduitPartenaire', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

  nom: DataTypes.STRING,
  description: DataTypes.TEXT,
  image: DataTypes.STRING,
  prix: DataTypes.DECIMAL(10, 2),
  est_actif: { type: DataTypes.BOOLEAN, defaultValue: true }
}, {
  tableName: 'produits_partenaire'
});

export default ProduitPartenaire;
