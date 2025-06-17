import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Utilisation de l'import avec l'extension .js

export const Demande = sequelize.define('Demande', {
    clientId: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    prestataireId: { 
        type: DataTypes.INTEGER, 
        allowNull: true 
    },
    categorieId: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    souscategorieId: {
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    description: { 
        type: DataTypes.TEXT, 
        allowNull: true 
    },
    status: { 
        type: DataTypes.ENUM('En attente', 'Attribuée', 'Terminée', 'Annulée'), 
        defaultValue: 'En attente' 
    },
    prix: { 
        type: DataTypes.DOUBLE, 
        allowNull: false,
        defaultValue:0,
    },
    note: { 
        type: DataTypes.DOUBLE, 
        allowNull: false,
        defaultValue:0,
    },
    commentaire_note: { 
        type: DataTypes.TEXT, 
        allowNull: true,
    },
}, {tableName: 'demandes'});



export default Demande;

