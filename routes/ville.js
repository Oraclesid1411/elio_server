import express from 'express';
import multer from 'multer';
import { Ville } from '../models/index.js';
const upload = multer();

const router = express.Router();

// Route pour récupérer la liste des categorie
router.get('/liste', async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Récupérer les paramètres page et limit
    const offset = (page - 1) * limit; // Calcul de l'offset
    try {
        const { rows: villes, count: totalItems } = await Ville.findAndCountAll({
            order: [['nom', 'ASC']],
        });
        res.status(200).json({
            Status: true,
            Result: villes,
        });
    } catch (err) {
        console.error("Erreur lors de la récupération des villes :", err);
        res.status(500).json({
            Status: false,
            Error: `Erreur lors de la récupération des villes : ${err.message}`,
        });
    }
});

export { router as villeRouter }