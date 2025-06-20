import express from 'express';
import cors from 'cors';
import path from 'path';
// import fs from 'fs';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import sequelize from './config/database.js'; // Import de la configuration Sequelize

import authRoutes from './routes/auth.js';

import './models/index.js'; // Import des modèles pour leur synchronisation
import { categorieRouter } from './routes/categorie.js';
import { souscategorieRouter } from './routes/souscategorie.js';
import { villeRouter } from './routes/ville.js'; 
import {elio_servicesRouter} from './routes/elio_services.js';

dotenv.config(); // Chargement des variables d'environnement

const app = express();
const port = process.env.DB_PORT || 4001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/imageprestataires", express.static(path.join(__dirname, "public/imageprestataires")));

app.use(cors({
  origin: 'http://localhost:3000', // Origine autorisée
  //origin: 'http://77.37.125.3:3001', // Origine autorisée
  credentials: true, // Autoriser l'envoi des cookies
}));

app.use(bodyParser.json());

//POUR POUVOIR RECUPERER LES LOGS COTE SERVEUR
app.use((req, res, next) => {
  console.log('Requête reçue :', req.method, req.url, req.body);
  next();
});


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/elio_services', elio_servicesRouter);
app.use('/api/categorie', categorieRouter);
app.use('/api/souscategorie', souscategorieRouter);
app.use('/api/ville', villeRouter);


app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) =>{
  res.send('transactionRouter');
})
// Synchronisation avec la base de données
sequelize
  .authenticate()
  .then(() => {
    console.log('Connexion à la base de données réussie.');
    return sequelize.sync({ alter: true }); // Synchronise les modèles (alter met à jour les tables sans perte de données)
  })
  .catch((error) => {
    console.error('Impossible de se connecter à la base de données:', error);
  });

  app.listen(port, () => {
    console.log(`Example app listening on port: ${port}`);
  })
